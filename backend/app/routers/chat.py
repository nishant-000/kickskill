"""Chat endpoint: streams LLM responses to the frontend via SSE."""
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from ..config import settings
from ..llm import get_groq

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant|system)$")
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    page_context: str | None = None  # e.g. "opportunities", "skills"


SYSTEM_PROMPT = """You are KickSkill, a career assistant for students.
You help with: finding opportunities, skill-gap analysis, career roadmaps,
resume feedback, and application prep. Be concise and actionable.
When the user asks for structured output (lists, roadmaps), use markdown.
"""


@router.post("")
async def chat(req: ChatRequest) -> StreamingResponse:
    groq = get_groq()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if req.page_context:
        messages[0]["content"] += f"\nUser is currently on the '{req.page_context}' page."
    messages += [m.model_dump() for m in req.messages]

    async def stream():
        stream = await groq.chat.completions.create(
            model=settings.chat_model,
            messages=messages,  # type: ignore[arg-type]
            stream=True,
            temperature=0.7,
            max_tokens=1024,
        )
        async for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield f"data: {delta}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(stream(), media_type="text/event-stream")

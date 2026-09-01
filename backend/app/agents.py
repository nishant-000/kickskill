"""Career-agent flows built on Groq structured outputs (JSON mode).

Each function returns Pydantic-validated objects so the frontend gets
predictable shapes for rendering (roadmaps, skill gaps, etc.).
"""
from groq import AsyncGroq  # noqa: F401  (injected via get_groq)

from pydantic import BaseModel

from .config import settings
from .llm import get_groq


class RoadmapStep(BaseModel):
    title: str
    description: str
    skills: list[str]
    duration_weeks: int


class Roadmap(BaseModel):
    target_role: str
    steps: list[RoadmapStep]


async def generate_roadmap(
    current_skills: list[str], target_role: str
) -> Roadmap:
    groq = get_groq()
    completion = await groq.chat.completions.create(
        model=settings.chat_model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a career coach. Produce a step-by-step learning "
                    "roadmap from the user's current skills to their target role."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Current skills: {', '.join(current_skills) or 'none'}\n"
                    f"Target role: {target_role}"
                ),
            },
        ],
        response_format={"type": "json_object"},
        temperature=0.4,
    )
    import json

    return Roadmap.model_validate_json(completion.choices[0].message.content or "{}")

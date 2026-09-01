"""Shared Groq client. OpenAI-compatible, streaming + JSON mode supported."""
from functools import lru_cache

from groq import AsyncGroq

from .config import settings


@lru_cache
def get_groq() -> AsyncGroq:
    if not settings.groq_api_key:
        raise RuntimeError("GROQ_API_KEY is not set — copy .env.example to .env")
    return AsyncGroq(api_key=settings.groq_api_key)

"""Profile endpoints. Auth is verified via Supabase JWT sent by the frontend."""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from ..deps import get_current_user_id

router = APIRouter(prefix="/profile", tags=["profile"])


class Profile(BaseModel):
    name: str
    email: str
    institution: str | None = None
    degree: str | None = None
    branch: str | None = None
    graduation_year: str | None = None
    career_goal: str | None = None
    target_role: str | None = None
    current_skills: list[str] = []


@router.get("/me")
async def get_profile(user_id: str = Depends(get_current_user_id)) -> Profile:
    # TODO: SELECT from Supabase `profiles` table
    raise HTTPException(status_code=501, detail="Wire up Supabase query")


@router.put("/me")
async def upsert_profile(
    profile: Profile, user_id: str = Depends(get_current_user_id)
) -> dict:
    # TODO: UPSERT into Supabase `profiles` table
    raise HTTPException(status_code=501, detail="Wire up Supabase query")

# KickSkill Backend

FastAPI + Groq + Supabase. The Figma Make frontend stays as-is; point it at
this API via `VITE_API_URL`.

## Setup

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # fill in GROQ_API_KEY + Supabase keys
uvicorn app.main:app --reload --port 8000
```

Interactive docs: http://localhost:8000/docs

## Structure

- `app/main.py` — app + CORS
- `app/config.py` — env settings (pydantic-settings)
- `app/llm.py` — shared async Groq client
- `app/deps.py` — Supabase JWT verification
- `app/routers/chat.py` — SSE streaming chat (Groq)
- `app/routers/profile.py` — profile CRUD (Supabase)
- `app/agents.py` — structured-output flows (JSON mode): roadmaps, skill gaps

## Deploy (free)

- Backend: Render free web service — build `pip install -r requirements.txt`,
  start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Frontend: Vercel/Netlify — set `VITE_API_URL=https://<your-render-app>.onrender.com`

"""Application settings loaded from environment / .env file."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Groq
    groq_api_key: str = ""

    # Supabase
    supabase_url: str = ""
    supabase_service_key: str = ""
    supabase_anon_key: str = ""

    # CORS
    frontend_url: str = "http://localhost:5173"

    # Models
    chat_model: str = "llama-3.3-70b-versatile"
    fast_model: str = "llama-3.1-8b-instant"


settings = Settings()

"""Auth dependency: verifies Supabase JWT from the Authorization header."""
import jwt  # PyJWT
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .config import settings

bearer = HTTPBearer()


def get_current_user_id(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
) -> str:
    """Verify a Supabase access token and return the user id (sub claim)."""
    try:
        # Supabase signs JWTs with HS256 using the JWT secret; for a quick start
        # we only decode + check expiry. Swap in signature verification with
        # your project's JWT secret or JWKS for production.
        payload = jwt.decode(
            creds.credentials,
            options={"verify_signature": False, "verify_exp": True},
        )
        sub = payload.get("sub")
        if not sub:
            raise ValueError("missing sub claim")
        return str(sub)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")

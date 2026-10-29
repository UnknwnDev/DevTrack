from datetime import UTC, datetime, timedelta

from fastapi import HTTPException, status
import jwt
from sqlalchemy import UUID

from devtracks.core.config import config


def create_access_token(user_id: UUID, expires_in_minutes: int = 30) -> str:
    payload = {
        "sub": str(user_id),
        "iat": datetime.now(UTC),
        "exp": datetime.now(UTC) + timedelta(minutes=expires_in_minutes),
    }

    encoded_jwt = jwt.encode(payload, config.jwt_secret, algorithm=config.jwt_algorithm)
    return encoded_jwt


def verify_access_token(token: str) -> dict:
    try:
        decoded_payload = jwt.decode(
            token, config.jwt_secret, algorithms=[config.jwt_algorithm]
        )
        return decoded_payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired.",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid.",
        )

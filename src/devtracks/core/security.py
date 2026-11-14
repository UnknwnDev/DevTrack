from datetime import UTC, datetime, timedelta

import jwt
from sqlalchemy import UUID

from devtracks.core.config import config
from devtracks.exceptions.exceptions import InvalidToken


def create_token(user_id: UUID, *, token_type: str, expiers_delta: timedelta) -> str:
    now = datetime.now(UTC)
    payload = {
        "sub": str(user_id),
        "type": token_type,
        "iat": now,
        "exp": now + expiers_delta,
    }
    return jwt.encode(payload, config.jwt_secret, algorithm=config.jwt_algorithm)


def create_access_token(user_id: UUID, expires_in_minutes: int = 30) -> str:
    return create_token(
        user_id, token_type="access", expiers_delta=timedelta(minutes=30)
    )


def create_refresh_token(user_id: UUID) -> str:
    return create_token(user_id, token_type="refresh", expiers_delta=timedelta(days=30))


def verify_token(token: str, expected_type: str) -> dict:
    try:
        payload = jwt.decode(
            token, config.jwt_secret, algorithms=[config.jwt_algorithm]
        )
    except jwt.ExpiredSignatureError:
        raise InvalidToken(message="Token has expired.")
    except jwt.InvalidTokenError:
        raise InvalidToken(message="Token is invalid.")

    if payload.get("type") != expected_type:
        raise InvalidToken(message="Wrong token type.")

    return payload

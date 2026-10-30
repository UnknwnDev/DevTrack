from fastapi import Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from sqlalchemy.orm import Session

from devtracks.api.v1 import auth
from devtracks.core.security import verify_access_token
from devtracks.db import get_session
from devtracks.db.schema import User
from devtracks.schemas.users import TokenData
from devtracks.services.users import UserService

version = "v1"
description = ""
ver_prefix = f"/api/{version}"

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=ver_prefix + auth.router.prefix + "/login"
)


async def get_current_user(
    token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)
):
    cridentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = verify_access_token(token)

        user_id = payload.get("sub")
        if user_id is None:
            raise cridentials_exception
        token_data = TokenData(user_id=user_id)
    except InvalidTokenError:
        raise cridentials_exception

    service = UserService(session=session)
    user = service.get_user_by_id(id=token_data.user_id)

    if user is None:
        raise cridentials_exception

    return user


async def get_current_active_user(
    current_user: User = Security(get_current_user),
):
    return current_user

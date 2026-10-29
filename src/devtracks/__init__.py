from fastapi import Depends, HTTPException, status
from jwt import InvalidTokenError
from sqlalchemy.orm import Session

from devtracks.core.security import verify_access_token
from devtracks.db import get_session
from devtracks.schemas.users import TokenData
from devtracks.services.users import UserService


async def get_current_user(token, session: Session = Depends(get_session)):
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

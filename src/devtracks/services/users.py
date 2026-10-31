from argon2 import PasswordHasher
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.core.security import create_access_token
from devtracks.db.schema import User
from devtracks.exceptions.exceptions import (
    InvalidCredentials,
    UserAlreadyExists,
    UserNotFound,
)
from devtracks.schemas.users import UserLoginRequest, UserRegisterRequest


class UserService:
    def __init__(self, session: Session) -> None:
        self._ph = PasswordHasher()
        self._db = session

    def register_user(self, payload: UserRegisterRequest) -> User:
        existing_user = self._db.scalars(
            select(User).where(
                (User.email == payload.email) | (User.name == payload.name)
            )
        ).first()

        if existing_user:
            raise UserAlreadyExists

        hash_pwd = self._ph.hash(payload.password)
        new_user = User(email=payload.email, hash_pwd=hash_pwd, name=payload.name)
        self._db.add(new_user)
        self._db.commit()
        self._db.refresh(new_user)

        return new_user

    def login_user(self, payload: UserLoginRequest) -> str:
        user = self._db.scalars(select(User).where(User.email == payload.email)).first()

        if not user or not self._ph.verify(user.hash_pwd, payload.password):
            raise InvalidCredentials

        access_token = create_access_token(user.id)
        return access_token

    def get_user_by_id(self, id) -> User:
        user = self._db.scalars(select(User).where(User.id == id)).first()

        if not user:
            raise UserNotFound

        return user

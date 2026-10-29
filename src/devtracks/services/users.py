from argon2 import PasswordHasher
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.core.security import create_access_token
from devtracks.db.schema import User
from devtracks.schemas.users import UserLoginRequest, UserRegisterRequest


class UserService:
    def __init__(self, session: Session) -> None:
        self._ph = PasswordHasher()
        self._db = session
        self._oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    def register_user(self, payload: UserRegisterRequest) -> User:
        existing_user = self._db.scalars(
            select(User).where(
                (User.email == payload.email) | (User.name == payload.name)
            )
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or username is already registred.",
            )

        hash_pwd = self._ph.hash(payload.password)
        new_user = User(email=payload.email, hash_pwd=hash_pwd, name=payload.name)
        self._db.add(new_user)
        self._db.commit()
        self._db.refresh(new_user)

        return new_user

    def login_user(self, payload: UserLoginRequest) -> str:
        user = self._db.scalars(select(User).where(User.email == payload.email)).first()

        if not user or not self._ph.verify(user.hash_pwd, payload.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token = create_access_token(user.id)
        return access_token

    def get_user_by_id(self, id) -> User:
        user = self._db.scalars(select(User).where(User.id == id)).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )

        return user

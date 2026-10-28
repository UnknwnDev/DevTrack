from sqlalchemy.orm import Session
from argon2 import PasswordHasher

from devtracks.db.schema import Users
from devtracks.schemas.users import UserCreate


class UserService:
    def __init__(self, session: Session) -> None:
        self._ph = PasswordHasher()
        self._db = session

    def create_user(self, user: UserCreate) -> Users:
        pass_hash = self._ph.hash(user.password)
        new_user = Users(email=user.email, pass_hash=pass_hash, user_name=user.name)
        self._db.add(new_user)
        self._db.commit()
        self._db.refresh(new_user)

        return new_user

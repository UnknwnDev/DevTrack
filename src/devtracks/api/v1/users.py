from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from devtracks.db import get_session
from devtracks.schemas.users import UserCreate, User
from devtracks.services.users import UserService

router = APIRouter(prefix="/user")


def get_user_service(session: Session = Depends(get_session)) -> UserService:
    return UserService(session=session)


@router.post("", response_model=User)
def create_user(user: UserCreate, services: UserService = Depends(get_user_service)):
    new_user = services.create_user(user)
    return {"user": new_user}

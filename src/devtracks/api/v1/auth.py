from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from devtracks.db import get_session
from devtracks.schemas.users import TokenResponse, UserLoginRequest, UserRegisterRequest
from devtracks.services.users import UserService

router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_user_service(session: Session = Depends(get_session)) -> UserService:
    return UserService(session=session)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(
    payload: UserRegisterRequest, services: UserService = Depends(get_user_service)
):
    new_user = services.register_user(payload)
    return {"message": "User registered successfully", "user_id": new_user}


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    services: UserService = Depends(get_user_service),
):
    payload = UserLoginRequest(email=form_data.username, password=form_data.password)
    access_token = services.login_user(payload)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Login successful",
    }

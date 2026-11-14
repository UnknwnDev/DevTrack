from uuid import UUID

from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from devtracks.core.security import create_access_token, verify_token
from devtracks.db import get_session
from devtracks.schemas.users import (
    LoginResponse,
    RefreshRequst,
    TokenResponse,
    UserLoginRequest,
    UserRegisterRequest,
)
from devtracks.services.users import UserService

router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_user_service(session: Session = Depends(get_session)) -> UserService:
    return UserService(session=session)


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(body: RefreshRequst):
    payload = verify_token(body.refresh_token, "refresh")
    user_id = payload["sub"]

    return TokenResponse(access_token=create_access_token(user_id))


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(
    payload: UserRegisterRequest, services: UserService = Depends(get_user_service)
):
    new_user = services.register_user(payload)
    return {
        "message": "User registered successfully",
        "user": {"name": new_user.name, "email": new_user.email, "id": new_user.id},
    }


@router.post("/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
async def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    services: UserService = Depends(get_user_service),
):
    payload = UserLoginRequest(email=form_data.username, password=form_data.password)
    access_token, refresh_token, user = services.login_user(payload)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "message": "Login successful",
        "user": {"name": user.name, "email": user.email, "id": user.id},
    }

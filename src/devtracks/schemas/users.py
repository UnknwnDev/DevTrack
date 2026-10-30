from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    message: str


class TokenData(BaseModel):
    user_id: str | None = None


class User(BaseModel):
    id: UUID
    email: str
    name: str
    pass_hash: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserRegisterRequest(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)


class UserLoginRequest(BaseModel):
    email: str | None
    password: str

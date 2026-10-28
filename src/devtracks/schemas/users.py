from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class User(BaseModel):
    id: UUID
    email: str
    name: str
    pass_hash: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserCreate(BaseModel):
    email: str
    name: str
    password: str

from pydantic import BaseModel, Field


class ProjectCreateRequest(BaseModel):
    name: str = Field(..., max_length=50)
    description: str

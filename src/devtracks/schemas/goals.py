from pydantic import BaseModel, Field

from devtracks.core.utils import OptionalUUID


class GoalCreateRequest(BaseModel):
    proj_id: OptionalUUID = None
    title: str = Field(..., max_length=100)


class GoalEditRequest(BaseModel):
    title: str = Field(..., max_length=100)
    completed: bool = False

from datetime import datetime
from typing import Annotated
from uuid import UUID

from pydantic import BaseModel, BeforeValidator


def empty_string_to_none(v):
    if v == "" or v is None:
        return None
    return v


OptionalUUID = Annotated[UUID | None, BeforeValidator(empty_string_to_none)]


class ActivityLogRequest(BaseModel):
    goal_id: OptionalUUID = None
    start_time: datetime
    end_time: datetime

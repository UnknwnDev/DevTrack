from datetime import datetime

from pydantic import BaseModel

from devtracks.core.utils import OptionalUUID


class ActivityLogRequest(BaseModel):
    goal_id: OptionalUUID = None
    start_time: datetime
    end_time: datetime

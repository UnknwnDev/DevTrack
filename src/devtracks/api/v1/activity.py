from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from devtracks import get_current_user
from devtracks.db import get_session
from devtracks.db.schema import User
from devtracks.schemas.activity import ActivityLogRequest
from devtracks.services.activity import LogService

router = APIRouter(prefix="/session", tags=["Activity"])


def get_session_service(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> LogService:
    return LogService(session=session, current_user=current_user)


@router.get("")
def get_activitys(service: LogService = Depends(get_session_service)):
    activitys = service.get_activitys()
    return {"message": "Retrieved activitys successfully", "activitys": activitys}


@router.get("{id}")
def get_activity_by_id(id, service: LogService = Depends(get_session_service)):
    session = service.get_activity_by_id(id)
    return {session}


@router.post("/activity", status_code=status.HTTP_201_CREATED)
def create_activity(
    payload: ActivityLogRequest,
    service: LogService = Depends(get_session_service),
):
    session = service.log_activity(payload)
    return {"message": "Logged activity Successfully", "session_id": session.id}

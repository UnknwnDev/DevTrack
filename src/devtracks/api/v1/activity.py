from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from devtracks import get_current_active_user
from devtracks.db import get_session
from devtracks.db.schema import User
from devtracks.schemas.activity import ActivityLogRequest
from devtracks.services.activity import ActivityService

router = APIRouter(prefix="/activities", tags=["Activities"])


def get_session_service(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
) -> ActivityService:
    return ActivityService(session=session, current_user=current_user)


@router.get("")
def get_activities(service: ActivityService = Depends(get_session_service)):
    activities = service.get_activitys()
    return {"message": "Retrieved activities successfully", "activities": activities}


@router.post("")
def create_activity(
    payload: ActivityLogRequest,
    service: ActivityService = Depends(get_session_service),
):
    activity = service.log_activity(payload)
    return {"message": "Logged activity Successfully", "id": activity.id}


@router.get("/{id}")
def get_activity_by_id(id, service: ActivityService = Depends(get_session_service)):
    activity = service.get_activity_by_id(id)
    return {"message": "Retreieved activity", "activity": activity}


@router.delete("/{id}")
def delete_activity(id, service: ActivityService = Depends(get_session_service)):
    activity = service.delete_activity(id)
    return {"message": "Deleted activity successfully", "activity": activity}

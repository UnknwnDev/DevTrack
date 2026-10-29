from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from devtracks import get_current_user
from devtracks.db import get_session
from devtracks.db.schema import User
from devtracks.schemas.sessions import SessionLogRequest
from devtracks.services.sessions import SessionService

router = APIRouter(prefix="/session", tags=["Sessions"])


def get_session_service(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> SessionService:
    return SessionService(session=session, current_user=current_user)


@router.get("")
def get_sessions(service: SessionService = Depends(get_session_service)):
    sessions = service.get_sessions()
    return {"message": "Retrieved sessions successfully", "sessions": sessions}


@router.post("/log", status_code=status.HTTP_201_CREATED)
def log_session(
    payload: SessionLogRequest,
    service: SessionService = Depends(get_session_service),
):
    session = service.log_session(payload)
    return {"message": "Logged Session Successfully", "session_id": session.id}

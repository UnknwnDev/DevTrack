from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.db.schema import Sessions, User
from devtracks.schemas.sessions import SessionLogRequest


class SessionService:
    def __init__(self, session: Session, current_user: User) -> None:
        self._db = session
        self._current_user = current_user

    def get_sessions(self) -> list[Sessions]:
        sessions = self._db.scalars(
            select(Sessions).where(Sessions.user_id == self._current_user.id)
        )
        return list(sessions)

    def log_session(self, payload: SessionLogRequest) -> Sessions:
        new_session = Sessions(
            user_id=self._current_user.id,
            goal_id=payload.goal_id,
            start_time=payload.start_time,
            end_time=payload.end_time,
        )

        self._db.add(new_session)
        self._db.commit()
        self._db.refresh(new_session)

        return new_session

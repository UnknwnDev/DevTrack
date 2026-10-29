from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.db.schema import Activity, User
from devtracks.schemas.activity import ActivityLogRequest


class LogService:
    def __init__(self, session: Session, current_user: User) -> None:
        self._db = session
        self._cur_user = current_user

    def get_activitys(self) -> list[Activity]:
        activitys = self._db.scalars(
            select(Activity).where(Activity.user_id == self._cur_user.id)
        )
        return list(activitys)

    def get_activity_by_id(self, id) -> Activity:
        session = self._db.scalars(
            select(Activity)
            .where(Activity.user_id == self._cur_user.id)
            .where(Activity.id == id)
        ).first()
        if session is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session Log does not exist.",
            )
        return session

    def log_activity(self, payload: ActivityLogRequest) -> Activity:
        new_session = Activity(
            user_id=self._cur_user.id,
            goal_id=payload.goal_id,
            start_time=payload.start_time,
            end_time=payload.end_time,
        )

        self._db.add(new_session)
        self._db.commit()
        self._db.refresh(new_session)

        return new_session

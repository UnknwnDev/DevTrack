from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.db.schema import Goal, User
from devtracks.exceptions.exceptions import GoalNotFound
from devtracks.schemas.goals import GoalCreateRequest, GoalEditRequest


class GoalService:
    def __init__(self, session: Session, current_user: User):
        self._db = session
        self._curr_user = current_user

    def get_goals(self) -> list[Goal]:
        goals = self._db.scalars(select(Goal).where(Goal.user_id == self._curr_user.id))
        return list(goals)

    def get_goal_by_id(self, id) -> Goal:
        goal = self._db.scalars(
            select(Goal).where(Goal.user_id == self._curr_user.id).where(Goal.id == id)
        ).first()

        if goal is None:
            raise GoalNotFound

        return goal

    def create_goal(self, payload: GoalCreateRequest) -> Goal:
        new_goal = Goal(
            title=payload.title, proj_id=payload.proj_id, user_id=self._curr_user.id
        )

        self._db.add(new_goal)
        self._db.commit()
        self._db.refresh(new_goal)

        return new_goal

    def update_goal(self, id, payload: GoalEditRequest) -> Goal:
        goal = self._db.scalars(
            select(Goal).where(Goal.user_id == self._curr_user.id).where(Goal.id == id)
        ).first()

        if goal is None:
            raise GoalNotFound

        if payload.title.strip():
            goal.title = payload.title
        if payload.completed:
            goal.completed = payload.completed

        self._db.commit()
        return goal

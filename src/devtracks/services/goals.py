from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.db.schema import Goal, User
from devtracks.schemas.goals import GoalCreateRequest, GoalEditRequest


class GoalService:
    def __init__(self, session: Session, current_user: User):
        self._db = session
        self._curr_user = current_user

    def get_goals(self) -> list[Goal]:
        goals = self._db.scalars(select(Goal).where(Goal.user_id == self._curr_user.id))
        if goals is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No goals found for user."
            )

        return list(goals)

    def get_goal_by_id(self, id) -> Goal:
        goal = self._db.scalars(
            select(Goal).where(Goal.user_id == self._curr_user.id).where(Goal.id == id)
        ).first()

        if goal is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No goal found for user."
            )

        return goal

    def create_goal(self, payload: GoalCreateRequest) -> Goal:
        new_goal = Goal(
            title=payload.title, proj_id=payload.proj_id, user_id=self._curr_user.id
        )

        self._db.add(new_goal)
        self._db.commit()
        self._db.refresh(new_goal)

        return new_goal

    def edit_goal(self, id, payload: GoalEditRequest) -> Goal:
        goal = self._db.scalars(
            select(Goal).where(Goal.user_id == self._curr_user.id).where(Goal.id == id)
        ).first()

        if goal is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="goal not found."
            )

        if payload.title.strip():
            goal.title = payload.title
        if payload.completed:
            goal.completed = payload.completed

        self._db.commit()
        return goal

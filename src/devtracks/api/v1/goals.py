from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from devtracks import get_current_active_user
from devtracks.db import get_session
from devtracks.db.schema import User
from devtracks.schemas.goals import GoalCreateRequest, GoalEditRequest
from devtracks.services.goals import GoalService

router = APIRouter(prefix="/goals", tags=["Goals"])


def get_goals_service(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
) -> GoalService:
    return GoalService(session, current_user)


@router.get("")
def get_goals(service: GoalService = Depends(get_goals_service)):
    goals = service.get_goals()
    return {"message": "Successfuly retrived users goals", "goals": goals}


@router.post("")
def create_goal(
    payload: GoalCreateRequest, service: GoalService = Depends(get_goals_service)
):
    new_goal = service.create_goal(payload)
    return {"message": "Successfully created goal.", "id": new_goal.id}


@router.get("/{id}")
def get_goal_by_id(id, service: GoalService = Depends(get_goals_service)):
    goal = service.get_goal_by_id(id)
    return {"message": "Successfully retrived", "goal": goal}


@router.put("/{id}")
def update_goal(
    id, payload: GoalEditRequest, service: GoalService = Depends(get_goals_service)
):
    goal = service.update_goal(id, payload)
    return {"message": "Successfully edited goal.", "id": goal.id}

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from devtracks import get_current_active_user
from devtracks.db import get_session
from devtracks.db.schema import User
from devtracks.schemas.projects import ProjectCreateRequest
from devtracks.services.projects import ProjectService

router = APIRouter(prefix="/project", tags=["Projects"])


def get_project_session(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
) -> ProjectService:
    return ProjectService(session, current_user)


@router.get("")
def get_projects(service: ProjectService = Depends(get_project_session)):
    projects = service.get_projects()
    return {"message": "Successfully retrieved users' projects", "projects": projects}


@router.get("/{id}")
def get_project_by_id(id, service: ProjectService = Depends(get_project_session)):
    project = service.get_project_by_id(id)
    return {"message": "Successfully retrieved users' project", "project": project}


@router.post("")
def create_project(
    payload: ProjectCreateRequest,
    service: ProjectService = Depends(get_project_session),
):
    new_project = service.create_project(payload)

    return {"message": "Successfully created project.", "id": new_project.id}


@router.post("/{id}")
def edit_project(
    id,
    payload: ProjectCreateRequest,
    service: ProjectService = Depends(get_project_session),
):
    project = service.edit_project(id, payload)
    return {"message": "Successfully edited project", "id": project.id}

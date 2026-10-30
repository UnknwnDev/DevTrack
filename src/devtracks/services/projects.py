from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from devtracks.db.schema import Project, User
from devtracks.schemas.projects import ProjectCreateRequest


class ProjectService:
    def __init__(self, session: Session, current_user: User):
        self._db = session
        self._curr_user = current_user

    def get_projects(self) -> list[Project]:
        projects = self._db.scalars(
            select(Project).where(Project.user_id == self._curr_user.id)
        )
        return list(projects)

    def get_project_by_id(self, id) -> Project:
        project = self._db.scalars(
            select(Project)
            .where(Project.user_id == self._curr_user.id)
            .where(Project.id == id)
        ).first()

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Project not found."
            )
        return project

    def create_project(self, payload: ProjectCreateRequest) -> Project:
        existing_project = self._db.scalars(
            select(Project)
            .where(Project.user_id == self._curr_user.id)
            .where(Project.name == payload.name)
        ).first()

        if existing_project:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Project name already exists.",
            )

        new_project = Project(
            user_id=self._curr_user.id, name=payload.name, desc=payload.description
        )

        self._db.add(new_project)
        self._db.commit()
        self._db.refresh(new_project)

        return new_project

    def edit_project(self, id, payload: ProjectCreateRequest) -> Project:
        project = self._db.scalars(
            select(Project)
            .where(Project.user_id == self._curr_user.id)
            .where(Project.id == id)
        ).first()
        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Project not found."
            )

        if payload.name.strip():
            project.name = payload.name
        if payload.description.strip():
            project.desc = payload.description

        self._db.commit()
        return project

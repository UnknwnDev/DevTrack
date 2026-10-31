from collections.abc import Callable, Coroutine
from typing import Any

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError


class DevTracksApiError(Exception):
    """base exception class"""

    def __init__(self, message="", name: str = "DevTracks"):
        self.message = message
        self.name = name
        super().__init__(self.message, self.name)


class InvalidToken(DevTracksApiError):
    """User has provided an invalid or expired token"""


class UserAlreadyExists(DevTracksApiError):
    """User has provided an email for a user who exists during sign up."""


class InvalidCredentials(DevTracksApiError):
    """User has provided wrong email or password during login."""


class UserNotFound(DevTracksApiError):
    """User not found."""


class ActivityNotFound(DevTracksApiError):
    """Activity not found."""


class ProjectNotFound(DevTracksApiError):
    """Project not found."""


class ProjectAlreadyExists(DevTracksApiError):
    """Project already exists."""


class GoalNotFound(DevTracksApiError):
    """Goal not found."""


class GoalAlreadyExists(DevTracksApiError):
    """Goal already exists."""


def create_exception_handler(
    status_code: int, initial_detail: str
) -> Callable[[Request, DevTracksApiError], Coroutine[Any, Any, JSONResponse]]:

    async def exception_handler(_: Request, exc: DevTracksApiError) -> JSONResponse:
        detail = {"message": initial_detail}
        if exc.message:
            detail["message"] = exc.message

        if exc.name:
            detail["message"] = f"{detail['message']} [{exc.name}]"

        return JSONResponse(
            content={"detail": detail["message"], "error_type": exc.__class__.__name__},
            status_code=status_code,
        )

    return exception_handler


def register_error_handler(
    app: FastAPI,
    exc_class: type[DevTracksApiError],
    handler: Callable[..., Coroutine[Any, Any, JSONResponse]],
) -> None:
    app.add_exception_handler(exc_class_or_status_code=exc_class, handler=handler)


def register_all_errors(app: FastAPI) -> None:
    register_error_handler(
        app,
        UserAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail="User with email already exists.",
        ),
    )

    register_error_handler(
        app,
        UserNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND, initial_detail="User not found."
        ),
    )

    register_error_handler(
        app,
        InvalidCredentials,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail="Ivalid Email or Password.",
        ),
    )

    register_error_handler(
        app,
        InvalidToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail="Token is invalid or expired.",
        ),
    )

    register_error_handler(
        app,
        ActivityNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND, initial_detail="Activity Not Found."
        ),
    )

    register_error_handler(
        app,
        ProjectNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND, initial_detail="Project Not Found."
        ),
    )

    register_error_handler(
        app,
        ProjectAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail="Project Already Exists.",
        ),
    )

    register_error_handler(
        app,
        GoalNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND, initial_detail="Goal Not Found."
        ),
    )

    register_error_handler(
        app,
        GoalAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN, initial_detail="Goal ALready Exists."
        ),
    )

    @app.exception_handler(status.HTTP_500_INTERNAL_SERVER_ERROR)
    async def internal_server_error(request, exc):
        return JSONResponse(
            content={
                "message": "Opps! Something went wrong.",
                "error_type": "InternalServerError",
            },
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    @app.exception_handler(SQLAlchemyError)
    async def database_error(request, exc):
        return JSONResponse(
            content={
                "message": "Oops! Something went wrong.",
                "error_code": "InternalServerError",
            },
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

from typing import Annotated
from uuid import UUID

from pydantic import BeforeValidator


def empty_string_to_none(v):
    if v == "" or v is None:
        return None
    return v


OptionalUUID = Annotated[UUID | None, BeforeValidator(empty_string_to_none)]

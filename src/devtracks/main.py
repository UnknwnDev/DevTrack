from fastapi import Depends, FastAPI

from devtracks import *
from devtracks.api.v1 import activity, auth, goals, projects
from devtracks.db import Base, engine


app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["System"])
def health_check():
    return {"status": "healthy"}


app.include_router(auth.router, prefix=ver_prefix)
app.include_router(
    activity.router, prefix=ver_prefix, dependencies=[Depends(oauth2_scheme)]
)
app.include_router(
    projects.router, prefix=ver_prefix, dependencies=[Depends(oauth2_scheme)]
)
app.include_router(
    goals.router, prefix=ver_prefix, dependencies=[Depends(oauth2_scheme)]
)

from fastapi import FastAPI

from devtracks.api.v1 import activity, auth
from devtracks.db import Base, engine

version = "v1"
description = ""
ver_prefix = f"/api/{version}"

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["System"])
def health_check():
    return {"status": "healthy"}


app.include_router(auth.router, prefix=ver_prefix)
app.include_router(activity.router, prefix=ver_prefix)

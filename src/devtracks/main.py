from fastapi import FastAPI

from devtracks.db import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/")
def hello_world():
    return {"Hello": "World"}

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from devtracks.core.config import config

engine = create_engine(config.db_url, echo=config.debug)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_session() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session

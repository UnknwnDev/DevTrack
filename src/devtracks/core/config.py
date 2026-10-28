from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from pydantic_settings.main import SettingsConfigDict

load_dotenv()

class Config(BaseSettings):
    app_name: str = "DevTracks"
    debug: bool = False
    db_host: str = ""
    db_port: int = 5432
    db_user: str = "postgres"
    db_pass: str = ""
    db_name: str = "devtracks"

    model_config =  SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def db_url(self) -> str:
        return f"postgresql+psycopg://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"

config = Config()

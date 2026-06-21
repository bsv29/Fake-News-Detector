from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TruthLens AI Phase 2"
    API_V1_STR: str = "/api/v1"
    
    # Auth & Database Settings
    DATABASE_URL: str = "sqlite:///./truthlens.db"
    SECRET_KEY: str = "truthlens_super_secret_key_12345" # Use strong key in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 # 24 hours

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

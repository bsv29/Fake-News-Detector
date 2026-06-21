from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyzer import router as analyzer_router
from app.api.auth import router as auth_router
from app.api.history import router as history_router
from app.api.report import router as report_router
from app.core.config import settings
from app.database.database import engine, Base
from app.models.analysis_history import AnalysisHistory
import logging

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for TruthLens Fake News Detection Platform",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyzer_router, prefix=settings.API_V1_STR)
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(history_router, prefix=settings.API_V1_STR)
app.include_router(report_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "TruthLens AI Backend is running."}

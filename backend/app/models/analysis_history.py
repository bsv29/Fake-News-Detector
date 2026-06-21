from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.database import Base

class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    document_title = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    credibility_score = Column(Float, nullable=False)
    status = Column(String(50), nullable=False)
    file_size = Column(Integer, nullable=False)
    file_path = Column(String(500), nullable=True)
    sentiment = Column(String(50), nullable=True)
    keywords_count = Column(Integer, nullable=True)
    word_count = Column(Integer, default=0)
    clickbait_score = Column(Integer, default=0)
    reading_time = Column(Integer, default=0)
    summary = Column(String, nullable=True)
    keywords = Column(String, nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

from pydantic import BaseModel
from datetime import datetime

class HistoryResponse(BaseModel):
    id: int
    document_title: str
    credibility_score: float
    status: str
    file_size: int
    sentiment: str | None = None
    keywords_count: int | None = None
    uploaded_at: datetime

    class Config:
        from_attributes = True

class HistoryDetailResponse(HistoryResponse):
    file_name: str
    file_path: str | None = None
    
    class Config:
        from_attributes = True

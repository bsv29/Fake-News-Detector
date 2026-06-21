from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.user import User
from app.models.analysis_history import AnalysisHistory
from app.services.auth_service import get_current_user
from app.services.pdf_report_service import PDFReportService
from datetime import datetime

router = APIRouter(prefix="/report", tags=["Report"])

@router.get("/{analysis_id}")
def generate_pdf_report(
    analysis_id: int,
    word_count: int = 0,
    clickbait_score: int = 0,
    reading_time: int = 0,
    summary: str = "N/A",
    keywords: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    record = db.query(AnalysisHistory).filter(AnalysisHistory.id == analysis_id, AnalysisHistory.user_id == current_user.id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found")

    data = {
        "file_name": record.file_name,
        "analysis_date": record.uploaded_at.strftime("%Y-%m-%d %H:%M:%S") if record.uploaded_at else datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "prediction": "FAKE" if record.status == "Not Credible" else "REAL" if record.status == "Credible" else record.status,
        "confidence_score": int(record.credibility_score) if record.credibility_score else 0,
        "sentiment": record.sentiment or "Neutral",
        "word_count": record.word_count if hasattr(record, 'word_count') and record.word_count else word_count,
        "clickbait_score": record.clickbait_score if hasattr(record, 'clickbait_score') and record.clickbait_score else clickbait_score,
        "reading_time": record.reading_time if hasattr(record, 'reading_time') and record.reading_time else reading_time,
        "summary": record.summary if hasattr(record, 'summary') and record.summary else summary,
        "keywords": [k.strip() for k in record.keywords.split(",") if k.strip()] if hasattr(record, 'keywords') and record.keywords else ([k.strip() for k in keywords.split(",") if k.strip()] if keywords else [])
    }

    pdf_buffer = PDFReportService.generate_report(data)
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=credly_report_{analysis_id}.pdf"
        }
    )

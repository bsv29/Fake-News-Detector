from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models.user import User
from app.models.analysis_history import AnalysisHistory
from app.schemas.history import HistoryResponse, HistoryDetailResponse
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/history", tags=["History"])

@router.get("", response_model=List[HistoryResponse])
def get_user_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve all analysis history records for the authenticated user, sorted by newest first.
    """
    records = db.query(AnalysisHistory)\
        .filter(AnalysisHistory.user_id == current_user.id)\
        .order_by(AnalysisHistory.uploaded_at.desc())\
        .all()
    
    return records

@router.get("/{history_id}", response_model=HistoryDetailResponse)
def get_history_detail(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve details of a specific history record belonging to the authenticated user.
    """
    record = db.query(AnalysisHistory)\
        .filter(AnalysisHistory.id == history_id, AnalysisHistory.user_id == current_user.id)\
        .first()
        
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="History record not found"
        )
        
    return record

@router.delete("/{history_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_history_record(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a specific history record belonging to the authenticated user.
    """
    record = db.query(AnalysisHistory)\
        .filter(AnalysisHistory.id == history_id, AnalysisHistory.user_id == current_user.id)\
        .first()
        
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="History record not found"
        )
        
    db.delete(record)
    db.commit()
    return None

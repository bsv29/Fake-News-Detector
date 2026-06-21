from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import logging
from sqlalchemy.orm import Session
from app.schemas.response import PredictionResponse, AnalysisDetails
from app.database.database import get_db
from app.models.user import User
from app.models.analysis_history import AnalysisHistory
from app.services.auth_service import get_current_user
from app.services.pdf_service import PDFService
from app.services.preprocessing_service import PreprocessingService
from app.services.prediction_service import PredictionService
from app.services.keyword_service import KeywordService
from app.services.summary_service import SummaryService
from app.services.sentiment_service import SentimentService
from app.services.clickbait_service import ClickbaitService
from app.services.analysis_service import AnalysisService

router = APIRouter()
logger = logging.getLogger("truthlens")

# Initialize prediction service (which loads models)
prediction_service = PredictionService()

@router.post("/analyze", response_model=PredictionResponse)
async def analyze_article(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if file.content_type != "application/pdf":
        logger.error("Invalid file type uploaded")
        raise HTTPException(status_code=400, detail="Invalid file format. Only PDF is allowed.")
        
    # Check size (FastAPI doesn't have a direct way to check size before reading, so we read and check length)
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        logger.error("File size exceeded 10MB")
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")
        
    logger.info(f"Received file for analysis: {file.filename}")
    
    # 1 & 2. PDF Validation and Extraction
    raw_text = PDFService.extract_text(content)
    
    # 3. Preprocessing
    processed_text = PreprocessingService.preprocess_text(raw_text)
    
    # 4 & 5. Word Count and Reading Time
    word_count = AnalysisService.get_word_count(raw_text)
    reading_time = AnalysisService.get_reading_time(word_count)

    # 6. Clickbait Score
    clickbait_data = ClickbaitService.calculate_score(raw_text)
    clickbait_score = clickbait_data["score"]
    clickbait_terms = clickbait_data["terms"]
    
    # 7. Prediction and Confidence (Now using word_count and clickbait_score)
    pred_result = prediction_service.predict(processed_text, word_count=word_count, clickbait_score=clickbait_score)
    
    # 8. Keyword Extraction
    keywords = KeywordService.extract_keywords(processed_text, prediction_service.vectorizer)
    
    # 9. Summary Generation
    summary = SummaryService.generate_summary(raw_text)
    
    # 10. Sentiment Analysis
    sentiment = SentimentService.calculate_sentiment(raw_text)
    
    # Determine Prediction Factors
    prediction_factors = []
    if clickbait_score >= 50:
        prediction_factors.append("High clickbait score detected")
    if sentiment.lower() == "negative":
        prediction_factors.append("Negative sentiment identified")
    if len(clickbait_terms) >= 2:
        prediction_factors.append("Contains sensational language")
    if len(keywords) > 0 and len(clickbait_terms) > 0:
        prediction_factors.append("Frequent occurrence of suspicious keywords")
    if not prediction_factors:
        prediction_factors.append("Based on textual linguistic features")
        
    logger.info(f"Analysis completed for: {file.filename} with prediction {pred_result['prediction']}")
    
    # Save to Analysis History
    try:
        final_score = pred_result.get("real_probability", 0)
        
        status = "Not Credible"
        if final_score >= 80:
            status = "Credible"
        elif final_score >= 50:
            status = "Potentially Misleading"
            
        history_record = AnalysisHistory(
            user_id=current_user.id,
            document_title=file.filename,
            file_name=file.filename,
            credibility_score=final_score,
            status=status,
            file_size=len(content),
            sentiment=sentiment,
            keywords_count=len(keywords),
            word_count=word_count,
            clickbait_score=clickbait_score,
            reading_time=reading_time,
            summary=summary,
            keywords=",".join(keywords) if keywords else ""
        )
        db.add(history_record)
        db.commit()
    except Exception as e:
        logger.error(f"Failed to save analysis history: {e}")
        db.rollback()
    
    return PredictionResponse(
        prediction=pred_result["prediction"],
        confidence=pred_result["confidence"],
        fake_probability=pred_result.get("fake_probability", 0),
        real_probability=pred_result.get("real_probability", 0),
        summary=summary,
        sentiment=sentiment,
        clickbait_score=clickbait_score,
        word_count=word_count,
        reading_time=reading_time,
        keywords=keywords,
        clickbait_terms=clickbait_terms,
        prediction_factors=prediction_factors,
        analysis_details=AnalysisDetails(
            model="Logistic Regression",
            vectorizer="TF-IDF",
            ngram_range="1-2"
        )
    )

from pydantic import BaseModel
from typing import List, Dict, Any

class AnalysisDetails(BaseModel):
    model: str
    vectorizer: str
    ngram_range: str

class PredictionResponse(BaseModel):
    prediction: str
    confidence: int
    fake_probability: int
    real_probability: int
    summary: str
    sentiment: str
    clickbait_score: int
    word_count: int
    reading_time: int
    keywords: List[str]
    clickbait_terms: List[str]
    prediction_factors: List[str]
    analysis_details: AnalysisDetails

# TruthLens AI - Phase 1 Backend

This is the FastAPI backend for the TruthLens AI Fake News Detection platform.

## Features
- PDF text extraction
- NLP Preprocessing
- Logistic Regression Fake News Prediction
- Sentiment Analysis, Text Summarization, Keyword Extraction
- Extensible architecture

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create dummy models (since we don't have the real trained ML models yet):
```bash
python app/models/create_dummy_models.py
```

4. Run the application:
```bash
uvicorn app.main:app --reload
```

## Sample API Request
Endpoint: `POST /api/v1/analyze`
Content-Type: `multipart/form-data`
Body: `file` -> `<your-pdf-file.pdf>`

## Sample API Response
```json
{
  "prediction": "FAKE",
  "confidence": 96,
  "summary": "This article claims that a new government scheme will provide free electricity to all citizens.",
  "sentiment": "Negative",
  "clickbait_score": 82,
  "word_count": 845,
  "reading_time": 4,
  "keywords": [
    "government",
    "scheme",
    "breaking",
    "claim",
    "exclusive"
  ],
  "analysis_details": {
    "model": "Logistic Regression",
    "vectorizer": "TF-IDF",
    "ngram_range": "1-2"
  }
}
```

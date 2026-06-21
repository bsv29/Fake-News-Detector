import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

try:
    nltk.data.find('sentiment/vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

class SentimentService:
    @staticmethod
    def calculate_sentiment(text: str) -> str:
        sia = SentimentIntensityAnalyzer()
        scores = sia.polarity_scores(text)
        
        compound = scores['compound']
        if compound >= 0.05:
            return "Positive"
        elif compound <= -0.05:
            return "Negative"
        else:
            return "Neutral"

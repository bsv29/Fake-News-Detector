from app.core.constants import CLICKBAIT_KEYWORDS

class ClickbaitService:
    @staticmethod
    def calculate_score(text: str) -> dict:
        text_lower = text.lower()
        score = 0
        found_terms = []
        for keyword in CLICKBAIT_KEYWORDS:
            if keyword in text_lower:
                score += 20
                found_terms.append(keyword)
        
        return {
            "score": min(score, 100),
            "terms": found_terms
        }

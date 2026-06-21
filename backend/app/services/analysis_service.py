class AnalysisService:
    @staticmethod
    def get_word_count(text: str) -> int:
        return len(text.split())

    @staticmethod
    def get_reading_time(word_count: int) -> int:
        # Assume average reading speed of 200 words per minute
        minutes = word_count // 200
        return max(1, minutes)

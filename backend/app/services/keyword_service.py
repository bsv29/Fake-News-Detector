import numpy as np

class KeywordService:
    @staticmethod
    def extract_keywords(processed_text: str, vectorizer=None, top_n: int = 10) -> list:
        if not vectorizer:
            # Fallback if no vectorizer is loaded
            words = processed_text.split()
            unique_words = list(set(words))
            return unique_words[:top_n]
            
        try:
            tfidf_matrix = vectorizer.transform([processed_text])
            feature_names = vectorizer.get_feature_names_out()
            
            # Get indices of top tf-idf scores
            scores = tfidf_matrix.toarray().flatten()
            non_zero_indices = [i for i in np.argsort(scores)[::-1] if scores[i] > 0]
            
            if non_zero_indices:
                top_keywords = [feature_names[i] for i in non_zero_indices[:top_n]]
                return top_keywords
            else:
                words = processed_text.split()
                unique_words = list(dict.fromkeys(words))
                return unique_words[:top_n]
        except Exception:
            # Fallback
            return processed_text.split()[:top_n]

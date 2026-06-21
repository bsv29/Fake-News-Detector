import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

# Ensure downloads are available
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab')
    
class PreprocessingService:
    @staticmethod
    def preprocess_text(text: str) -> str:
        # Lowercase
        text = text.lower()
        # Remove special characters, numbers and punctuation
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Stopword removal and lemmatization
        stop_words = set(stopwords.words('english'))
        lemmatizer = WordNetLemmatizer()
        
        processed_tokens = [
            lemmatizer.lemmatize(word) 
            for word in tokens 
            if word not in stop_words
        ]
        
        return " ".join(processed_tokens)

import joblib
import os
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer

def create_dummy_models():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "fake_news_model.pkl")
    vectorizer_path = os.path.join(base_dir, "tfidf_vectorizer.pkl")
    
    # Create dummy TF-IDF vectorizer
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    texts = ["breaking news government scheme", "real news verified source", "this is a very fake unbelievable news", "exclusive shocking secret"]
    vectorizer.fit(texts)
    
    # Create dummy Logistic Regression model
    model = LogisticRegression()
    X = vectorizer.transform(texts)
    y = [0, 1, 0, 0]  # 0 for FAKE, 1 for REAL
    model.fit(X, y)
    
    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vectorizer_path)
    print("Dummy models created successfully.")

if __name__ == "__main__":
    create_dummy_models()

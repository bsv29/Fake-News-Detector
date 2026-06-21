import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Create a small but diverse dataset
data = [
    # FAKE / SENSATIONALIZED (0)
    ("shocking secret revealed you won't believe what happened next", 0),
    ("unbelievable news very fake this is totally fabricated and clickbait", 0),
    ("doctors hate him discover this one weird trick to lose weight instantly", 0),
    ("miracle cure found inside your kitchen cabinet totally legit not fake", 0),
    ("the government is hiding this secret unbelievable conspiracy theory", 0),
    ("you will be shocked when you see these leaked photos very verified source", 0),
    ("mind blowing truth about celebrities exposed 100% verified real", 0),
    ("click here to claim your free prize right now before it expires", 0),
    
    # REAL / FORMAL / OBJECTIVE (1)
    ("The National Transportation Safety Board determines the probable cause of this incident.", 1),
    ("Aviation Investigation Report AIR-24-01 Runway Incursion and Rejected Takeoff", 1),
    ("The flight crew of American Airlines flight 106 was instructed to taxi to runway 4L.", 1),
    ("According to the FAA Advisory Circular, runway entrance lights illuminate when an aircraft is taking off.", 1),
    ("Data from the flight data recorder indicated that the throttle moved to idle and the autobrakes were triggered.", 1),
    ("Abstract: This report discusses the incident involving a Boeing 777 and a Boeing 737 at John F. Kennedy International Airport.", 1),
    ("The patient was administered 50mg of medication intravenously and showed steady improvement over 24 hours.", 1),
    ("Title 14 Code of Federal Regulations Part 121 operators must incorporate standard operating procedures.", 1),
    ("Meteorological Information: At 1951, the automated weather observation included wind from 320 degrees at 18 knots.", 1),
    ("Safety Recommendation A-24-4 collaborate with aircraft and avionics manufacturers to develop technology.", 1),
    ("Analysis of the structural integrity of the bridge revealed significant corrosion in the primary load-bearing members.", 1)
]

texts = [text for text, label in data]
labels = [label for text, label in data]

# Train TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
X = vectorizer.fit_transform(texts)

# Train Logistic Regression Model
model = LogisticRegression(random_state=42)
model.fit(X, labels)

# Save Models
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
models_dir = os.path.join(base_dir, "models")
os.makedirs(models_dir, exist_ok=True)

model_path = os.path.join(models_dir, "fake_news_model.pkl")
vectorizer_path = os.path.join(models_dir, "tfidf_vectorizer.pkl")

joblib.dump(model, model_path)
joblib.dump(vectorizer, vectorizer_path)

print("Model and Vectorizer trained and saved successfully.")

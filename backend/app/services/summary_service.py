from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
import nltk

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

class SummaryService:
    @staticmethod
    def generate_summary(text: str, sentences_count: int = 2) -> str:
        try:
            parser = PlaintextParser.from_string(text, Tokenizer("english"))
            summarizer = TextRankSummarizer()
            summary_sentences = summarizer(parser.document, sentences_count)
            summary = " ".join([str(sentence) for sentence in summary_sentences])
            return summary if summary else text[:200] + "..."
        except Exception:
            return text[:200] + "..."

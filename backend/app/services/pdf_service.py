import fitz  # PyMuPDF
import pdfplumber
import io
from fastapi import HTTPException

class PDFService:
    @staticmethod
    def extract_text(file_content: bytes) -> str:
        text = ""
        try:
            # Try PyMuPDF first
            doc = fitz.open(stream=file_content, filetype="pdf")
            for page in doc:
                text += page.get_text()
        except Exception as e:
            # Fallback to pdfplumber
            try:
                with pdfplumber.open(io.BytesIO(file_content)) as pdf:
                    for page in pdf.pages:
                        extracted = page.extract_text()
                        if extracted:
                            text += extracted + "\n"
            except Exception as inner_e:
                raise HTTPException(status_code=400, detail="Invalid PDF file or unable to extract text.")

        if not text.strip():
            raise HTTPException(status_code=400, detail="PDF has no extractable text.")
            
        return text

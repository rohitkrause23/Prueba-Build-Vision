import os
import cv2
import fitz  # PyMuPDF
import numpy as np
from dotenv import load_dotenv

load_dotenv()

class DocumentProcessor:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")

    def process_pdf(self, file_path):
        """Extrae imágenes y texto de un PDF usando PyMuPDF."""
        doc = fitz.open(file_path)
        text = ""
        images = []
        for page in doc:
            text += page.get_text()
            # Lógica de extracción de imágenes para OpenCV
        return text

    def preprocess_image(self, image_bytes):
        """Usa OpenCV para mejorar la legibilidad de planos o facturas."""
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convertir a escala de grises
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Aplicar umbral para resaltar texto (Denoising)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        return thresh

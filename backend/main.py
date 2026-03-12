from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .processor import DocumentProcessor
from .schemas import ExtractionResponse
import os

app = FastAPI(title="BuildVision AI Backend")

# Configuración de CORS para conectar con el frontend de React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = DocumentProcessor()

@app.get("/")
async def root():
    return {"message": "BuildVision AI Python API is running"}

@app.post("/extract", response_model=ExtractionResponse)
async def extract_data(file: UploadFile = File(...)):
    try:
        content = await file.read()
        
        # Aquí iría la lógica real de procesamiento con OpenCV/PyMuPDF
        # y la llamada a Gemini via Python SDK
        
        return {
            "document_type": "Factura",
            "total_cost": 1450.0,
            "materials": [
                {"description": "Cemento", "quantity": "20 sacos"},
                {"description": "Varilla", "quantity": "50 unid"}
            ],
            "confidence_score": 95
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

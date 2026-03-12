from pydantic import BaseModel
from typing import List, Optional

class Material(BaseModel):
    description: str
    quantity: str

class ExtractionResponse(BaseModel):
    document_type: str
    total_cost: float
    materials: List[Material]
    confidence_score: int
    raw_text: Optional[str] = None

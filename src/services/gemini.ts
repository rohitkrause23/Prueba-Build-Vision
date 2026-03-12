import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ExtractionResult {
  document_type: string;
  total_cost: number;
  materials: Array<{
    description: string;
    quantity: string | number;
  }>;
  confidence_score: number;
}

export async function extractConstructionData(file: File): Promise<ExtractionResult> {
  const model = "gemini-3-flash-preview";
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(file);
  });

  const prompt = `Actúa como un motor de extracción de datos especializado en la industria de la construcción. 
  Tu objetivo es recibir este documento y devolver estrictamente un objeto JSON.
  
  El JSON debe contener:
  - document_type: (ej. Factura, Presupuesto, Plano).
  - total_cost: Solo el número.
  - materials: Una lista de objetos con description y quantity.
  - confidence_score: Tu nivel de certeza del 1 al 100.
  
  No añadas texto adicional, solo el JSON puro.`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          document_type: { type: Type.STRING },
          total_cost: { type: Type.NUMBER },
          materials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                quantity: { type: Type.STRING }
              },
              required: ["description", "quantity"]
            }
          },
          confidence_score: { type: Type.NUMBER }
        },
        required: ["document_type", "total_cost", "materials", "confidence_score"]
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Error al procesar el documento. Inténtalo de nuevo.");
  }
}

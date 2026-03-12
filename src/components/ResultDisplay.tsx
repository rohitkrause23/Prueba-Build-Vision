import React from 'react';
import { ExtractionResult } from '../services/gemini';
import { CheckCircle2, AlertCircle, HardHat, DollarSign, List } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultDisplayProps {
  result: ExtractionResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-brand-primary/10 overflow-hidden"
    >
      <div className="bg-brand-primary p-6 text-brand-bg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HardHat className="text-brand-accent" />
          <h2 className="text-xl font-bold tracking-tight uppercase">Extracción Completada</h2>
        </div>
        <div className="flex items-center gap-2 bg-brand-bg/10 px-3 py-1 rounded-full">
          <span className="text-xs font-mono">CONFIDENCE:</span>
          <span className={`font-mono font-bold ${result.confidence_score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>
            {result.confidence_score}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-brand-primary/10">
        <div className="p-6 border-r border-brand-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <FileTextIcon className="w-4 h-4 opacity-50" />
            <span className="col-header">Tipo de Documento</span>
          </div>
          <p className="text-2xl font-bold text-brand-primary uppercase">{result.document_type}</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 opacity-50" />
            <span className="col-header">Costo Total</span>
          </div>
          <p className="text-2xl font-mono font-bold text-brand-accent">
            ${result.total_cost.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <List className="w-4 h-4 opacity-50" />
          <span className="col-header">Materiales Detectados</span>
        </div>
        
        <div className="space-y-1">
          <div className="grid grid-cols-12 px-4 py-2 bg-brand-primary/5 rounded-t-lg">
            <div className="col-span-8 col-header">Descripción</div>
            <div className="col-span-4 col-header text-right">Cantidad</div>
          </div>
          
          {result.materials.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 data-row">
              <div className="col-span-8 font-medium">{item.description}</div>
              <div className="col-span-4 text-right data-value">{item.quantity}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-brand-primary/5 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs opacity-60">
          <CheckCircle2 size={14} className="text-green-600" />
          Datos validados por BuildVision Vision AI
        </div>
        <button 
          onClick={() => window.print()}
          className="text-xs font-bold uppercase tracking-widest hover:text-brand-accent transition-colors"
        >
          Exportar PDF
        </button>
      </div>
    </motion.div>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

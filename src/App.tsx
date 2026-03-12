import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { extractConstructionData, ExtractionResult } from './services/gemini';
import { HardHat, Activity, Database, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const data = await extractConstructionData(file);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-brand-primary p-1.5 rounded-lg">
              <HardHat className="text-brand-accent w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tighter uppercase">
              BuildVision <span className="text-brand-accent">AI</span>
            </h1>
          </div>

          <div className="flex-1 overflow-hidden mask-fade-edges">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
              <span>rohit krause prueba</span>
              <span>rohit krause prueba</span>
              <span>rohit krause prueba</span>
              <span>rohit krause prueba</span>
              <span>rohit krause prueba</span>
              <span>rohit krause prueba</span>
            </div>
          </div>

          <div className="w-32 hidden lg:block shrink-0" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Pipeline de Extracción <br />
            <span className="text-brand-accent italic">de Datos Vision AI</span>
          </motion.h2>
          <p className="text-brand-primary/60 max-w-xl mx-auto">
            Transforma documentos de construcción desordenados en datos estructurados listos para producción.
          </p>
        </div>

        <div className="space-y-8">
          <FileUploader onFileSelect={handleFileSelect} isProcessing={isProcessing} />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {result && (
              <ResultDisplay result={result} />
            )}
          </AnimatePresence>
        </div>

        {!result && !isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
            <FeatureCard 
              icon={<ShieldCheck className="text-brand-accent" />}
              title="Seguridad"
              description="Arquitectura serverless con persistencia cifrada."
            />
            <FeatureCard 
              icon={<Activity className="text-brand-accent" />}
              title="Precisión"
              description="Modelos Gemini 3.1 Pro para máxima fiabilidad."
            />
            <FeatureCard 
              icon={<Database className="text-brand-accent" />}
              title="Integración"
              description="Exportación directa a sistemas ERP y bases de datos."
            />
          </div>
        )}
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-brand-primary/5 bg-white/30 backdrop-blur-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold uppercase tracking-tight text-sm mb-2">{title}</h3>
      <p className="text-xs text-brand-primary/60 leading-relaxed">{description}</p>
    </div>
  );
}


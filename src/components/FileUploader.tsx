import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUploader({ onFileSelect, isProcessing }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isProcessing
  } as any);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4",
        isDragActive ? "border-brand-accent bg-brand-accent/5" : "border-brand-primary/20 hover:border-brand-accent/50",
        isProcessing && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      
      {isProcessing ? (
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
      ) : (
        <div className="bg-brand-primary/5 p-4 rounded-full">
          <Upload className="w-8 h-8 text-brand-primary" />
        </div>
      )}
      
      <div className="text-center">
        <p className="text-lg font-medium">
          {isProcessing ? "Procesando documento..." : "Arrastra tus documentos aquí"}
        </p>
        <p className="text-sm text-brand-primary/60 mt-1">
          Soporta Facturas, Presupuestos y Planos (JPG, PNG, PDF)
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-1 text-xs font-mono opacity-50">
          <FileText size={14} /> PDF
        </div>
        <div className="flex items-center gap-1 text-xs font-mono opacity-50">
          <ImageIcon size={14} /> IMAGES
        </div>
      </div>
    </div>
  );
}

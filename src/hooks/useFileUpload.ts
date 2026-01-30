import { useState, useCallback } from 'react';
import { SimulatedFile, FileStatus, DEFAULT_VALIDATION, ValidationConfig } from '@/types/file';

export function useFileUpload(config: ValidationConfig = DEFAULT_VALIDATION) {
  const [files, setFiles] = useState<SimulatedFile[]>([]);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const validateFile = useCallback((file: File): { valid: boolean; error: 'type' | 'size' | null; message?: string } => {
    // Check file type
    if (!config.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'type',
        message: `Tipo di file non supportato. Tipi consentiti: immagini, PDF, documenti.`
      };
    }

    // Check file size
    if (file.size > config.maxSize) {
      return {
        valid: false,
        error: 'size',
        message: `File troppo grande. Dimensione massima: ${config.maxSize / (1024 * 1024)}MB`
      };
    }

    return { valid: true, error: null };
  }, [config]);

  const simulateUpload = useCallback(async (fileId: string, fileSize: number) => {
    // Calculate realistic upload time based on file size (simulate ~1MB/s)
    const baseTime = Math.max(1000, Math.min(5000, (fileSize / 1024 / 1024) * 1000));
    const steps = 20;
    const stepTime = baseTime / steps;

    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepTime));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress: Math.min(100, (i / steps) * 100) } : f
      ));
    }

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'success' as FileStatus, progress: 100 } : f
    ));
  }, []);

  const addFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);

    for (const file of fileArray) {
      const id = generateId();
      
      // Step 1: Add file as pending
      setActiveStep('browser');
      const simulatedFile: SimulatedFile = {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        progress: 0,
        error: null,
        addedAt: new Date(),
      };

      setFiles(prev => [...prev, simulatedFile]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 2: Validate
      setActiveStep('frontend');
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'validating' as FileStatus } : f
      ));
      await new Promise(resolve => setTimeout(resolve, 800));

      const validation = validateFile(file);

      if (!validation.valid) {
        setFiles(prev => prev.map(f => 
          f.id === id ? { 
            ...f, 
            status: 'error' as FileStatus, 
            error: validation.error, 
            errorMessage: validation.message 
          } : f
        ));
        setActiveStep(null);
        continue;
      }

      // Step 3: Upload
      setActiveStep('backend');
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'uploading' as FileStatus } : f
      ));
      await simulateUpload(id, file.size);

      // Step 4: Storage
      setActiveStep('storage');
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveStep(null);
    }
  }, [validateFile, simulateUpload]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    activeStep,
    addFiles,
    removeFile,
    clearFiles,
    validationConfig: config,
  };
}

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileUp, Info } from 'lucide-react';
import { formatFileSize, DEFAULT_VALIDATION } from '@/types/file';

interface FileUploadZoneProps {
  onFilesSelected: (files: FileList) => void;
  isUploading: boolean;
}

export function FileUploadZone({ onFilesSelected, isUploading }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      e.target.value = '';
    }
  }, [onFilesSelected]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileUp className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Carica File</h2>
      </div>

      <motion.div
        className={`upload-zone p-8 text-center cursor-pointer ${isDragging ? 'upload-zone-active' : ''} ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        whileHover={{ scale: isUploading ? 1 : 1.01 }}
        whileTap={{ scale: isUploading ? 1 : 0.99 }}
      >
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
          accept={DEFAULT_VALIDATION.allowedTypes.join(',')}
        />

        <AnimatePresence mode="wait">
          {isDragging ? (
            <motion.div
              key="dragging"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-4"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Upload className="w-12 h-12 mx-auto text-primary mb-3" />
              </motion.div>
              <p className="text-lg font-medium text-primary">Rilascia qui i file</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4"
            >
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-base font-medium mb-1">
                Trascina i file qui o <span className="text-primary underline">sfoglia</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Supporta immagini, PDF e documenti fino a {formatFileSize(DEFAULT_VALIDATION.maxSize)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Educational tooltip */}
      <motion.div 
        className="info-box flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-accent-foreground mb-1">💡 Come funziona il drag & drop?</p>
          <p className="text-muted-foreground">
            Quando trascini un file, il browser cattura l'evento <code className="bg-muted px-1 py-0.5 rounded text-xs">dragover</code> e 
            legge i dati del file con l'API <code className="bg-muted px-1 py-0.5 rounded text-xs">DataTransfer</code>. 
            Il file non viene ancora caricato, è solo in memoria.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

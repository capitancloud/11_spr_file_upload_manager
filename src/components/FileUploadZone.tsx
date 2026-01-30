import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileUp, Info, Sparkles } from 'lucide-react';
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

  // Floating icons animation
  const floatingIcons = [
    { icon: '📄', delay: 0, x: -40, y: -20 },
    { icon: '🖼️', delay: 0.2, x: 40, y: -30 },
    { icon: '📁', delay: 0.4, x: -30, y: 20 },
    { icon: '📎', delay: 0.6, x: 50, y: 10 },
  ];

  return (
    <div className="space-y-4">
      <motion.div 
        className="flex items-center gap-2 mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FileUp className="w-5 h-5 text-primary" />
        </motion.div>
        <h2 className="text-lg font-semibold">Carica File</h2>
      </motion.div>

      <motion.div
        className={`upload-zone p-8 text-center cursor-pointer relative overflow-hidden ${isDragging ? 'upload-zone-active' : ''} ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        whileHover={{ scale: isUploading ? 1 : 1.02, boxShadow: "0 0 30px hsl(175 70% 45% / 0.2)" }}
        whileTap={{ scale: isUploading ? 1 : 0.98 }}
        animate={{
          borderColor: isDragging ? 'hsl(175 70% 50%)' : 'hsl(175 50% 35%)',
          boxShadow: isDragging 
            ? '0 0 40px hsl(175 70% 45% / 0.3), inset 0 0 30px hsl(175 70% 45% / 0.1)' 
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          style={{
            background: 'linear-gradient(45deg, hsl(175 70% 45% / 0.1), transparent, hsl(175 70% 45% / 0.1))',
          }}
          animate={{
            opacity: isDragging ? 1 : 0,
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="py-4 relative"
            >
              {/* Floating file icons */}
              {floatingIcons.map((item, index) => (
                <motion.span
                  key={index}
                  className="absolute text-2xl"
                  style={{ left: '50%', top: '50%' }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ 
                    x: item.x, 
                    y: item.y, 
                    opacity: 1,
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    delay: item.delay, 
                    duration: 0.5,
                    rotate: { duration: 2, repeat: Infinity }
                  }}
                >
                  {item.icon}
                </motion.span>
              ))}
              
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                <Upload className="w-14 h-14 mx-auto text-primary mb-3 drop-shadow-[0_0_15px_hsl(175_70%_45%/0.5)]" />
              </motion.div>
              <motion.p 
                className="text-lg font-medium text-primary"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Rilascia qui i file
              </motion.p>
              <motion.div
                className="flex items-center justify-center gap-1 mt-2 text-primary/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Pronto per ricevere</span>
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              </motion.div>
              <p className="text-base font-medium mb-1">
                Trascina i file qui o{' '}
                <motion.span 
                  className="text-primary underline"
                  whileHover={{ scale: 1.05 }}
                >
                  sfoglia
                </motion.span>
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
        whileHover={{ scale: 1.01, boxShadow: "0 4px 20px hsl(175 50% 20% / 0.2)" }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
        </motion.div>
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

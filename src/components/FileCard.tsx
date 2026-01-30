import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2, FileWarning, Shield, HardDrive } from 'lucide-react';
import { SimulatedFile, formatFileSize, getFileIcon, FILE_TYPE_NAMES } from '@/types/file';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FileCardProps {
  file: SimulatedFile;
  onRemove: (id: string) => void;
}

export function FileCard({ file, onRemove }: FileCardProps) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'pending':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        );
      case 'validating':
        return (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Shield className="w-4 h-4 text-warning drop-shadow-[0_0_8px_hsl(38_90%_55%/0.5)]" />
          </motion.div>
        );
      case 'uploading':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-4 h-4 text-primary drop-shadow-[0_0_8px_hsl(175_70%_45%/0.5)]" />
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <CheckCircle2 className="w-4 h-4 text-success drop-shadow-[0_0_8px_hsl(145_60%_45%/0.5)]" />
          </motion.div>
        );
      case 'error':
        return (
          <motion.div
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.3, repeat: 3 }}
          >
            <AlertCircle className="w-4 h-4 text-destructive drop-shadow-[0_0_8px_hsl(0_65%_55%/0.5)]" />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (file.status) {
      case 'pending':
        return 'In attesa...';
      case 'validating':
        return 'Validazione...';
      case 'uploading':
        return `Caricamento ${Math.round(file.progress)}%`;
      case 'success':
        return 'Caricato';
      case 'error':
        return file.errorMessage || 'Errore';
      default:
        return '';
    }
  };

  const getErrorTooltip = () => {
    if (file.error === 'type') {
      return (
        <div className="space-y-2 max-w-xs">
          <p className="font-medium flex items-center gap-2">
            <FileWarning className="w-4 h-4" /> Tipo di file non valido
          </p>
          <p className="text-sm opacity-90">
            I controlli sul tipo di file sono fondamentali per la <strong>sicurezza</strong>. 
            File eseguibili o script malevoli potrebbero danneggiare il server o gli utenti.
          </p>
          <p className="text-xs opacity-70 mt-2">
            💡 In un'app reale, si controlla anche il "magic number" del file, non solo l'estensione.
          </p>
        </div>
      );
    }
    if (file.error === 'size') {
      return (
        <div className="space-y-2 max-w-xs">
          <p className="font-medium flex items-center gap-2">
            <HardDrive className="w-4 h-4" /> File troppo grande
          </p>
          <p className="text-sm opacity-90">
            I limiti di dimensione proteggono il server da <strong>attacchi DoS</strong> e 
            controllano i <strong>costi di storage</strong>.
          </p>
          <p className="text-xs opacity-70 mt-2">
            💡 Per file grandi, si usa l'upload a chunk o direttamente su cloud storage.
          </p>
        </div>
      );
    }
    return null;
  };

  const cardVariants = {
    initial: { opacity: 0, x: -30, scale: 0.9 },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      scale: 0.8,
    },
  };

  return (
    <TooltipProvider>
      <motion.div
        layout
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover={{ scale: 1.02, y: -2 }}
        className={`glass-card rounded-lg p-4 relative overflow-hidden ${
          file.status === 'error' ? 'border-destructive/50 bg-destructive/5' : ''
        } ${file.status === 'success' ? 'border-success/50 bg-success/5' : ''}`}
      >
        {/* Animated background for uploading state */}
        {file.status === 'uploading' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Success celebration effect */}
        {file.status === 'success' && (
          <motion.div
            className="absolute inset-0 bg-success/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="flex items-start gap-3 relative z-10">
          {/* File icon with animation */}
          <motion.div 
            className="text-2xl flex-shrink-0"
            animate={file.status === 'uploading' ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {getFileIcon(file.type)}
          </motion.div>

          {/* File info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium truncate">{file.name}</p>
              {file.status === 'error' && (
                <Tooltip>
                  <TooltipTrigger>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <AlertCircle className="w-4 h-4 text-destructive cursor-help" />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent className="edu-tooltip">
                    {getErrorTooltip()}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <span>{FILE_TYPE_NAMES[file.type] || file.type}</span>
              <span>•</span>
              <span>{formatFileSize(file.size)}</span>
            </div>

            {/* Progress bar for uploading */}
            {file.status === 'uploading' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2"
              >
                <div className="relative">
                  <Progress value={file.progress} className="h-2" />
                  <motion.div
                    className="absolute inset-0 h-2 rounded-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - file.progress}% 0 0)` }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Status */}
            <div className="flex items-center gap-2 mt-2">
              {getStatusIcon()}
              <motion.span 
                className={`text-sm ${
                  file.status === 'error' ? 'text-destructive' : 
                  file.status === 'success' ? 'text-success' : 
                  'text-muted-foreground'
                }`}
                animate={file.status === 'uploading' ? { opacity: [1, 0.7, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {getStatusLabel()}
              </motion.span>
            </div>
          </div>

          {/* Remove button */}
          <motion.button
            onClick={() => onRemove(file.id)}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8 }}
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

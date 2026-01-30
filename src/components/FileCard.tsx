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
        return <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />;
      case 'validating':
        return <Shield className="w-4 h-4 text-warning animate-pulse" />;
      case 'uploading':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
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
    initial: { opacity: 0, x: -20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 20, scale: 0.95 },
  };

  return (
    <TooltipProvider>
      <motion.div
        layout
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`glass-card rounded-lg p-4 ${
          file.status === 'error' ? 'border-destructive/50 bg-destructive/5' : ''
        } ${file.status === 'success' ? 'border-success/50 bg-success/5' : ''}`}
      >
        <div className="flex items-start gap-3">
          {/* File icon */}
          <div className="text-2xl flex-shrink-0">
            {getFileIcon(file.type)}
          </div>

          {/* File info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium truncate">{file.name}</p>
              {file.status === 'error' && (
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="w-4 h-4 text-destructive cursor-help" />
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
                <Progress value={file.progress} className="h-2" />
              </motion.div>
            )}

            {/* Status */}
            <div className="flex items-center gap-2 mt-2">
              {getStatusIcon()}
              <span className={`text-sm ${
                file.status === 'error' ? 'text-destructive' : 
                file.status === 'success' ? 'text-success' : 
                'text-muted-foreground'
              }`}>
                {getStatusLabel()}
              </span>
            </div>
          </div>

          {/* Remove button */}
          <motion.button
            onClick={() => onRemove(file.id)}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

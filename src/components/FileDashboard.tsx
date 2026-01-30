import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Trash2, CheckCircle2, AlertCircle, Clock, Info } from 'lucide-react';
import { SimulatedFile } from '@/types/file';
import { FileCard } from './FileCard';
import { Button } from '@/components/ui/button';

interface FileDashboardProps {
  files: SimulatedFile[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function FileDashboard({ files, onRemove, onClear }: FileDashboardProps) {
  const stats = {
    total: files.length,
    success: files.filter(f => f.status === 'success').length,
    error: files.filter(f => f.status === 'error').length,
    pending: files.filter(f => ['pending', 'validating', 'uploading'].includes(f.status)).length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Dashboard File</h2>
        </div>
        
        {files.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Pulisci tutto
          </Button>
        )}
      </div>

      {/* Stats */}
      {files.length > 0 && (
        <motion.div 
          className="grid grid-cols-4 gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass-card rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Totale</p>
          </div>
          <div className="glass-card rounded-lg p-3 text-center status-success">
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-2xl font-bold">{stats.success}</span>
            </div>
            <p className="text-xs opacity-80">Caricati</p>
          </div>
          <div className="glass-card rounded-lg p-3 text-center status-error">
            <div className="flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-2xl font-bold">{stats.error}</span>
            </div>
            <p className="text-xs opacity-80">Errori</p>
          </div>
          <div className="glass-card rounded-lg p-3 text-center bg-muted/50">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-2xl font-bold text-muted-foreground">{stats.pending}</span>
            </div>
            <p className="text-xs text-muted-foreground">In corso</p>
          </div>
        </motion.div>
      )}

      {/* File list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {files.map(file => (
            <FileCard key={file.id} file={file} onRemove={onRemove} />
          ))}
        </AnimatePresence>
        
        {files.length === 0 && (
          <motion.div 
            className="glass-card rounded-xl p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LayoutGrid className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground mb-1">Nessun file caricato</p>
            <p className="text-sm text-muted-foreground/70">
              Trascina o seleziona file per iniziare
            </p>
          </motion.div>
        )}
      </div>

      {/* Educational note */}
      <motion.div 
        className="info-box flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-accent-foreground mb-1">📊 Gestione dello stato</p>
          <p className="text-muted-foreground">
            Questa dashboard usa React state per tracciare ogni file. In un'app reale, 
            i dati arriverebbero da una <code className="bg-muted px-1 py-0.5 rounded text-xs">API REST</code> o 
            <code className="bg-muted px-1 py-0.5 rounded text-xs">GraphQL</code>, e useresti un database per persistenza.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

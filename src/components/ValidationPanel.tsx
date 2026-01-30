import { motion } from 'framer-motion';
import { Shield, FileCheck, HardDrive, AlertTriangle, Info } from 'lucide-react';
import { formatFileSize, DEFAULT_VALIDATION, FILE_TYPE_NAMES } from '@/types/file';

export function ValidationPanel() {
  const allowedTypeLabels = DEFAULT_VALIDATION.allowedTypes.map(
    type => FILE_TYPE_NAMES[type] || type
  );
  const uniqueLabels = [...new Set(allowedTypeLabels)];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Controlli di Validazione</h2>
      </div>

      <div className="glass-card rounded-xl p-5 space-y-5">
        {/* File type validation */}
        <motion.div
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <FileCheck className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">Controllo tipo file</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Tipi consentiti:
            </p>
            <div className="flex flex-wrap gap-1">
              {uniqueLabels.map((label, i) => (
                <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-t border-border" />

        {/* File size validation */}
        <motion.div
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-2 rounded-lg bg-warning/10">
            <HardDrive className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">Controllo dimensione</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Dimensione massima: <strong>{formatFileSize(DEFAULT_VALIDATION.maxSize)}</strong>
            </p>
            <div className="bg-muted rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-success via-warning to-destructive"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0 MB</span>
              <span>{formatFileSize(DEFAULT_VALIDATION.maxSize)}</span>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-border" />

        {/* Security notes */}
        <motion.div
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">Perché questi controlli?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Sicurezza:</strong> Previene l'upload di file malevoli (virus, script)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Performance:</strong> File troppo grandi rallentano server e utenti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Costi:</strong> Lo storage cloud costa in base ai GB memorizzati</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Educational note */}
      <motion.div 
        className="info-box flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-accent-foreground mb-1">🔒 Validazione a due livelli</p>
          <p className="text-muted-foreground">
            In un'app sicura, la validazione avviene <strong>sia nel frontend che nel backend</strong>. 
            Il frontend migliora la UX con feedback immediato, ma non è mai sufficiente: 
            un attaccante può bypassarlo facilmente.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

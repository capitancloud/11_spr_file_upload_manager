import { motion } from 'framer-motion';
import { Monitor, Code2, Server, Database, ArrowRight, Info } from 'lucide-react';

interface ArchitectureDiagramProps {
  activeStep: string | null;
}

const steps = [
  {
    id: 'browser',
    icon: Monitor,
    label: 'Browser',
    description: 'L\'utente seleziona i file',
    detail: 'Il file viene letto in memoria tramite l\'API File del browser. Nessun dato è ancora stato inviato al server.',
  },
  {
    id: 'frontend',
    icon: Code2,
    label: 'Frontend',
    description: 'Validazione client-side',
    detail: 'Il frontend verifica tipo e dimensione del file prima dell\'invio. Questo riduce il carico sul server e migliora la UX.',
  },
  {
    id: 'backend',
    icon: Server,
    label: 'Backend',
    description: 'Elaborazione del file',
    detail: 'Il server riceve il file, lo valida nuovamente e lo prepara per lo storage. In un\'app reale, qui avverrebbe anche la scansione antivirus.',
  },
  {
    id: 'storage',
    icon: Database,
    label: 'Storage',
    description: 'Salvataggio persistente',
    detail: 'Il file viene salvato in modo permanente (filesystem, cloud storage come S3, o database). Qui viene generato un URL pubblico.',
  },
];

export function ArchitectureDiagram({ activeStep }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Architettura del Sistema</h2>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <motion.div
                className={`diagram-node p-4 min-w-[100px] text-center ${activeStep === step.id ? 'diagram-node-active' : ''}`}
                animate={{
                  scale: activeStep === step.id ? 1.05 : 1,
                  borderColor: activeStep === step.id ? 'hsl(var(--diagram-highlight))' : 'hsl(var(--diagram-node))',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    y: activeStep === step.id ? [0, -3, 0] : 0,
                  }}
                  transition={{ repeat: activeStep === step.id ? Infinity : 0, duration: 0.8 }}
                >
                  <step.icon className={`w-6 h-6 mx-auto mb-2 ${activeStep === step.id ? 'text-primary' : 'text-muted-foreground'}`} />
                </motion.div>
                <p className={`text-sm font-medium ${activeStep === step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div
                  animate={{
                    opacity: activeStep === steps[index + 1]?.id || activeStep === step.id ? 1 : 0.3,
                    x: activeStep === step.id ? [0, 4, 0] : 0,
                  }}
                  transition={{ repeat: activeStep === step.id ? Infinity : 0, duration: 0.6 }}
                >
                  <ArrowRight className="w-5 h-5 text-[hsl(var(--diagram-line))]" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Step descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                activeStep === step.id 
                  ? 'bg-primary/10 border border-primary/30' 
                  : 'bg-muted/50'
              }`}
              animate={{
                scale: activeStep === step.id ? 1.02 : 1,
              }}
            >
              <p className={`font-medium mb-1 ${activeStep === step.id ? 'text-primary' : 'text-foreground'}`}>
                {step.description}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Educational note */}
      <motion.div 
        className="info-box flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-accent-foreground mb-1">⚠️ Nota didattica</p>
          <p className="text-muted-foreground">
            In questa app, <strong>backend e storage sono simulati</strong>. I file restano solo nella memoria del browser.
            In un'app reale, avresti bisogno di un server (Node.js, Python, etc.) e uno storage persistente (AWS S3, Google Cloud Storage, etc.)
            per salvare i file in modo permanente e accessibile a tutti gli utenti.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

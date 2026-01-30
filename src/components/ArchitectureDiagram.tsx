import { motion } from 'framer-motion';
import { Monitor, Code2, Server, Database, ArrowRight, Info, Zap } from 'lucide-react';

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
  const activeIndex = steps.findIndex(s => s.id === activeStep);

  return (
    <div className="space-y-4">
      <motion.div 
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <motion.div
          animate={{ rotate: activeStep ? [0, 360] : 0 }}
          transition={{ duration: 2, repeat: activeStep ? Infinity : 0, ease: "linear" }}
        >
          <Server className="w-5 h-5 text-primary" />
        </motion.div>
        <h2 className="text-lg font-semibold">Architettura del Sistema</h2>
        {activeStep && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            In corso
          </motion.span>
        )}
      </motion.div>

      <motion.div 
        className="glass-card rounded-xl p-6"
        animate={{
          boxShadow: activeStep 
            ? '0 0 30px hsl(175 70% 45% / 0.15)' 
            : '0 4px 20px hsl(0 0% 0% / 0.1)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <motion.div
                className={`diagram-node p-4 min-w-[100px] text-center relative overflow-hidden ${activeStep === step.id ? 'diagram-node-active' : ''}`}
                animate={{
                  scale: activeStep === step.id ? 1.08 : 1,
                  borderColor: activeStep === step.id ? 'hsl(175 80% 55%)' : 'hsl(175 70% 45%)',
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                {/* Animated glow effect for active step */}
                {activeStep === step.id && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                
                {/* Pulse ring effect */}
                {activeStep === step.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-xl"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                <motion.div
                  animate={{
                    y: activeStep === step.id ? [0, -5, 0] : 0,
                    rotate: activeStep === step.id ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{ 
                    repeat: activeStep === step.id ? Infinity : 0, 
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <step.icon className={`w-6 h-6 mx-auto mb-2 transition-all duration-300 ${
                    activeStep === step.id 
                      ? 'text-primary drop-shadow-[0_0_10px_hsl(175_70%_45%/0.8)]' 
                      : 'text-muted-foreground'
                  }`} />
                </motion.div>
                <p className={`text-sm font-medium relative z-10 ${activeStep === step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className="relative">
                  {/* Data flow animation */}
                  {(activeIndex >= index && activeStep) && (
                    <motion.div
                      className="absolute w-2 h-2 bg-primary rounded-full"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 10, opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      style={{ top: '50%', transform: 'translateY(-50%)' }}
                    />
                  )}
                  <motion.div
                    animate={{
                      opacity: activeIndex >= index && activeStep ? 1 : 0.3,
                      x: activeStep === step.id ? [0, 5, 0] : 0,
                      scale: activeIndex === index ? 1.2 : 1,
                    }}
                    transition={{ 
                      repeat: activeStep === step.id ? Infinity : 0, 
                      duration: 0.6 
                    }}
                  >
                    <ArrowRight className={`w-5 h-5 transition-colors duration-300 ${
                      activeIndex >= index && activeStep ? 'text-primary' : 'text-[hsl(var(--diagram-line))]'
                    }`} />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step descriptions with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`p-3 rounded-lg text-sm transition-all duration-300 relative overflow-hidden ${
                activeStep === step.id 
                  ? 'bg-primary/10 border border-primary/30' 
                  : 'bg-muted/50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: activeStep === step.id ? 1.02 : 1,
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {activeStep === step.id && (
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                />
              )}
              <p className={`font-medium mb-1 ${activeStep === step.id ? 'text-primary' : 'text-foreground'}`}>
                {step.description}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Educational note */}
      <motion.div 
        className="info-box flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
        </motion.div>
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

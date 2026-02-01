import { motion } from 'framer-motion';
import { Upload, BookOpen, Sparkles, LogOut } from 'lucide-react';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { FileDashboard } from '@/components/FileDashboard';
import { ValidationPanel } from '@/components/ValidationPanel';
import { FloatingParticles } from '@/components/FloatingParticles';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { files, activeStep, addFiles, removeFile, clearFiles } = useFileUpload();
  const { logout } = useAuth();

  const isUploading = files.some(f => ['pending', 'validating', 'uploading'].includes(f.status));

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated background elements */}
      <AnimatedBackground />
      <FloatingParticles />

      {/* Header */}
      <motion.header 
        className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="p-2 rounded-xl bg-primary/10 relative"
                animate={{ 
                  boxShadow: [
                    '0 0 0px hsl(175 70% 45% / 0)',
                    '0 0 20px hsl(175 70% 45% / 0.3)',
                    '0 0 0px hsl(175 70% 45% / 0)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Upload className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gradient">File Manager</h1>
                <p className="text-xs text-muted-foreground">Upload File Simulator</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  boxShadow: [
                    '0 0 0px hsl(175 50% 20% / 0)',
                    '0 0 15px hsl(175 50% 20% / 0.3)',
                    '0 0 0px hsl(175 50% 20% / 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <BookOpen className="w-3 h-3" />
                App Didattica
              </motion.span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Esci
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero section */}
      <motion.section 
        className="container mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="max-w-3xl mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Impara come funziona il{' '}
            <motion.span 
              className="text-gradient inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              caricamento dei file
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Un'esperienza interattiva per capire cosa succede quando carichi un file su un sito web.
            <br />
            <motion.span
              className="text-primary"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tutto simulato, tutto spiegato.
            </motion.span>
          </motion.p>
        </div>
      </motion.section>

      {/* Main content */}
      <main className="container mx-auto px-4 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Upload and Validation */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <FileUploadZone 
              onFilesSelected={addFiles} 
              isUploading={isUploading} 
            />
            <ValidationPanel />
          </motion.div>

          {/* Right column - Dashboard */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <ArchitectureDiagram activeStep={activeStep} />
            <FileDashboard 
              files={files} 
              onRemove={removeFile} 
              onClear={clearFiles} 
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.p 
            className="text-sm text-muted-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎓 Questa è un'app didattica. Nessun file viene realmente caricato o salvato.
          </motion.p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;

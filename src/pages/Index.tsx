import { motion } from 'framer-motion';
import { Upload, BookOpen, Github } from 'lucide-react';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { FileDashboard } from '@/components/FileDashboard';
import { ValidationPanel } from '@/components/ValidationPanel';
import { useFileUpload } from '@/hooks/useFileUpload';

const Index = () => {
  const { files, activeStep, addFiles, removeFile, clearFiles } = useFileUpload();

  const isUploading = files.some(f => ['pending', 'validating', 'uploading'].includes(f.status));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">File Manager</h1>
                <p className="text-xs text-muted-foreground">Upload File Simulator</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                App Didattica
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero section */}
      <motion.section 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="max-w-3xl mx-auto text-center mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Impara come funziona il{' '}
            <span className="text-gradient">caricamento dei file</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Un'esperienza interattiva per capire cosa succede quando carichi un file su un sito web.
            Tutto simulato, tutto spiegato.
          </motion.p>
        </div>
      </motion.section>

      {/* Main content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Upload and Validation */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
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
        className="border-t border-border bg-card/30 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            🎓 Questa è un'app didattica. Nessun file viene realmente caricato o salvato.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import superProgrammatoreLogo from '@/assets/super-programmatore-logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FloatingParticles } from '@/components/FloatingParticles';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import { verifyAccessCode } from '@/lib/hash';

const Login = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    // Simulate verification delay for UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isValid = await verifyAccessCode(code);

    if (isValid) {
      setSuccess(true);
      setTimeout(() => {
        login();
      }, 1500);
    } else {
      setError('Codice di accesso non valido');
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      <AnimatedBackground />
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              className="mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <img 
                src={superProgrammatoreLogo} 
                alt="Super Programmatore Logo" 
                className="w-40 h-auto mx-auto"
              />
            </motion.div>

            <div>
              <CardTitle className="text-2xl font-bold text-gradient">
                Accesso Richiesto
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Inserisci il codice di accesso per entrare nell'app didattica
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Inserisci il codice..."
                    className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:border-primary"
                    disabled={isVerifying || success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-destructive text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium relative overflow-hidden"
                disabled={!code || isVerifying || success}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      Accesso Verificato!
                    </motion.div>
                  ) : isVerifying ? (
                    <motion.div
                      key="verifying"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Lock className="w-5 h-5" />
                      </motion.div>
                      Verifica in corso...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Accedi
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shine effect */}
                {isVerifying && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import { Wallet, CheckCircle, Loader2, X, Shield } from 'lucide-react';

const steps = ['Connect', 'Sign', 'Ready'];

export default function WalletConnectModal() {
  const { showConnectModal, setShowConnectModal, connect } = useWalletStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    // Simulate wallet connection
    await new Promise((r) => setTimeout(r, 1500));
    setStep(1);
    setLoading(false);
  };

  const handleSign = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setStep(2);
    setLoading(false);
    // Auto-proceed
    setTimeout(() => {
      connect('ALGO' + Math.random().toString(36).substring(2, 10).toUpperCase());
      setStep(0);
    }, 1000);
  };

  if (!showConnectModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
        onClick={() => { setShowConnectModal(false); setStep(0); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-8 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => { setShowConnectModal(false); setStep(0); }}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="module-icon w-14 h-14 mx-auto mb-4 text-xl">⛓</div>
            <h2 className="font-heading text-xl font-bold">Connect to Scholaris DAO</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in with your Algorand wallet</p>
          </div>

          {/* Steps */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="connect" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={handleConnect} disabled={loading}
                  className="w-full glass-card-hover p-4 flex items-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">🔗</div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm">Pera Wallet</p>
                    <p className="text-xs text-muted-foreground">Connect via QR or mobile</p>
                  </div>
                  {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                </button>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="sign" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-4">
                <Shield className="w-12 h-12 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Please sign the authentication message in your wallet</p>
                <button onClick={handleSign} disabled={loading} className="btn-primary-glow w-full flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                  Sign Message
                </button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="ready" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="font-heading font-bold text-lg">Connected!</p>
                <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

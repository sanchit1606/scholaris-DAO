import { motion } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import { useNavigate } from 'react-router-dom';
import { Wallet, Briefcase, Vote, BookOpen, QrCode, MessageSquare, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { useEffect } from 'react';
import { WebGLShader } from '@/components/ui/web-gl-shader';

const modules = [
  { icon: Briefcase, title: 'PlacePrep DAO', desc: 'Decentralized placement intelligence with AI-powered insights, JD curation, and mock interviews.' },
  { icon: Vote, title: 'Campus Voting', desc: 'Secure on-chain elections with commit-reveal schemes and sybil prevention.' },
  { icon: BookOpen, title: 'Library Lending', desc: 'Borrow books with ASA collateral — transparent and accountable.' },
  { icon: QrCode, title: 'Attendance Mining', desc: 'Gamified QR-based attendance with token rewards and NFT unlocks.' },
  { icon: MessageSquare, title: 'Anonymous Feedback', desc: 'Commit-reveal anonymous course feedback with AI sentiment analysis.' },
];

const stats = [
  { value: '12K+', label: 'Students', icon: Users },
  { value: '50K+', label: 'JDs Curated', icon: Briefcase },
  { value: '99.9%', label: 'Uptime', icon: Zap },
  { value: 'On-Chain', label: 'Security', icon: Shield },
];

export default function Landing() {
  const { setShowConnectModal, isConnected } = useWalletStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) navigate('/dashboard');
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[110vh] flex items-center overflow-hidden">
        <WebGLShader />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="stat-badge mb-6">
              <span>⛓</span> Built on Algorand
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Campus,{' '}
              <span className="gradient-text">On-Chain.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl">
              PlacePrep DAO meets campus governance — a unified blockchain platform for placement prep,
              voting, library lending, attendance, and anonymous feedback.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowConnectModal(true)}
                className="btn-primary-glow flex items-center gap-2 text-base">
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
              <a href="#modules" className="btn-secondary-glass flex items-center gap-2 text-base">
                Explore Modules <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigate('/documentation')}
                className="btn-secondary-glass flex items-center gap-2 text-base"
              >
                <BookOpen className="w-5 h-5" />
                View Documentation
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="page-container py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-3xl mb-3">Platform Modules</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything your campus needs, powered by Algorand's fast, secure, and low-cost blockchain.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <mod.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{mod.title}</h3>
              <p className="text-sm text-muted-foreground">{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-container py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-glow)' }} />
          <div className="relative">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to join?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Connect your Algorand wallet and start earning PrepTokens, voting in elections, and more.</p>
            <button onClick={() => setShowConnectModal(true)} className="btn-primary-glow text-base flex items-center gap-2 mx-auto">
              <Wallet className="w-5 h-5" /> Get Started
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="page-container flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span className="font-heading font-semibold gradient-text">CampusChain</span>
          <span>Built on Algorand · © 2025</span>
        </div>
      </footer>
    </div>
  );
}

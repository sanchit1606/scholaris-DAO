import { motion } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import { useNavigate } from 'react-router-dom';
import { Wallet, Briefcase, Vote, BookOpen, QrCode, MessageSquare, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { useEffect } from 'react';
import { WebGLShader } from '@/components/ui/web-gl-shader';

import { TextHoverEffect, FooterBackgroundGradient } from '@/components/ui/hover-footer';
import { Github as GithubIcon, Linkedin as LinkedinIcon, Globe as GlobeIcon } from 'lucide-react';

const modules = [
  { icon: Briefcase, title: 'PlacePrep DAO', desc: 'Decentralized placement intelligence with AI-powered insights, JD curation, and mock interviews.' },
  { icon: Vote, title: 'Campus Voting', desc: 'Secure on-chain elections with commit-reveal schemes and sybil prevention.' },

  { icon: QrCode, title: 'Engagement Rewards', desc: 'Earn vElixir via attendance, quizzes, and events — spend them on registrations, courses, and more.' },
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

  // Note: removed automatic redirect on connect so users must explicitly navigate.

  return (
    <div className="min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-14">
            <button
              onClick={() => setShowConnectModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
            >
              <Wallet className="w-4 h-4" />
              Get Started
            </button>
          </div>
        </div>
      </header>

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
              This project is built by Sanchit and Shrey, from Team Init2winIt, as a part of 'MLSC Hackspiration' 26' VIT Pune
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
      <section id="modules" className="page-container py-20 relative z-10">
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white">Features Offered</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything our campus needs, powered by Algorand's fast, secure, and low-cost blockchain.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Connect your Algorand wallet and start earning vElixir, voting in elections, and more. vElixir is our platform currency and can be converted to ALGO for external uses.</p>
            <button onClick={() => setShowConnectModal(true)} className="btn-primary-glow text-base flex items-center gap-2 mx-auto">
              <Wallet className="w-5 h-5" /> Get Started
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
        <div className="max-w-7xl mx-auto p-14 z-40 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
            {/* Brand section */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-[#3ca2fa] text-3xl font-extrabold">⛓</span>
                <span className="text-white text-3xl font-bold">Scholaris DAO</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Decentralized placement intelligence platform built on Algorand.
                Illuminate campus activities with blockchain.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/documentation" className="hover:text-[#3ca2fa] transition-colors">Documentation</a></li>
                <li><a href="#modules" className="hover:text-[#3ca2fa] transition-colors">Features</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://developer.algorand.org" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">Algorand Docs</a></li>
                <li><a href="https://pyteal.readthedocs.io" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">PyTEAL Docs</a></li>
                <li><a href="https://docs.ipfs.tech" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">IPFS Docs</a></li>
              </ul>
            </div>

            {/* Team */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Team Init2WinIt</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center space-x-3">
                  <GithubIcon size={18} className="text-[#3ca2fa]" />
                  <a href="https://github.com/sanchit1606" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">Sanchitsai Nipanikar</a>
                </li>
                <li className="flex items-center space-x-3">
                  <GithubIcon size={18} className="text-[#3ca2fa]" />
                  <a href="https://github.com/Shreychougule" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">Shrey Chougule</a>
                </li>
                <li className="flex items-center space-x-3">
                  <LinkedinIcon size={18} className="text-[#3ca2fa]" />
                  <a href="https://www.linkedin.com/in/sanchit1606" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-t border-gray-700 my-8" />

          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            {/* Social icons */}
            <div className="flex space-x-6 text-gray-400">
              <a href="https://github.com/sanchit1606/scholaris-DAO" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[#3ca2fa] transition-colors"><GithubIcon size={20} /></a>
              <a href="https://www.linkedin.com/in/sanchit1606" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#3ca2fa] transition-colors"><LinkedinIcon size={20} /></a>
              <a href="https://portfolio-three-silk-62.vercel.app/" target="_blank" rel="noreferrer" aria-label="Portfolio" className="hover:text-[#3ca2fa] transition-colors"><GlobeIcon size={20} /></a>
            </div>

            {/* Copyright */}
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Scholaris DAO · Built on Algorand · MLSC Hackspirathon 2026
            </p>
          </div>
        </div>

        {/* Text hover effect */}
        <div className="lg:flex hidden h-[14rem] -mt-32 -mb-16">
          <TextHoverEffect text="SCHOLARIS" className="z-50" />
        </div>

        <FooterBackgroundGradient />
      </footer>
    </div>
  );
}

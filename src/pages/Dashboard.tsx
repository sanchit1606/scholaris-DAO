import { motion } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import StatCard from '@/components/StatCard';
import ModuleCard from '@/components/ModuleCard';
import { useJDs } from '@/api/hooks';
import {
  Coins, Trophy, Upload, Star, Briefcase, Vote,
  QrCode, MessageSquare, Shield, Map, Code, Users, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { WavyBackground } from '@/components/ui/wavy-background';
import { GlowCard } from '@/components/ui/spotlight-card';
import { TextHoverEffect, FooterBackgroundGradient } from '@/components/ui/hover-footer';
import { Github as GithubIcon, Linkedin as LinkedinIcon, Globe as GlobeIcon } from 'lucide-react';

const quickActions = [
  { label: 'Upload JD', path: '/placeprep/upload', icon: Upload },
  { label: 'Browse Companies', path: '/placeprep/companies', icon: Briefcase },
  { label: 'Voting', path: '/voting', icon: Vote },
  { label: 'Mint Attendance', path: '/attendance/mint', icon: QrCode },
  { label: 'Submit Feedback', path: '/feedback/submit', icon: MessageSquare },
];

export default function Dashboard() {
  const { prepTokens, attendanceTokens, reputation } = useWalletStore();
  const { data: jds } = useJDs();

  return (
    <>
    <WavyBackground containerClassName="h-auto" className="w-full" moveWithScroll parallax={0.6}>
      <div className="page-container space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to Scholaris DAO</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Coins} label="Tokens" value={prepTokens} change="+12%" positive />
        <StatCard icon={QrCode} label="Attendance Tokens" value={attendanceTokens} change="+3" positive />
        <StatCard icon={Star} label="Reputation" value={`${reputation}/100`} />
        <StatCard icon={Trophy} label="Leaderboard Rank" value="#14" change="↑2" positive />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading font-semibold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link key={a.path} to={a.path}
              className="glass-card-hover p-4 flex flex-col items-center gap-2 text-center group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent JDs section removed */}

      {/* Platform Modules */}
      <div>
        <h2 className="font-heading font-semibold text-lg mb-4">Platform Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <ModuleCard
            icon={Briefcase}
            title="PlacePrep DAO"
            description="Placement community — share drive experiences, explore company JDs, required skills, and eligibility criteria."
            path="/placeprep/companies"
            delay={0}
          />
          <ModuleCard icon={Vote} title="Campus Voting" description="Participate in secure on-chain campus elections and decision making" path="/voting" delay={0.05} />

          <ModuleCard icon={QrCode} title="Attendance Mining" description="Earn tokens for attending classes" path="/attendance/mint" delay={0.15} />
          <ModuleCard icon={MessageSquare} title="Anonymous Feedback" description="Submit anonymous course feedback on-chain" path="/feedback/submit" delay={0.2} />
        </div>
      </div>
      {/* How it works */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-br from-primary/6 via-transparent to-transparent dark:from-primary-900/6">
        <h2 className="font-heading font-semibold text-lg mb-4">How it works</h2>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Step 1: Earn tokens */}
          <GlowCard size="lg" glowColor="blue" className="p-8 w-full min-h-[450px]">
            <div className="h-full flex flex-col justify-center relative z-10 text-white">
              <h3 className="font-semibold mb-3 text-lg">Step 1 — Earn Tokens</h3>
              <p className="text-sm mb-3">Complete on-campus activities to earn Tokens (example values, descending).</p>
              <ul className="space-y-2 text-sm">
                <li>Attendance (QR per lecture): <strong>5 Tokens</strong></li>
                <li>Winning campus competitions: <strong>40–60 Tokens</strong></li>
                <li>Participating in tech events / hackathons: <strong>15–30 Tokens</strong></li>
                <li>Posting verified interview experiences / JDs: <strong>20–30 Tokens</strong></li>
                <li>Verifying / curating content: <strong>3–8 Tokens</strong></li>
                <li>Submitting feedback / surveys: <strong>2–5 Tokens</strong></li>
                <li>Quality bonus (popular posts): <strong>10–30 Tokens</strong></li>
              </ul>
            </div>
          </GlowCard>

          {/* Step 2: Spend tokens */}
          <GlowCard size="lg" glowColor="purple" className="p-8 w-full min-h-[450px]">
            <div className="h-full flex flex-col justify-center relative z-10 text-white">
              <h3 className="font-semibold mb-3 text-lg">Step 2 — Spend Tokens</h3>
              <p className="text-sm mb-3">Tokens are ASAs on Algorand; students opt-in and redeem via atomic transfers.</p>
              <ul className="space-y-2 text-sm">
                <li>Event registrations: hackathons, workshops, club tickets</li>
                <li>Premium content: paid courses, mock interviews, mentorship</li>
                <li>Perks: waive library fines, priority slots</li>
                <li>Marketplace: redeem for NFTs, swag, sponsor offers</li>
              </ul>
            </div>
          </GlowCard>

          {/* Step 3: Roadmap & Trust */}
          <GlowCard size="lg" glowColor="green" className="p-8 w-full min-h-[450px]">
            <div className="h-full flex flex-col justify-center relative z-10 text-white">
              <h3 className="font-semibold mb-3 text-lg">Step 3 — Roadmap & Trust</h3>
              <p className="text-sm mb-3">Community contributions improve placement prep and build trust.</p>
              <ol className="list-decimal pl-5 text-sm space-y-2">
                <li>Contribute: post JDs & experiences → earn Tokens</li>
                <li>Curate: verify / upvote quality content → reputation + bonus</li>
                <li>Use: spend Tokens on events, resources, or DAO proposals</li>
              </ol>
            </div>
          </GlowCard>
        </motion.div>
      </div>
      </div>
    </WavyBackground>
    {/* Footer (same as Landing) */}
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
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

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/documentation" className="hover:text-[#3ca2fa] transition-colors">Documentation</a></li>
              <li><a href="/dashboard" className="hover:text-[#3ca2fa] transition-colors">Features</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="https://developer.algorand.org" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">Algorand Docs</a></li>
              <li><a href="https://pyteal.readthedocs.io" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">PyTEAL Docs</a></li>
              <li><a href="https://docs.ipfs.tech" target="_blank" rel="noreferrer" className="hover:text-[#3ca2fa] transition-colors">IPFS Docs</a></li>
            </ul>
          </div>

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

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-gray-400">
            <a href="https://github.com/sanchit1606/scholaris-DAO" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[#3ca2fa] transition-colors"><GithubIcon size={20} /></a>
            <a href="https://www.linkedin.com/in/sanchit1606" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#3ca2fa] transition-colors"><LinkedinIcon size={20} /></a>
            <a href="https://portfolio-three-silk-62.vercel.app/" target="_blank" rel="noreferrer" aria-label="Portfolio" className="hover:text-[#3ca2fa] transition-colors"><GlobeIcon size={20} /></a>
          </div>

          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Scholaris DAO · Built on Algorand · MLSC Hackspirathon 2026
          </p>
        </div>
      </div>

      <div className="lg:flex hidden h-[14rem] -mt-32 -mb-16">
        <TextHoverEffect text="SCHOLARIS" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
    </>
  );
}

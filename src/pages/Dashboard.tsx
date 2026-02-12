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
      </div>
    </WavyBackground>
  );
}

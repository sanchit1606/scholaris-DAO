import { motion } from 'framer-motion';
import { useLeaderboard } from '@/api/hooks';
import { Trophy, Medal, Coins, Upload, Star } from 'lucide-react';
import { useState } from 'react';

export default function Leaderboard() {
  const { data: leaders } = useLeaderboard();
  const [tab, setTab] = useState<'tokens' | 'uploads' | 'reputation'>('tokens');

  const sorted = leaders?.slice().sort((a, b) => {
    if (tab === 'tokens') return b.tokens - a.tokens;
    if (tab === 'uploads') return b.uploads - a.uploads;
    return b.reputation - a.reputation;
  });

  return (
    <div className="page-container max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-6">Top contributors on Scholaris DAO</p>
      </motion.div>

      <div className="flex gap-2 mb-6">
        {[
          { key: 'tokens' as const, label: 'Tokens', icon: Coins },
          { key: 'uploads' as const, label: 'Uploads', icon: Upload },
          { key: 'reputation' as const, label: 'Reputation', icon: Star },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sorted?.map((user, i) => (
          <motion.div key={user.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className={`glass-card-hover p-5 flex items-center gap-4 ${i < 3 ? 'border-primary/20' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-warning/20 text-warning' : i === 1 ? 'bg-muted text-muted-foreground' : i === 2 ? 'bg-warning/10 text-warning/70' : 'bg-secondary text-muted-foreground'}`}>
              {i < 3 ? <Trophy className="w-5 h-5" /> : i + 1}
            </div>
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{user.address}</p>
            </div>
            <div className="text-right">
              <p className="font-heading font-bold text-primary">
                {tab === 'tokens' ? `${user.tokens} Tokens` : tab === 'uploads' ? `${user.uploads} JDs` : `${user.reputation}/100`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

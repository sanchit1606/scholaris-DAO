import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Coins, Video, Clock, Star, Loader2 } from 'lucide-react';

const mockHistory = [
  { id: 1, partner: 'Priya S.', topic: 'System Design', rating: 4.5, date: '2025-02-05', completed: true },
  { id: 2, partner: 'Arjun K.', topic: 'DS&A', rating: 4.0, date: '2025-01-28', completed: true },
  { id: 3, partner: 'Sneha M.', topic: 'Behavioral', rating: 5.0, date: '2025-01-20', completed: true },
];

export default function MockInterviews() {
  const [tab, setTab] = useState<'find' | 'history'>('find');
  const [searching, setSearching] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(10);

  const startSearch = () => {
    setSearching(true);
    setTimeout(() => setSearching(false), 5000);
  };

  return (
    <div className="page-container max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Mock Interviews</h1>
        <p className="text-muted-foreground mb-6">Peer-to-peer practice with stake-based matching</p>
      </motion.div>

      <div className="flex gap-2 mb-6">
        {(['find', 'history'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground'}`}>
            {t === 'find' ? 'Find Match' : 'History'}
          </button>
        ))}
      </div>

      {tab === 'find' ? (
        <div className="glass-card p-8 text-center">
          {searching ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Searching for a match...</h3>
              <p className="text-sm text-muted-foreground mb-4">Matching with peers at similar skill level</p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, delay: i * 0.3, duration: 1 }}
                    className="w-3 h-3 rounded-full bg-primary" />
                ))}
              </div>
              <button onClick={() => setSearching(false)} className="btn-secondary-glass mt-6 text-sm">Cancel</button>
            </motion.div>
          ) : (
            <>
              <Users className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Find a Practice Partner</h3>
              <p className="text-sm text-muted-foreground mb-6">Stake tokens to join the matching queue. Tokens are refunded on completion.</p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">Stake:</span>
                <div className="flex items-center gap-2">
                  {[5, 10, 20].map((a) => (
                    <button key={a} onClick={() => setStakeAmount(a)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${stakeAmount === a ? 'bg-primary/10 border-primary text-primary' : 'border-border/50 text-muted-foreground'}`}>
                      {a} Tokens
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={startSearch} className="btn-primary-glow flex items-center gap-2 mx-auto">
                <Coins className="w-4 h-4" /> Join Queue ({stakeAmount} Tokens)
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {mockHistory.map((h) => (
            <div key={h.id} className="glass-card-hover p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {h.partner[0]}
                </div>
                <div>
                  <p className="font-medium">{h.partner}</p>
                  <p className="text-xs text-muted-foreground">{h.topic} · {h.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-medium">{h.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

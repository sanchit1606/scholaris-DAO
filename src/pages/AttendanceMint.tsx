import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Sparkles, Award, Loader2, Camera } from 'lucide-react';

const thresholds = [
  { count: 10, reward: 'Bronze Badge NFT', unlocked: true },
  { count: 25, reward: 'Silver Badge NFT', unlocked: true },
  { count: 50, reward: 'Gold Badge NFT', unlocked: false },
  { count: 75, reward: 'Priority Registration', unlocked: false },
  { count: 100, reward: 'Diamond Badge NFT', unlocked: false },
];

export default function AttendanceMint() {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [totalTokens, setTotalTokens] = useState(42);
  const [tab, setTab] = useState<'mint' | 'collection'>('mint');

  const handleMint = async () => {
    setMinting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setMinting(false);
    setMinted(true);
    setTotalTokens((p) => p + 1);
    setTimeout(() => setMinted(false), 3000);
  };

  return (
    <div className="page-container max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Attendance Mining</h1>
        <p className="text-muted-foreground mb-6">Earn tokens for attending classes</p>
      </motion.div>

      <div className="flex gap-2 mb-6">
        {(['mint', 'collection'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground'}`}>
            {t === 'mint' ? 'Mint Token' : 'My Collection'}
          </button>
        ))}
      </div>

      {tab === 'mint' ? (
        <div className="glass-card p-8 text-center">
          {minted ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}
                className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="font-heading text-xl font-bold mb-2">Token Minted! 🎉</h3>
              <p className="text-muted-foreground">+1 AttendanceToken · Total: {totalTokens}</p>
            </motion.div>
          ) : (
            <>
              <div className="w-32 h-32 mx-auto rounded-2xl bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center mb-6">
                <Camera className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <p className="text-sm text-muted-foreground mb-6">Scan the QR code displayed in class or click below to simulate</p>
              <button onClick={handleMint} disabled={minting}
                className="btn-primary-glow flex items-center justify-center gap-2 mx-auto">
                {minting ? <><Loader2 className="w-4 h-4 animate-spin" /> Minting...</> : <><QrCode className="w-4 h-4" /> Mint Attendance Token</>}
              </button>
              <p className="text-xs text-muted-foreground mt-3">Fee: ~0.001 ALGO</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-card p-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Progress</span>
              <span className="text-primary font-bold">{totalTokens} tokens</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalTokens / 100) * 100, 100)}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full"
                style={{ background: 'var(--gradient-primary)' }}
              />
            </div>
          </div>

          {thresholds.map((t) => (
            <div key={t.count} className={`glass-card p-5 flex items-center justify-between ${totalTokens >= t.count ? 'border-primary/20' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${totalTokens >= t.count ? 'bg-primary/20' : 'bg-secondary'}`}>
                  <Award className={`w-5 h-5 ${totalTokens >= t.count ? 'text-primary' : 'text-muted-foreground/30'}`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{t.reward}</p>
                  <p className="text-xs text-muted-foreground">{t.count} tokens required</p>
                </div>
              </div>
              {totalTokens >= t.count ? (
                <span className="stat-badge bg-success/10 text-success border-success/20">Unlocked</span>
              ) : (
                <span className="text-xs text-muted-foreground">{t.count - totalTokens} more</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

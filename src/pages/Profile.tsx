import { motion } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import StatCard from '@/components/StatCard';
import { Coins, Upload, Star, QrCode, Vote, BookOpen, MessageSquare, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

// Example transaction history (updated)
const transactions = [
  { id: 1, type: 'JD Upload', tokens: '+25', date: '2025-02-08', module: 'PlacePrep' },
  { id: 2, type: 'Verification Vote', tokens: '+5', date: '2025-02-07', module: 'PlacePrep' },
  // Attendance aggregated: 18 lectures × 5 tokens = +90
  { id: 3, type: 'Lecture Attendance (18/20)', tokens: '+90', date: '2025-02-06', module: 'Attendance' },
  // Tech events: 3 events × 20 tokens = +60
  { id: 4, type: 'Tech Events (3)', tokens: '+60', date: '2025-02-05', module: 'Events' },
  { id: 5, type: 'Election Vote', tokens: '0', date: '2025-02-03', module: 'Voting' },
];

export default function Profile() {
  const { address, prepTokens, attendanceTokens, reputation, algoBalance } = useWalletStore();
  const [copied, setCopied] = useState(false);

  const copyAddr = () => {
    if (address) navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Derived stats from transactions
  const lecturesAttended = 18;
  const lecturesTotal = 20;
  const attendanceTokenPerLecture = 5;
  const attendanceTokenTotal = lecturesAttended * attendanceTokenPerLecture;
  const eventsAttended = 3;

  const parseTokenNumber = (s: string) => {
    const m = s.match(/-?\d+/);
    return m ? parseInt(m[0], 10) : 0;
  };
  const totalTokens = transactions.reduce((acc, t) => acc + parseTokenNumber(t.tokens), 0);

  return (
    <div className="page-container max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              <img src="/PHOTO_SANCHIT.jpeg" alt="Sanchit" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Sanchit</h1>
              <div>
                <button onClick={copyAddr} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-mono">
                  {address || 'Not connected'}
                  {copied ? <CheckCircle className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                </button>
                <div className="text-xs text-muted-foreground mt-1">{`${(algoBalance || 0).toFixed(4)} ALGO`}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Coins} label="vElixir" value={totalTokens} />
          <StatCard
            icon={QrCode}
            label="Attendance"
            value={
              <div className="flex flex-col items-start">
                <span>18/20</span>
                <span className="text-xs text-muted-foreground mt-1">{attendanceTokenTotal} vElixir</span>
              </div>
            }
          />
          <StatCard icon={Star} label="Events Attended" value={eventsAttended} />
          <StatCard icon={Upload} label="JDs Uploaded" value={8} />
        </div>

        {/* Transaction History */}
        <h2 className="font-heading font-semibold text-lg mb-4">Transaction History</h2>
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Module</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Tokens</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                  <td className="p-4">{tx.type}</td>
                  <td className="p-4"><span className="text-xs bg-secondary px-2 py-0.5 rounded-md">{tx.module}</span></td>
                  <td className={`p-4 font-medium ${tx.tokens.startsWith('+') ? 'text-success' : tx.tokens.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>{tx.tokens}</td>
                  <td className="p-4 text-muted-foreground">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

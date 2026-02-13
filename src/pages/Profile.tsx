import { motion } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import StatCard from '@/components/StatCard';
import { Coins, Upload, Star, QrCode, Vote, BookOpen, MessageSquare, Copy, CheckCircle, Edit2, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const { address, prepTokens, attendanceTokens, reputation, algoBalance, addNotification } = useWalletStore();
  const [copied, setCopied] = useState(false);
  const [convertAmount, setConvertAmount] = useState<number | ''>('');
  const [converting, setConverting] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const availableVElixir = prepTokens + attendanceTokens; // rough available balance
  const CONVERSION_RATE = 0.001; // 1 vElixir = 0.001 ALGO (mock rate)

  const copyAddr = () => {
    if (address) navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!address) {
      setDisplayName(null);
      setNameInput('');
      setEditingName(false);
      return;
    }
    try {
      const key = `displayName:${address}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setDisplayName(saved);
        setNameInput(saved);
      } else {
        setDisplayName(null);
        setNameInput('');
      }
    } catch {
      setDisplayName(null);
      setNameInput('');
    }
  }, [address]);

  const saveDisplayName = () => {
    if (!address) return;
    const key = `displayName:${address}`;
    const val = nameInput.trim();
    try {
      if (val) {
        localStorage.setItem(key, val);
        setDisplayName(val);
      } else {
        localStorage.removeItem(key);
        setDisplayName(null);
      }
      setEditingName(false);
      addNotification?.({ title: 'Saved', message: 'Display name updated', type: 'success' });
    } catch {
      addNotification?.({ title: 'Error', message: 'Could not save display name', type: 'error' });
    }
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
              {address ? (
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${address}`}
                  alt={address}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src="/assets/placeholder.svg" alt="placeholder" className="w-full h-full object-cover" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold">
                  {displayName || (address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Not connected')}
                </h1>
                {address && !editingName && (
                  <button onClick={() => setEditingName(true)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                )}
              </div>
              {editingName && (
                <div className="mt-2 flex items-center gap-2">
                  <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Display name" className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  <button onClick={saveDisplayName} className="btn-primary-glow text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Save</button>
                  <button onClick={() => { setEditingName(false); setNameInput(displayName || ''); }} className="btn-secondary-glass text-sm flex items-center gap-1"><X className="w-4 h-4" /> Cancel</button>
                </div>
              )}
              <div>
                <button onClick={copyAddr} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-mono">
                  {address || 'Not connected'}
                  {copied ? <CheckCircle className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                </button>
                <div className="text-xs text-muted-foreground mt-1">{`${(algoBalance || 0).toFixed(4)} ALGO`}</div>

                {/* vElixir -> ALGO conversion */}
                <div className="mt-3 p-3 bg-secondary/5 rounded-md border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Convert vElixir to ALGO</div>
                    <div className="text-xs text-muted-foreground">Available: {availableVElixir} vElixir</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      min={0}
                      step="1"
                      value={convertAmount === '' ? '' : convertAmount}
                      onChange={(e) => setConvertAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Amount in vElixir"
                      className="w-40 bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="text-sm text-muted-foreground">≈ {(convertAmount === '' ? 0 : (convertAmount as number) * CONVERSION_RATE).toFixed(6)} ALGO</div>
                    <button
                      onClick={async () => {
                        const amt = Number(convertAmount || 0);
                        if (!amt || amt <= 0) return;
                        if (amt > availableVElixir) {
                          addNotification?.({ title: 'Error', message: 'Insufficient vElixir balance', type: 'error' });
                          return;
                        }
                        setConverting(true);
                        // simulate on-chain conversion / atomic transfer
                        await new Promise((r) => setTimeout(r, 1200));
                        const algoReceived = amt * CONVERSION_RATE;
                        // update global store balances (using Zustand setState)
                        try {
                          (useWalletStore as any).setState({
                            prepTokens: Math.max(0, prepTokens - amt),
                            algoBalance: Number(((algoBalance || 0) + algoReceived).toFixed(6)),
                          });
                          addNotification?.({ title: 'Success', message: `Converted ${amt} vElixir → ${algoReceived.toFixed(6)} ALGO`, type: 'success' });
                          setConvertAmount('');
                        } catch (e) {
                          addNotification?.({ title: 'Error', message: 'Conversion failed', type: 'error' });
                        } finally {
                          setConverting(false);
                        }
                      }}
                      disabled={converting || convertAmount === '' || Number(convertAmount) <= 0}
                      className="btn-primary-glow text-sm px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {converting ? 'Converting...' : 'Convert'}
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Rate: 1 vElixir = {CONVERSION_RATE} ALGO (mock rate)</div>
                </div>
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

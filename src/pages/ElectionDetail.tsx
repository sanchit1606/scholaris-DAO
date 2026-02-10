import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockElections } from '@/api/hooks';
import { useState } from 'react';
import { Vote, Lock, Unlock, CheckCircle, ArrowLeft, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ElectionDetail() {
  const { id } = useParams();
  const election = mockElections.find((e) => e.id === id);
  const [phase, setPhase] = useState<'commit' | 'reveal' | null>(null);
  const [committed, setCommitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  if (!election) return <div className="page-container text-center text-muted-foreground">Election not found</div>;

  const tally = election.candidates.map((c, i) => ({
    name: c,
    votes: Math.floor(election.totalVotes / election.candidates.length) + (i === 0 ? election.totalVotes % election.candidates.length : 0),
  }));

  return (
    <div className="page-container max-w-3xl mx-auto">
      <Link to="/voting" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Elections
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-6">
        <h1 className="font-heading text-2xl font-bold mb-2">{election.title}</h1>
        <p className="text-muted-foreground text-sm mb-6">Ends: {election.endDate} · {election.totalVotes} total votes</p>

        {/* Tally */}
        <div className="space-y-3 mb-8">
          {tally.map((c, i) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{c.name}</span>
                <span className="text-muted-foreground">{c.votes} votes</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(c.votes / election.totalVotes) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: i === 0 ? 'var(--gradient-primary)' : 'hsl(var(--muted-foreground))' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        {election.status === 'active' && (
          <div className="flex gap-4">
            <button onClick={() => { setPhase('commit'); setCommitted(true); }}
              disabled={committed}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all ${committed ? 'bg-success/20 text-success border border-success/30' : 'btn-primary-glow'}`}>
              {committed ? <><CheckCircle className="w-4 h-4" /> Vote Committed</> : <><Lock className="w-4 h-4" /> Commit Vote</>}
            </button>
            <button onClick={() => setRevealed(true)} disabled={!committed || revealed}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all ${revealed ? 'bg-success/20 text-success border border-success/30' : 'btn-secondary-glass'} disabled:opacity-40`}>
              {revealed ? <><CheckCircle className="w-4 h-4" /> Revealed</> : <><Unlock className="w-4 h-4" /> Reveal Vote</>}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

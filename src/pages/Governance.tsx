import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ThumbsUp, ThumbsDown, Plus, Coins, Clock } from 'lucide-react';

const mockProposals = [
  { id: 1, title: 'Remove outdated Google SDE-1 JD (2019)', proposer: 'ALGO...X3K9', staked: 50, votesFor: 23, votesAgainst: 5, status: 'active', daysLeft: 3 },
  { id: 2, title: 'Archive Amazon internship JDs below 3★', proposer: 'ALGO...M2P1', staked: 100, votesFor: 45, votesAgainst: 12, status: 'active', daysLeft: 5 },
  { id: 3, title: 'Remove duplicate Microsoft PM listing', proposer: 'ALGO...R7T4', staked: 30, votesFor: 38, votesAgainst: 2, status: 'passed', daysLeft: 0 },
];

export default function Governance() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="page-container max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="section-title text-3xl mb-1">Governance</h1>
            <p className="text-muted-foreground">DAO proposals for content curation</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary-glow text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Propose Removal
          </button>
        </div>
      </motion.div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass-card p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4">New Proposal</h3>
          <input placeholder="Proposal title..." className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-primary" />
            <div className="flex gap-3 items-center mb-4">
            <span className="text-sm text-muted-foreground">Stake:</span>
            <input type="number" defaultValue={25} className="w-24 bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            <span className="text-sm text-muted-foreground">vElixir</span>
          </div>
          <button className="btn-primary-glow text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" /> Submit Proposal
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        {mockProposals.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">by {p.proposer} · Staked: {p.staked} vElixir</p>
              </div>
              <span className={`stat-badge ${p.status === 'passed' ? 'bg-success/10 text-success border-success/20' : ''}`}>
                {p.status === 'active' ? <><Clock className="w-3 h-3" /> {p.daysLeft}d left</> : '✓ Passed'}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>For: {p.votesFor}</span>
                <span>Against: {p.votesAgainst}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden flex">
                <div className="bg-success h-full" style={{ width: `${(p.votesFor / (p.votesFor + p.votesAgainst)) * 100}%` }} />
                <div className="bg-destructive h-full flex-1" />
              </div>
            </div>

            {p.status === 'active' && (
              <div className="flex gap-3">
                <button className="flex-1 btn-secondary-glass flex items-center justify-center gap-2 text-sm py-2">
                  <ThumbsUp className="w-4 h-4 text-success" /> Vote For
                </button>
                <button className="flex-1 btn-secondary-glass flex items-center justify-center gap-2 text-sm py-2">
                  <ThumbsDown className="w-4 h-4 text-destructive" /> Vote Against
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

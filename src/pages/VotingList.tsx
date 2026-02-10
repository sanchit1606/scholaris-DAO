import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useElections } from '@/api/hooks';
import { Link } from 'react-router-dom';
import { Vote, Plus, Users, Clock, CheckCircle, X, Loader2 } from 'lucide-react';

export default function VotingList() {
  const { data: elections } = useElections();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="page-container max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="section-title text-3xl mb-1">Campus Elections</h1>
            <p className="text-muted-foreground">Secure on-chain voting with commit-reveal</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="btn-primary-glow text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Election
          </button>
        </div>
      </motion.div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
            onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="glass-card p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-xl font-bold">New Election</h2>
                <button onClick={() => setShowCreate(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="space-y-4">
                <input placeholder="Election title" className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                <textarea placeholder="Candidates (one per line)" rows={3} className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                <input type="date" className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                <button className="btn-primary-glow w-full flex items-center justify-center gap-2">
                  <Vote className="w-4 h-4" /> Create Election
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {elections?.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={`/voting/${e.id}`} className="glass-card-hover p-6 block">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-semibold text-lg">{e.title}</h3>
                <span className={`stat-badge ${e.status === 'completed' ? 'bg-success/10 text-success border-success/20' : ''}`}>
                  {e.status === 'active' ? <><Clock className="w-3 h-3" /> Active</> : <><CheckCircle className="w-3 h-3" /> Completed</>}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {e.candidates.length} candidates</span>
                <span className="flex items-center gap-1"><Vote className="w-4 h-4" /> {e.totalVotes} votes</span>
                <span>Ends: {e.endDate}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {e.candidates.map((c) => (
                  <span key={c} className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground">{c}</span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

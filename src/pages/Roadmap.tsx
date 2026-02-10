import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, ChevronDown, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';

const mockPlan = [
  { week: 1, title: 'Foundations', tasks: ['Arrays & Strings (LeetCode Easy)', 'Time complexity analysis', 'Company research: Google SDE-2 requirements'] },
  { week: 2, title: 'Data Structures Deep Dive', tasks: ['HashMaps & Sets patterns', 'Linked Lists', 'Stack & Queue implementations'] },
  { week: 3, title: 'Trees & Graphs', tasks: ['Binary tree traversals', 'BFS/DFS implementations', 'Graph representation'] },
  { week: 4, title: 'Dynamic Programming', tasks: ['1D DP patterns', '2D DP patterns', 'Common interview DP problems'] },
  { week: 5, title: 'System Design Basics', tasks: ['Load balancers & caching', 'Database design', 'API design patterns'] },
  { week: 6, title: 'Mock Interviews', tasks: ['Peer mock sessions', 'Company-specific practice', 'Behavioral prep'] },
];

export default function Roadmap() {
  const [targets, setTargets] = useState('');
  const [plan, setPlan] = useState<typeof mockPlan | null>(null);
  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState<number[]>([]);

  const generate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPlan(mockPlan);
    setExpanded([1]);
    setGenerating(false);
  };

  const toggle = (w: number) => setExpanded((p) => p.includes(w) ? p.filter((x) => x !== w) : [...p, w]);

  return (
    <div className="page-container max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Study Roadmap</h1>
        <p className="text-muted-foreground mb-8">Generate a personalized week-by-week preparation plan</p>
      </motion.div>

      <div className="glass-card p-6 mb-8">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Target Companies</label>
        <input value={targets} onChange={(e) => setTargets(e.target.value)}
          placeholder="e.g. Google, Amazon, Microsoft"
          className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={generate} disabled={!targets || generating}
          className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-40">
          {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Map className="w-4 h-4" /> Generate Roadmap</>}
        </button>
      </div>

      <AnimatePresence>
        {plan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {plan.map((week) => (
              <motion.div key={week.week} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: week.week * 0.05 }} className="glass-card overflow-hidden">
                <button onClick={() => toggle(week.week)}
                  className="w-full p-5 flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      W{week.week}
                    </div>
                    <span className="font-heading font-semibold">{week.title}</span>
                  </div>
                  {expanded.includes(week.week) ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {expanded.includes(week.week) && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 space-y-2">
                        {week.tasks.map((t, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary/40 shrink-0" />
                            {t}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

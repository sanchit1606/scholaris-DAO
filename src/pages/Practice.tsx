import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Loader2, Gauge, Target, Sparkles } from 'lucide-react';

const problems = [
  'Two Sum', 'Longest Palindromic Substring', 'Merge K Sorted Lists',
  'LRU Cache', 'Word Break', 'Serialize Binary Tree',
];

export default function Practice() {
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`);
  const [problem, setProblem] = useState(problems[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ complexity: number; quality: number; match: number } | null>(null);

  const analyze = async () => {
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setResult({ complexity: 85, quality: 78, match: 92 });
    setAnalyzing(false);
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Practice Predictor</h1>
        <p className="text-muted-foreground mb-6">Submit code and get instant AI feedback</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <select value={problem} onChange={(e) => setProblem(e.target.value)}
              className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
              {problems.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="bg-secondary/50 px-4 py-2 border-b border-border/50 text-xs text-muted-foreground font-mono">
              solution.js
            </div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent p-4 text-sm font-mono leading-relaxed min-h-[400px] resize-none focus:outline-none"
              spellCheck={false} />
          </div>

          <button onClick={analyze} disabled={analyzing || !code.trim()}
            className="btn-primary-glow flex items-center gap-2 disabled:opacity-40">
            {analyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Play className="w-4 h-4" /> Analyze Code</>}
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              {[
                { label: 'Complexity Score', value: result.complexity, icon: Gauge, color: 'text-primary' },
                { label: 'Code Quality', value: result.quality, icon: Sparkles, color: 'text-warning' },
                { label: 'Company Match', value: result.match, icon: Target, color: 'text-success' },
              ].map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <m.icon className={`w-4 h-4 ${m.color}`} />
                    <span className="text-sm font-medium">{m.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-3xl font-bold">{m.value}%</span>
                    <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        transition={{ duration: 1, delay: i * 0.15 }}
                        className="h-full rounded-full"
                        style={{ background: 'var(--gradient-primary)' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            <div className="glass-card p-8 text-center">
              <Gauge className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Submit your code to see analysis results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

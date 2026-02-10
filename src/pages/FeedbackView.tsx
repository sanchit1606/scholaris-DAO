import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { MessageSquare, TrendingUp } from 'lucide-react';

const sentimentData = [
  { name: 'Very Positive', value: 35 },
  { name: 'Positive', value: 25 },
  { name: 'Neutral', value: 20 },
  { name: 'Negative', value: 15 },
  { name: 'Very Negative', value: 5 },
];

const courseRatings = [
  { course: 'CS301', rating: 4.2 },
  { course: 'CS401', rating: 3.8 },
  { course: 'CS201', rating: 4.5 },
  { course: 'MA201', rating: 3.2 },
  { course: 'CS501', rating: 4.0 },
];

const COLORS = ['hsl(152,60%,48%)', 'hsl(174,72%,52%)', 'hsl(200,80%,55%)', 'hsl(38,92%,55%)', 'hsl(0,72%,55%)'];

export default function FeedbackView() {
  return (
    <div className="page-container max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Aggregated Feedback</h1>
        <p className="text-muted-foreground mb-8">AI-powered sentiment analysis after critical mass</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Sentiment Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {sentimentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Course Ratings
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={courseRatings}>
              <XAxis dataKey="course" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} axisLine={false} />
              <YAxis domain={[0, 5]} tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: '8px' }} />
              <Bar dataKey="rating" fill="hsl(174,72%,52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-heading font-semibold mb-4">Recent Anonymous Responses</h3>
        <div className="space-y-3">
          {[
            { course: 'CS301', text: 'Excellent course structure with practical assignments.', sentiment: 'positive' },
            { course: 'CS401', text: 'Would benefit from more hands-on lab sessions.', sentiment: 'neutral' },
            { course: 'MA201', text: 'Pace was too fast for the complexity of topics.', sentiment: 'negative' },
          ].map((r, i) => (
            <div key={i} className="glass-card bg-secondary/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary">{r.course}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${r.sentiment === 'positive' ? 'bg-success/10 text-success' : r.sentiment === 'neutral' ? 'bg-info/10 text-info' : 'bg-destructive/10 text-destructive'}`}>
                  {r.sentiment}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

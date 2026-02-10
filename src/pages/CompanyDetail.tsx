import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockCompanies, mockJDs } from '@/api/hooks';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Shield, ArrowLeft, TrendingUp } from 'lucide-react';

const dsaData = [
  { name: 'Arrays', value: 35 }, { name: 'DP', value: 25 },
  { name: 'Trees', value: 20 }, { name: 'Graphs', value: 15 }, { name: 'Other', value: 5 },
];
const diffData = [
  { name: 'Easy', count: 10 }, { name: 'Medium', count: 25 }, { name: 'Hard', count: 15 },
];
const COLORS = ['hsl(174,72%,52%)', 'hsl(262,60%,58%)', 'hsl(38,92%,55%)', 'hsl(200,80%,55%)', 'hsl(220,14%,30%)'];

export default function CompanyDetail() {
  const { name } = useParams();
  const company = mockCompanies.find((c) => c.name.toLowerCase() === name?.toLowerCase());
  const companyJDs = mockJDs.filter((jd) => jd.company.toLowerCase() === name?.toLowerCase());

  if (!company) return <div className="page-container text-center text-muted-foreground">Company not found</div>;

  return (
    <div className="page-container">
      <Link to="/placeprep/companies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Companies
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{company.logo}</span>
        <div>
          <h1 className="section-title text-3xl">{company.name}</h1>
          <p className="text-muted-foreground">Avg CTC: {company.avgCtc} · {company.jdCount} JDs · Difficulty: {company.difficulty}</p>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> DS&A Pattern Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dsaData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {dsaData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4">Difficulty Levels</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={diffData}>
              <XAxis dataKey="name" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="hsl(174,72%,52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* JDs */}
      <h3 className="font-heading font-semibold text-lg mb-4">Job Descriptions</h3>
      <div className="space-y-3">
        {companyJDs.map((jd) => (
          <Link key={jd.id} to={`/placeprep/jd/${jd.id}`} className="glass-card-hover p-5 flex items-center justify-between block">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{jd.role}</span>
                {jd.verified && <Shield className="w-4 h-4 text-success" />}
                <span className="text-xs text-muted-foreground">· {jd.year}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {jd.skills.map((s) => (
                  <span key={s} className="text-xs bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="text-primary font-medium">{jd.ctc}</p>
              <p className="text-xs text-muted-foreground">{jd.views} views</p>
            </div>
          </Link>
        ))}
        {companyJDs.length === 0 && <p className="text-muted-foreground text-sm">No JDs found for this company.</p>}
      </div>
    </div>
  );
}

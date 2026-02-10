import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCompanies } from '@/api/hooks';
import { Search, Filter, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const roles = ['SDE', 'Backend', 'Frontend', 'ML Engineer', 'PM', 'Data Engineer', 'Quant'];
const skills = ['Java', 'Python', 'Go', 'JavaScript', 'C++', 'SQL', 'System Design'];

export default function Companies() {
  const { data: companies, isLoading } = useCompanies();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const filtered = companies?.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRoles.length === 0 || c.roles.some((r) => selectedRoles.some((sr) => r.toLowerCase().includes(sr.toLowerCase())));
    return matchesSearch && matchesRole;
  });

  const toggleRole = (r: string) => setSelectedRoles((p) => p.includes(r) ? p.filter((x) => x !== r) : [...p, r]);

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Companies</h1>
        <p className="text-muted-foreground mb-6">Browse and discover placement opportunities</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies..."
            className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary-glass flex items-center gap-2 text-sm">
          <Filter className="w-4 h-4" /> Filters
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showFilters && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass-card p-5 mb-6">
          <p className="text-sm font-medium mb-3">Roles</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {roles.map((r) => (
              <button key={r} onClick={() => toggleRole(r)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedRoles.includes(r) ? 'bg-primary/20 border-primary text-primary' : 'border-border/50 text-muted-foreground hover:border-primary/30'}`}
              >{r}</button>
            ))}
          </div>
          <p className="text-sm font-medium mb-3">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:border-primary/30 cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card p-6 animate-shimmer h-44 rounded-xl" />
            ))
          : filtered?.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Link to={`/placeprep/company/${c.name.toLowerCase()}`} className="glass-card-hover p-6 block group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{c.logo}</span>
                    <div>
                      <h3 className="font-heading font-semibold">{c.name}</h3>
                      <p className="text-xs text-muted-foreground">{c.jdCount} JDs available</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.roles.map((r) => (
                      <span key={r} className="text-xs bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground">{r}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Avg CTC: <span className="text-primary font-medium">{c.avgCtc}</span></span>
                    <span className={`${c.difficulty === 'Hard' ? 'text-destructive' : 'text-warning'}`}>{c.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  );
}

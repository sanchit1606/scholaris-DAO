import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockJDs } from '@/api/hooks';
import { useState } from 'react';
import { Shield, Star, Eye, ThumbsUp, ArrowLeft, CheckCircle, Coins } from 'lucide-react';

export default function JDDetail() {
  const { id } = useParams();
  const jd = mockJDs.find((j) => j.id === id);
  const [userRating, setUserRating] = useState(0);
  const [verified, setVerified] = useState(false);

  if (!jd) return <div className="page-container text-center text-muted-foreground">JD not found</div>;

  return (
    <div className="page-container max-w-3xl mx-auto">
      <Link to="/placeprep/companies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glass-card p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-heading text-2xl font-bold">{jd.company} — {jd.role}</h1>
              <p className="text-muted-foreground text-sm mt-1">Year: {jd.year} · CGPA Cutoff: {jd.cgpaCutoff}</p>
            </div>
            {jd.verified && <div className="stat-badge"><Shield className="w-3 h-3" /> Verified</div>}
          </div>

          <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {jd.views} views</span>
            <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {jd.votes} votes</span>
            <span className="text-primary font-semibold">{jd.ctc}</span>
          </div>

          <div className="mb-6">
            <h3 className="font-heading font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {jd.skills.map((s) => (
                <span key={s} className="text-sm bg-secondary px-3 py-1 rounded-lg text-secondary-foreground">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-heading font-semibold mb-2">DS&A Patterns</h3>
            <div className="flex flex-wrap gap-2">
              {jd.dsaPatterns.map((p) => (
                <span key={p} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-lg border border-primary/20">{p}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 bg-secondary/30 mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This job description was uploaded to Scholaris DAO and stored on IPFS. It has been verified by {jd.votes} community members.
              The content includes detailed requirements for the {jd.role} position at {jd.company}.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Verify */}
              <button onClick={() => setVerified(true)} disabled={verified}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all ${verified ? 'bg-success/20 text-success border border-success/30' : 'btn-primary-glow'}`}>
              {verified ? <><CheckCircle className="w-4 h-4" /> Verified (+5 Tokens)</> : <><Shield className="w-4 h-4" /> Verify (Stake 2 Tokens)</>}
            </button>

            {/* Quality Rating */}
            <div className="flex-1 glass-card p-3 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-1">Quality:</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setUserRating(s)}>
                  <Star className={`w-5 h-5 transition-colors ${s <= userRating ? 'text-warning fill-warning' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>
          </div>

          {jd.views >= 50 && (
            <button className="w-full mt-4 btn-secondary-glass flex items-center justify-center gap-2 text-sm">
              <Coins className="w-4 h-4 text-primary" /> Claim Bonus (50+ views)
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

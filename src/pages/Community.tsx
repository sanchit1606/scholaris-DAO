import React, { useState } from "react";
import { useCommunity, addCommunityPost, upvoteCommunityPost, mockCompanies } from "@/api/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Community() {
  const { data: posts } = useCommunity();
  const qc = useQueryClient();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [round, setRound] = useState("Online Assessment");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const rounds = ["Online Assessment", "Technical Round", "HR Round"];

  const submit = async () => {
    if (!company || !role || !content) return;
    await addCommunityPost({ company, role, round, content });
    qc.invalidateQueries(["community"]);
    setContent("");
    setShowForm(false);
  };

  const upvote = async (id: string) => {
    await upvoteCommunityPost(id);
    qc.invalidateQueries(["community"]);
  };
  // new downvote helper will be used when toggling
  const downvote = async (id: string) => {
    // import dynamically to avoid circular issues (function exists in hooks)
    const { downvoteCommunityPost } = await import('@/api/hooks');
    await downvoteCommunityPost(id);
    qc.invalidateQueries(["community"]);
  };

  // track client-side upvote toggles per user in localStorage
  const [upvotedIds, setUpvotedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('upvoted_posts') || '[]';
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  const toggleUpvote = async (id: string) => {
    const isUpvoted = upvotedIds.includes(id);
    if (isUpvoted) {
      await downvote(id);
      const next = upvotedIds.filter((x) => x !== id);
      setUpvotedIds(next);
      localStorage.setItem('upvoted_posts', JSON.stringify(next));
    } else {
      await upvote(id);
      const next = [...upvotedIds, id];
      setUpvotedIds(next);
      localStorage.setItem('upvoted_posts', JSON.stringify(next));
    }
  };

  return (
    <div className="page-container max-w-6xl mx-auto">
      <h1 className="section-title text-3xl mb-4">Placement community - Drive experiences and Insights</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <aside className="col-span-3">
          <div className="glass-card p-4 sticky top-24">
            <h3 className="font-medium mb-3">Community</h3>
            <nav className="flex flex-col gap-2">
              <button onClick={() => { setShowForm(false); setShowHowItWorks(false); }} className={`text-left px-3 py-2 rounded-md ${!showForm && !showHowItWorks ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'}`}>View Community</button>
              <button onClick={() => { setShowForm(true); setShowHowItWorks(false); }} className={`text-left px-3 py-2 rounded-md ${showForm ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'}`}>Add your experience</button>
              <button onClick={() => { setShowHowItWorks(true); setShowForm(false); }} className={`text-left px-3 py-2 rounded-md ${showHowItWorks ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'}`}>How it works</button>
              <button onClick={() => { /* filter placeholder */ }} className="text-left px-3 py-2 rounded-md hover:bg-secondary/50">Recent</button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-9">
          {/* Show form only when user opted in */}
          {showForm && (
            <div className="glass-card p-6 mb-6">
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Company</label>
                  <Select value={company} onValueChange={(v) => setCompany(v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Choose company" /></SelectTrigger>
                    <SelectContent>
                      {mockCompanies.map((c) => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Role</label>
                  <input value={role} onChange={(e)=>setRole(e.target.value)} placeholder="e.g. SDE-1" className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Round</label>
                  <Select value={round} onValueChange={(v)=>setRound(v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {rounds.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Your Experience / Questions</label>
                <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={4} className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-2">
                <button onClick={submit} className="btn-primary-glow">Post</button>
                <button onClick={()=>{ setCompany(''); setRole(''); setRound('Online Assessment'); setContent(''); }} className="btn-secondary-glass">Reset</button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {showHowItWorks ? (
              <div className="glass-card p-6">
                <h3 className="font-semibold text-lg mb-2">How it works</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Share your interview experiences and help juniors prepare — you'll earn Tokens for contributions.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Earn Tokens:</strong> Post interview experiences, upload verified JDs, or verify others' posts to earn Tokens.</li>
                  <li><strong>Quality bonus:</strong> Popular posts (high upvotes / views) receive bonus Tokens to reward helpful content.</li>
                  <li><strong>Privacy & trust:</strong> Community verification and staking help preserve quality and prevent spam.</li>
                  <li><strong>Use Tokens:</strong> Tokens can be spent on event registrations, premium resources, or redeemed per the platform's reward marketplace (see Documentation).</li>
                </ul>
                <div className="mt-4">
                  <button onClick={() => { setShowHowItWorks(false); }} className="btn-secondary-glass">Back to community</button>
                </div>
              </div>
            ) : (
              <>
                {posts?.map((p) => {
                  const created = new Date(p.createdAt);
                  const diff = Date.now() - created.getTime();
                  const minutes = Math.floor(diff / (1000 * 60));
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                  const ago =
                    days > 0 ? `${days}d ago` : hours > 0 ? `${hours}h ago` : `${minutes}m ago`;

                  return (
                    <div key={p.id} className="glass-card p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{p.author || 'Anonymous'}</div>
                            <div className="text-xs text-muted-foreground">· {p.year || '—'}</div>
                            <div className="text-xs text-muted-foreground">· {ago}</div>
                          </div>

                          <div className="text-sm text-muted-foreground mt-2">{p.company} · {p.role}</div>
                          <div className="mt-3 whitespace-pre-line">{p.content}</div>
                          <div className="text-xs text-muted-foreground mt-3">{created.toLocaleString()}</div>
                        </div>

                        <div className="flex flex-col items-center ml-4">
                          <button
                            onClick={() => toggleUpvote(p.id)}
                            className={`font-bold flex items-center gap-1 px-2 py-1 rounded-md ${upvotedIds.includes(p.id) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-primary'}`}
                            aria-pressed={upvotedIds.includes(p.id)}
                          >
                            <span>{p.upvotes}</span>
                            <span className="text-sm">▲</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


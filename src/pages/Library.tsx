import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooks } from '@/api/hooks';
import { BookOpen, Search, Lock, Unlock, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function Library() {
  const { data: books } = useBooks();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'browse' | 'my'>('browse');
  const [borrowed, setBorrowed] = useState<string[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = books?.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
  const borrowedBooks = books?.filter((b) => borrowed.includes(b.id));

  return (
    <div className="page-container max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Library</h1>
        <p className="text-muted-foreground mb-6">Borrow books with ASA collateral</p>
      </motion.div>

      <div className="flex gap-2 mb-6">
        {(['browse', 'my'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground'}`}>
            {t === 'browse' ? 'Browse Books' : `My Borrowings (${borrowed.length})`}
          </button>
        ))}
      </div>

      {tab === 'browse' ? (
        <>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books..."
              className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered?.map((book, i) => (
              <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass-card-hover p-5">
                <div className="text-4xl mb-3">{book.coverEmoji}</div>
                <h3 className="font-heading font-semibold text-sm mb-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${book.available && !borrowed.includes(book.id) ? 'text-success' : 'text-destructive'}`}>
                    {borrowed.includes(book.id) ? 'Borrowed' : book.available ? 'Available' : 'Unavailable'}
                  </span>
                  {book.available && !borrowed.includes(book.id) && (
                    <button onClick={() => setConfirmId(book.id)} className="text-xs text-primary font-medium hover:underline">
                      Borrow →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {borrowedBooks && borrowedBooks.length > 0 ? borrowedBooks.map((b) => (
            <div key={b.id} className="glass-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{b.coverEmoji}</span>
                <div>
                  <p className="font-medium text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground">Due: 14 days</p>
                </div>
              </div>
              <button onClick={() => setBorrowed((p) => p.filter((x) => x !== b.id))}
                className="btn-secondary-glass text-xs flex items-center gap-1 py-1.5 px-3">
                <Unlock className="w-3 h-3" /> Return
              </button>
            </div>
          )) : (
            <div className="glass-card p-8 text-center">
              <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No borrowed books yet</p>
            </div>
          )}
        </div>
      )}

      {/* Confirm Modal */}
      <AnimatePresence>
        {confirmId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
            onClick={() => setConfirmId(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card p-8 w-full max-w-sm text-center"
              onClick={(e) => e.stopPropagation()}>
              <Lock className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Freeze Collateral?</h3>
              <p className="text-sm text-muted-foreground mb-6">1 collateral token will be frozen until you return the book.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmId(null)} className="flex-1 btn-secondary-glass text-sm">Cancel</button>
                <button onClick={() => { setBorrowed((p) => [...p, confirmId]); setConfirmId(null); }}
                  className="flex-1 btn-primary-glow text-sm">Confirm Borrow</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

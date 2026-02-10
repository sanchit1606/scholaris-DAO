import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle, Loader2, Sparkles } from 'lucide-react';

export default function PlacePrepUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [meta, setMeta] = useState({ company: '', role: '', year: '2025' });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleSubmit = async () => {
    if (!file || !meta.company || !meta.role) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setUploading(false);
    setSuccess(true);
  };

  return (
    <div className="page-container max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Upload JD</h1>
        <p className="text-muted-foreground mb-8">Contribute a job description to earn PrepTokens</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6"
            >
              <Sparkles className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="font-heading text-2xl font-bold mb-2">JD Uploaded! 🎉</h2>
            <p className="text-muted-foreground mb-2">You earned <span className="text-primary font-bold">+25 PrepTokens</span></p>
            <p className="text-sm text-muted-foreground">Your submission is now pending community verification.</p>
            <button onClick={() => { setSuccess(false); setFile(null); setMeta({ company: '', role: '', year: '2025' }); }}
              className="btn-secondary-glass mt-6">Upload Another</button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`glass-card border-2 border-dashed p-12 text-center cursor-pointer transition-all ${dragging ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input id="file-input" type="file" className="hidden" accept=".pdf,.txt,.png,.jpg,.jpeg"
                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-1 hover:text-destructive">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium mb-1">Drop your JD file here</p>
                  <p className="text-sm text-muted-foreground">PDF, TXT, or Image · Max 10MB</p>
                </>
              )}
            </div>

            {/* Metadata */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { key: 'company', label: 'Company', placeholder: 'e.g. Google' },
                { key: 'role', label: 'Role', placeholder: 'e.g. SDE-2' },
                { key: 'year', label: 'Year', placeholder: '2025' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
                  <input
                    value={meta[f.key as keyof typeof meta]}
                    onChange={(e) => setMeta({ ...meta, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}
            </div>

            {/* Submit */}
            <button onClick={handleSubmit}
              disabled={!file || !meta.company || !meta.role || uploading}
              className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              {uploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting On-Chain...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Submit JD</>
              )}
            </button>

            {uploading && (
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

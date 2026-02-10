import { BookOpen, Network, Server, Database, Brain, Wallet, Layers } from "lucide-react";
import { motion } from "framer-motion";

const techStack = [
  { name: "Frontend: React + TypeScript", icon: Layers, desc: "Type-safe SPA for students, TPOs and admins." },
  { name: "UI: Tailwind CSS + shadcn/ui", icon: BookOpen, desc: "Composable design system for dashboards and forms." },
  { name: "State: TanStack Query + Zustand", icon: Brain, desc: "Server + client state for wallet, JDs and analytics." },
  { name: "Blockchain: Algorand", icon: Network, desc: "Smart contracts and ASAs for PrepToken and governance." },
  { name: "Storage: IPFS", icon: Database, desc: "Content-addressed storage for JDs and interview experiences." },
  { name: "AI / ML Pipeline", icon: Server, desc: "Skill extraction, pattern recognition and recommendations." },
  { name: "Wallets", icon: Wallet, desc: "Algorand wallets for identity, authentication and rewards." },
];

const sections = [
  {
    title: "Problem Statement",
    body: "Campus systems for voting, attendance, feedback and placements often lack trust, transparency and good UX. Data is siloed across portals and emails, and students have no verifiable way to prove contributions or trust shared information.",
  },
  {
    title: "Primary Solution: PlacePrep DAO",
    body: "PlacePrep DAO is a decentralized placement intelligence platform for campuses. It turns raw JDs, interview experiences and participation data into AI-powered insights, and anchors everything on Algorand for verifiable records and tokenized incentives.",
  },
  {
    title: "Key Capabilities",
    body: "The platform supports on-chain JD registration, ASA-based reward tokens (PrepToken), verifiable voting and feedback flows, and an AI layer that extracts skills and patterns from historical data to generate preparation roadmaps and recommendations.",
  },
];

const architectureNodes = [
  { id: "ui", label: "React Frontend\n(Tailwind + shadcn/ui)", icon: Layers, x: 0, y: -80 },
  { id: "backend", label: "API Gateway\n(FastAPI / Node)", icon: Server, x: 0, y: 40 },
  { id: "algorand", label: "Algorand\nSmart Contracts + ASAs", icon: Network, x: -180, y: 160 },
  { id: "ipfs", label: "IPFS\nJD & Content Storage", icon: Database, x: 0, y: 160 },
  { id: "ai", label: "AI / ML Pipeline\nSkill & Pattern Engine", icon: Brain, x: 180, y: 160 },
];

export default function Documentation() {
  return (
    <div className="min-h-screen pb-16">
      <section className="page-container pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <div className="stat-badge mb-4">
            <span>📘</span> Platform Overview
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Campus Connect Hub <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            This documentation explains the architecture behind PlacePrep DAO & Campus Connect Hub — how Algorand,
            IPFS and AI work together to power trustless, AI-augmented campus systems.
          </p>
        </motion.div>
      </section>

      {/* Problem & Solution */}
      <section className="page-container pt-4 space-y-12">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-6 sm:p-8"
          >
            <h2 className="section-title mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.body}</p>
          </motion.div>
        ))}
      </section>

      {/* Tech Stack */}
      <section className="page-container pt-4 space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="section-title">Technology Stack</h2>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Frontend · Blockchain · AI · Storage</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {techStack.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-hover p-4 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold mb-1">{item.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture Diagram with zoom / pan controls */}
      <section className="page-container pt-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="section-title mb-1">System Architecture</h2>
            <p className="text-muted-foreground text-sm">
              Explore how the UI, backend, Algorand layer, AI pipeline and IPFS connect. Use the controls to zoom, pan, and reset.
            </p>
          </div>
        </div>

        <ArchitectureDiagram />
      </section>
    </div>
  );
}

import { useState, useRef } from "react";

function ArchitectureDiagram() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    setScale((prev) => {
      const next = prev + delta * 0.0015;
      return Math.min(Math.max(next, 0.6), 1.8);
    });
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDraggingRef.current || !lastPosRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = false;
    lastPosRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="glass-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-xs text-muted-foreground">
          Scroll to zoom · Drag to pan · Click reset to center the diagram.
        </p>
        <div className="flex items-center gap-1">
          <button
            className="btn-secondary-glass px-3 py-1 text-xs"
            onClick={() => setScale((s) => Math.min(s + 0.15, 1.8))}
          >
            +
          </button>
          <button
            className="btn-secondary-glass px-3 py-1 text-xs"
            onClick={() => setScale((s) => Math.max(s - 0.15, 0.6))}
          >
            −
          </button>
          <button
            className="btn-secondary-glass px-3 py-1 text-xs"
            onClick={resetView}
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="relative h-[380px] sm:h-[440px] overflow-hidden rounded-xl bg-gradient-to-b from-background/40 via-background to-background"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className="absolute left-1/2 top-1/2 transition-transform"
          style={{
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
          }}
        >
          {/* Edges */}
          <svg className="absolute inset-0 w-[520px] h-[320px] pointer-events-none" viewBox="0 0 520 320">
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(174 72% 52%)" />
                <stop offset="100%" stopColor="hsl(262 60% 58%)" />
              </linearGradient>
            </defs>
            {/* UI -> Backend */}
            <path d="M260 80 L260 140" stroke="url(#edge)" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Backend -> Algorand */}
            <path d="M230 180 L160 220" stroke="url(#edge)" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Backend -> IPFS */}
            <path d="M260 190 L260 220" stroke="url(#edge)" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Backend -> AI */}
            <path d="M290 180 L360 220" stroke="url(#edge)" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>

          {/* Nodes */}
          <div className="relative w-[520px] h-[320px] flex items-center justify-center">
            {architectureNodes.map((node) => (
              <div
                key={node.id}
                className="absolute glass-card p-3 w-52 text-xs"
                style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <node.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-heading text-[0.8rem] font-semibold">{
                    node.label.split("\n")[0]
                  }</span>
                </div>
                <p className="text-[0.7rem] text-muted-foreground whitespace-pre-line">
                  {node.label.split("\n")[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState } from "react";
import {
  Cpu,
  Shield,
  Workflow,
  Github,
  Linkedin,
  Activity,
  Vote,
  Gift,
  MessageSquare,
  Filter,
  Map,
  Coins,
  Search,
  Database,
  Globe,
  Award,
  Users,
  Target,
  TrendingUp,
  Lock,
  Zap,
  BarChart3,
  Landmark,
  Upload,
  FileText,
  Layers,
} from "lucide-react";

import ZoomableImage from "./ZoomableImage";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6 bg-white text-slate-900">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900">{title}</h3>
      <div className="mt-3 text-sm text-slate-600 space-y-3">
        {children}
      </div>
    </div>
  );
}


function DiagramSection() {
  const [view, setView] = useState<"userflow" | "architecture">("userflow");

  return (
    <div id="userflow" className="mt-6 grid lg:grid-cols-1 gap-6">
      <Card title="Diagrams">
        <div className="space-y-4">
          {/* Toggle */}
          <div className="flex items-center justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("userflow")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  view === "userflow"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                User Flow Diagram
              </button>
              <button
                onClick={() => setView("architecture")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  view === "architecture"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                System Architecture Diagram
              </button>
            </div>
          </div>

          {view === "userflow" ? (
            <div>
              <h4 className="font-semibold mb-3 text-center">
                Scholaris DAO – User Flow
              </h4>
              <ZoomableImage
                src="/user-flow.excalidraw.svg"
                alt="Scholaris DAO User Flow Diagram"
              />
            </div>
          ) : (
            <div>
              <h4 className="font-semibold mb-3 text-center">
                Scholaris DAO – System Architecture
              </h4>
              <ZoomableImage
                src="/system-architecture.svg"
                alt="Scholaris DAO System Architecture Diagram"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function TechStackGrid() {
  const techs = [
    { slug: "algorand", label: "Algorand", color: "000000" },
    { slug: "python", label: "Python", color: "3776AB" },
    { slug: "react", label: "React", color: "61DAFB" },
    { slug: "typescript", label: "TypeScript", color: "3178C6" },
    { slug: "tailwindcss", label: "Tailwind CSS", color: "06B6D4" },
    { slug: "fastapi", label: "FastAPI", color: "009688" },
    { slug: "postgresql", label: "PostgreSQL", color: "4169E1" },
    { slug: "redis", label: "Redis", color: "DC382D" },
    { slug: "ipfs", label: "IPFS", color: "65C2CB" },
    { slug: "spacy", label: "spaCy", color: "09A3D5" },
    { slug: "scikitlearn", label: "Scikit-learn", color: "F7931E" },
    { slug: "docker", label: "Docker", color: "2496ED" },
    { slug: "github", label: "GitHub", color: "181717" },
    { slug: "vercel", label: "Vercel", color: "000000" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full">
      {techs.map((t) => (
        <div
          key={t.slug}
          className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white grid place-items-center p-2">
            <img
              src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
              alt={t.label}
              className="w-8 h-8"
            />
          </div>
          <span className="mt-2 text-xs font-medium text-center">
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Technical() {
  return (
    <section id="technical" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cover Page */}
        <div id="cover" className="-mt-10 space-y-4">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Scholaris DAO – Illuminate Campus Activities with Blockchain
            </h2>
            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
              Decentralized, AI‑augmented platform that brings trust,
              transparency, and intelligent insights to campus activities –
              starting with placements.
            </p>
            <p className="mt-2 text-sm text-muted-foreground mb-8">
              MLSC Hackspirathon 2026 • February 12, 2026 • Platform: Algorand
            </p>
          </div>

          {/* Developer Cards */}
          <style>
            {`
              .dev-card {
                width: 17em;
                height: 22.5em;
                background: #171717;
                transition: 1s ease-in-out;
                clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
                border-top-right-radius: 20px;
                border-bottom-left-radius: 20px;
                display: flex;
                flex-direction: column;
              }
              .dev-card span {
                font-weight: bold;
                color: white;
                text-align: center;
                display: block;
                font-size: 1em;
              }
              .dev-card .dev-info {
                font-weight: 400;
                color: white;
                display: block;
                text-align: center;
                font-size: 0.72em;
                margin: 1em;
              }
              .dev-card .dev-img {
                width: 7em;
                height: 7em;
                background: white;
                border-radius: 15px;
                margin: auto;
                overflow: hidden;
              }
              .dev-card .dev-img img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top;
              }
              .dev-card .dev-share {
                margin-top: 1em;
                display: flex;
                justify-content: center;
                gap: 1em;
              }
              .dev-card .dev-share a {
                color: white;
                transition: .4s ease-in-out;
              }
              .dev-card .dev-share a:hover {
                color: #60A5FA;
              }
              .dev-card button {
                padding: 0.8em 1.7em;
                display: block;
                margin: auto;
                border-radius: 25px;
                border: none;
                font-weight: bold;
                background: #ffffff;
                color: rgb(0, 0, 0);
                transition: .4s ease-in-out;
              }
              .dev-card button:hover {
                background: #60A5FA;
                color: white;
                cursor: pointer;
              }
            `}
          </style>
          <div className="mt-14 flex flex-wrap justify-center gap-8">
            {/* Card 1 - Sanchitsai */}
            <div className="dev-card">
              <div style={{ marginTop: "1.5em" }}>
                <div className="dev-img">
                  <img src="/PHOTO_SANCHIT.jpeg" alt="Sanchitsai Nipanikar" />
                </div>
              </div>
              <span style={{ marginTop: "0.8em" }}>Sanchitsai Nipanikar</span>
              <p className="dev-info">
                Computer Engineering, Final Yr<br />
                VIT Pune
              </p>
              <div className="dev-share">
                <a
                  href="https://github.com/sanchit1606"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sanchitsai GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanchit1606"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sanchitsai LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </div>
              <a
                href="https://www.linkedin.com/in/sanchit1606"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", marginTop: "auto", marginBottom: "1.5em" }}
              >
                <button>Connect</button>
              </a>
            </div>

            {/* Card 2 - Shrey */}
            <div className="dev-card">
              <div style={{ marginTop: "1.5em" }}>
                <div className="dev-img">
                  <img src="/photo_shrey.jpg" alt="Shrey Chougule" />
                </div>
              </div>
              <span style={{ marginTop: "0.8em" }}>Shrey Chougule</span>
              <p className="dev-info">
                Computer Engineering, Final Yr<br />
                VIT Pune
              </p>
              <div className="dev-share">
                <a
                  href="https://github.com/Shreychougule"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Shrey GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shrey-chougule-b308ab257/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Shrey LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </div>
              <a
                href="https://www.linkedin.com/in/shrey-chougule-b308ab257/"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", marginTop: "auto", marginBottom: "1.5em" }}
              >
                <button>Connect</button>
              </a>
            </div>
          </div>

          {/* Document Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://drive.google.com/file/d/1LmH8F_GMSRQz24c5TtFtT3aruysIsori/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
            >
              <FileText size={18} />
              View Documentation
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-gray-300 rounded-full transition-all hover:scale-105 hover:bg-gray-50"
            >
              <Layers size={18} />
              View PPT
            </a>
          </div>
        </div>

        {/* Table of Contents */}
        <div id="toc" className="mt-8 grid lg:grid-cols-1 gap-6">
          <Card title="Table of Contents">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>
                <a href="#problem" className="text-brand-blue underline">
                  Problem Statement
                </a>
              </li>
              <li>
                <a href="#campus-problems" className="text-brand-blue underline">
                  Identified Campus Problems
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-brand-blue underline">
                  Proposed Solutions Overview
                </a>
              </li>
              <li>
                <a href="#scholaris" className="text-brand-blue underline">
                  Scholaris DAO – Placement Help Module
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-brand-blue underline">
                  Technical Architecture
                </a>
              </li>
              <li>
                <a href="#techstack" className="text-brand-blue underline">
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#impact" className="text-brand-blue underline">
                  Expected Outcomes
                </a>
              </li>
              <li>
                <a href="#future" className="text-brand-blue underline">
                  Future Scope
                </a>
              </li>
              <li>
                <a href="#userflow" className="text-brand-blue underline">
                  User Flow Diagram
                </a>
              </li>
              <li>
                <a href="#references" className="text-brand-blue underline">
                  Conclusion &amp; References
                </a>
              </li>
            </ol>
          </Card>
        </div>

        {/* ── 1. Problem Statement ── */}
        <div id="problem" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="1. Problem Statement">
            <div className="space-y-4 text-sm">
              <p className="text-base font-medium">
                Campus systems such as voting, attendance tracking, feedback
                collection, certification, and group coordination often suffer
                from low trust, opaque processes, and fragmented information.
              </p>
              <p>
                The challenge is to build beginner-friendly blockchain
                application on Algorand that improve trust, verification, and
                coordination for campus activities. Solutions should demonstrate
                how blockchain can enable fair participation, verifiable records,
                privacy-preserving systems, and simple automation without relying
                on centralized control.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lack of trust in centralized authorities</li>
                <li>
                  Manual verification processes leading to inefficiencies
                </li>
                <li>Data tampering and manipulation risks</li>
                <li>Privacy concerns for students and faculty</li>
                <li>
                  Information asymmetry in placement and career preparation
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* ── 2. Identified Campus Problems ── */}
        <div id="campus-problems" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="2. Identified Campus Problems">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Search className="text-brand-blue mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold">
                      2.1 Placement Information Gap
                    </div>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        • TPO systems (like VIERP) contain extensive placement
                        data but are difficult to navigate
                      </li>
                      <li>
                        • Job descriptions (JDs) gets lost in email threads
                      </li>
                      <li>
                        • Seniors graduate and take valuable interview insights
                        with them
                      </li>
                      <li>
                        • No structured knowledge about company-specific
                        requirements (skills, DSA patterns, programming
                        languages)
                      </li>
                      <li>
                        • Juniors waste time reinventing preparation strategies
                        every year
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Vote className="text-brand-blue mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold">
                      2.2 Campus Governance &amp; Voting
                    </div>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        • Club elections and student body voting lack
                        transparency
                      </li>
                      <li>• Fear of manipulation in vote counting</li>
                      <li>
                        • No privacy for voters (potential retaliation)
                      </li>
                      <li>
                        • Difficulty in verifying one-person-one-vote principle
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <MessageSquare className="text-brand-blue mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold">
                      2.3 Feedback &amp; Grievance Collection
                    </div>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        • Students fear retaliation when giving honest
                        course/professor feedback
                      </li>
                      <li>
                        • Centralized systems can tamper with or delete feedback
                      </li>
                      <li>• Lack of anonymity in grievance systems</li>
                      <li>
                        • No way to verify authenticity of feedback vs. spam
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Activity className="text-brand-blue mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold">
                      2.4 Low Academic Engagement
                    </div>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        • Low attendance in non-mandatory lectures due to lack
                        of motivation
                      </li>
                      <li>
                        • No incentive structure to reward consistent academic
                        participation
                      </li>
                      <li>
                        • Students skip events, quizzes, and club activities
                        without consequences
                      </li>
                      <li>
                        • Manual attendance is time-consuming and prone to proxy
                        marking
                      </li>
                      <li>
                        • No gamification to drive engagement across campus
                        activities
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── 3. Proposed Solutions Overview ── */}
        <div id="solutions" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="3. Proposed Solutions Overview">
            <div className="space-y-6">
              <p className="text-sm">
                We propose multiple blockchain-powered solutions that leverage
                Algorand's unique features to address campus challenges. Our
                primary focus is the Placement Intelligence Module of Scholaris
                DAO, with supporting solutions demonstrating the versatility of
                our approach.
              </p>

              {/* 3.1 Voting */}
              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                <div className="font-semibold flex items-center gap-2 mb-2">
                  <Shield className="text-brand-teal" />
                  3.1 Permissioned Campus Voting System
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Goal:</strong> Secure, auditable elections with
                  one-person-one-vote and private ballots
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>On-Chain:</strong> Stateful smart contract (PyTEAL)
                    registers eligible voter addresses
                  </li>
                  <li>
                    • <strong>Privacy:</strong> Commit-reveal scheme — voters
                    submit hash(vote + nonce), later reveal actual vote
                  </li>
                  <li>
                    • <strong>Sybil Prevention:</strong> Permissioned list or
                    one-time voting token (ASA) that burns upon voting
                  </li>
                  <li>
                    • <strong>State Management:</strong> Global state for vote
                    tallies, local state for opt-in/hasVoted flag
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why Algorand:</strong> Fast finality (4 seconds), low
                  fees enable multiple voting rounds
                </p>
              </div>

              {/* 3.2 Engagement Rewards */}
              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                <div className="font-semibold flex items-center gap-2 mb-2">
                  <Gift className="text-brand-teal" />
                  3.2 Engagement Rewards System (Token-Incentivized Campus
                  Participation)
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Goal:</strong> Increase academic engagement in campus
                  through token incentives
                </p>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="font-medium text-sm mb-1">
                      Core Token Utility Model
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • <strong>Token Acquisition:</strong> Students earn
                        tokens via attendance (QR scans), quizzes, competitions,
                        submitting feedback, attending club events. Rewards
                        prioritized: semester attendance → feedbacks → quizzes →
                        technical events.
                      </li>
                      <li>
                        • <strong>Token Spending:</strong> Use ASAs on Algorand
                        for transfers. Redemptions trigger atomic transfers
                        (burn tokens for NFTs or send to event organizers).
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-medium text-sm mb-1">
                      Potential Uses for Tokens
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • <strong>Event Registrations:</strong> Hackathon/workshop
                        entry, club event tickets, campus competition fees — all
                        payable with tokens instead of UPI/cash
                      </li>
                      <li>
                        • <strong>Educational Resources:</strong> Redeem for
                        online modules, certifications, curated study materials;
                        waive library late overdue penalties
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-medium text-sm mb-1">
                      Implementation Considerations
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • PyTEAL functions for token redemption (e.g.,{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          redeem_tokens(event_id, amount)
                        </code>
                        )
                      </li>
                      <li>
                        • Anti-Sybil: one-wallet-per-student via campus ID
                        linkage
                      </li>
                      <li>
                        • Low fees (0.001 ALGO) make frequent small spends
                        viable
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3.3 Anonymous Feedback */}
              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                <div className="font-semibold flex items-center gap-2 mb-2">
                  <Lock className="text-brand-teal" />
                  3.3 Anonymous Course Feedback
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Goal:</strong> Honest course feedback without fear of
                  retaliation
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Commit Phase:</strong> Students submit hash(rating
                    + nonce) on-chain
                  </li>
                  <li>
                    • <strong>Reveal Phase:</strong> After semester ends, submit
                    plaintext rating + nonce
                  </li>
                  <li>
                    • <strong>Verification:</strong> Smart contract validates
                    hash matches reveal
                  </li>
                  <li>
                    • <strong>AI Aggregation:</strong> Analyzes sentiment only
                    after critical mass (50+ responses)
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* ── 4. Primary Solution: Placement Help Module ── */}
        <div id="scholaris" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="4. Primary Solution: Scholaris DAO – Placement Help Module">
            <div className="space-y-6">
              {/* 4.1 Core Problem */}
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  4.1 The Core Problem
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <div className="font-semibold text-red-800 mb-2">
                      Current State
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>
                        • TPO systems (VIERP) are data graveyards with poor UX
                      </li>
                      <li>
                        • 500+ JDs buried in difficult-to-navigate interfaces
                      </li>
                      <li>
                        • Seniors possess valuable insights but knowledge
                        disappears post-graduation
                      </li>
                      <li>
                        • No structured way to answer: "What DS&amp;A patterns
                        does Citi Sachs ask?"
                      </li>
                      <li>
                        • Juniors waste 100+ hours researching what seniors
                        already know
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <div className="font-semibold text-orange-800 mb-2">
                      Impact
                    </div>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>
                        • Lower placement rates due to inefficient preparation
                      </li>
                      <li>
                        • Repeated effort every year (knowledge not preserved)
                      </li>
                      <li>
                        • Missed opportunities (students don't know which
                        companies match their skills)
                      </li>
                      <li>
                        • Unfair advantage for students with senior connections
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4.2 Solution Architecture */}
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  4.2 Solution Architecture
                </h4>

                {/* Part 1: Data Layer */}
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 mb-4">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <Database className="text-blue-600" />
                    Part 1: Data Layer (IPFS + Algorand)
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">
                      JD Upload &amp; Storage Flow:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 mb-3">
                      <li>
                        User uploads JD (PDF/text/image) through web interface
                      </li>
                      <li>
                        File stored on IPFS (InterPlanetary File System)
                      </li>
                      <li>
                        IPFS hash + metadata stored in Algorand smart contract
                      </li>
                      <li>
                        AI extracts structured data (skills, requirements, CTC,
                        etc)
                      </li>
                      <li>Uploader earns ScholTokens (ASA) as reward</li>
                    </ol>
                    <p className="font-medium mb-1">
                      Smart Contract Global State Structure:
                    </p>
                    <p>
                      Each JD record contains:{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        jd_id, ipfs_hash, company, role, year,
                        uploader_address, verification_votes, quality_score,
                        view_count, timestamp
                      </code>
                    </p>
                  </div>
                </div>

                {/* Part 2: AI Layer */}
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400 mb-4">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <Cpu className="text-purple-600" />
                    Part 2: AI Intelligence Layer (Off-Chain)
                  </div>
                  <div className="text-sm text-muted-foreground space-y-3">
                    <div>
                      <p className="font-medium">
                        Component 1: Skill Extraction Engine
                      </p>
                      <ul className="space-y-1 mt-1">
                        <li>
                          • Uses NLP to extract required skills, experience
                          level, role category, CGPA cutoffs, and eligible
                          branches from JD text.
                        </li>
                        <li>
                          • For campus TPO company details and JDs uploaded by
                          students, the AI module further extracts specifics such
                          as company name, role, location, categorized skills
                          (e.g., Programming languages, Frameworks &amp;
                          Libraries, Databases, Cloud &amp; DevOps, Version
                          Control), and minimum qualification criteria for Online
                          Assessment (OA), including 10th/12th marks and CGPA
                          thresholds.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">
                        Component 2: Pattern Recognition System
                      </p>
                      <p className="mt-1">
                        Analyzes historical interview experiences to identify
                        recurring DSA patterns, difficulty distribution, and
                        temporal trends in company requirements.
                      </p>
                      <p className="mt-2">
                        After a company's campus drive is completed,
                        OA-shortlisted students can post OA patterns and
                        programming problem statements in a community forum.
                        Before posting, users select options like Company Name,
                        Role, and Tag (e.g., OA Cleared, Technical Interview
                        Cleared, Selected for Company). They then describe their
                        OA problem statements, interview experiences, questions
                        asked, HR round Q&amp;A, etc. Like Reddit, other users
                        can upvote posts, with the most upvoted appearing at the
                        top. This data is fed into AI models to detect patterns.
                        Users who post their interview experience are rewarded
                        with ScholTokens.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Part 3: Blockchain Features */}
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 mb-4">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <Coins className="text-green-600" />
                    Part 3: Blockchain Features (Algorand-Specific)
                  </div>
                  <div className="text-sm text-muted-foreground space-y-3">
                    <div>
                      <p className="font-medium">
                        Feature 1: Contribution Reward System (ASAs)
                      </p>
                      <div className="mt-2 overflow-x-auto">
                        <table className="w-full text-sm table-auto">
                          <thead>
                            <tr className="text-left text-xs text-muted-foreground">
                              <th className="px-3 py-2">Action</th>
                              <th className="px-3 py-2">ScholTokens</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="px-3 py-1">Upload JD</td>
                              <td className="px-3 py-1 font-semibold">
                                +10 tokens
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-3 py-1">
                                Upload interview experience
                              </td>
                              <td className="px-3 py-1 font-semibold">
                                +15 tokens
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-3 py-1">
                                Verify others' uploads
                              </td>
                              <td className="px-3 py-1 font-semibold">
                                +2 tokens
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-3 py-1">
                                Popular content (50+ views)
                              </td>
                              <td className="px-3 py-1 font-semibold">
                                +20 bonus tokens
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-3 py-1">Downvoted as spam</td>
                              <td className="px-3 py-1 font-semibold text-red-600">
                                −15 tokens
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">
                        Feature 2: Decentralized Curation (DAO Governance)
                      </p>
                      <ul className="space-y-1 mt-1">
                        <li>
                          • Community voting on JD quality (1-5 stars)
                        </li>
                        <li>
                          • Weighted votes: Placed students = 2x weight
                        </li>
                        <li>
                          • Stake tokens to propose JD removal
                        </li>
                        <li>
                          • Automatic archival of JDs older than 2 years (unless
                          community votes to keep)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Part 4: Advanced Features */}
                <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <Zap className="text-indigo-600" />
                    Part 4: Advanced Features
                  </div>
                  <div className="text-sm text-muted-foreground space-y-3">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        <Filter size={14} /> Feature 1: Smart Filter System
                      </p>
                      <p className="mt-1">
                        Students can filter companies by:
                      </p>
                      <ul className="space-y-1 mt-1">
                        <li>
                          • <strong>Role:</strong> Backend Developer, Full Stack,
                          Data Scientist, AI/ML Engineer etc
                        </li>
                        <li>
                          • <strong>Skills Required:</strong> Java (Banking
                          applications), Python (AI/ML), React (Frontend) etc
                        </li>
                        <li>
                          • <strong>DS&amp;A Pattern:</strong> Arrays/HashMaps,
                          Trees/Graphs, Dynamic Programming etc
                        </li>
                        <li>
                          • <strong>CTC Range:</strong> 10-20 LPA, 20-40 LPA,
                          40+ LPA
                        </li>
                        <li>
                          • <strong>CGPA Cutoff:</strong> No cutoff, 7.0+, 8.0+,
                          9.0+
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── 5. Technical Architecture ── */}
        <div id="architecture" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="5. Technical Architecture">
            <div className="space-y-6">
              {/* 5.1 System Overview */}
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  5.1 System Architecture Overview
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <Globe className="mx-auto text-blue-600 mb-2" size={28} />
                    <div className="font-semibold text-sm">
                      User Interface Layer
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      React Frontend – Web &amp; Mobile Responsive
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <Workflow
                      className="mx-auto text-green-600 mb-2"
                      size={28}
                    />
                    <div className="font-semibold text-sm">
                      Application Backend
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Python FastAPI – API Gateway
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Shield
                      className="mx-auto text-purple-600 mb-2"
                      size={28}
                    />
                    <div className="font-semibold text-sm">
                      Blockchain Layer
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Algorand Smart Contracts (PyTEAL)
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <Cpu className="mx-auto text-orange-600 mb-2" size={28} />
                    <div className="font-semibold text-sm">AI/ML Pipeline</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Off-Chain Intelligence (NLP, Recommendations)
                    </p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg text-center">
                    <Database
                      className="mx-auto text-teal-600 mb-2"
                      size={28}
                    />
                    <div className="font-semibold text-sm">Storage Layer</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      IPFS for files, PostgreSQL for metadata
                    </p>
                  </div>
                </div>
              </div>

              {/* 5.2 Data Flow */}
              <div>
                <h4 className="font-semibold text-lg mb-3">5.2 Data Flow</h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2">JD Upload Flow</div>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Student uploads PDF through frontend</li>
                      <li>Backend receives file and stores in IPFS</li>
                      <li>AI extracts skills, company info, requirements</li>
                      <li>
                        Metadata + IPFS hash submitted to Algorand smart contract
                      </li>
                      <li>
                        Contract stores on-chain state and mints ScholTokens to
                        uploader
                      </li>
                      <li>Success confirmation returned to frontend</li>
                    </ol>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2">Company Query Flow</div>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Student applies filters in frontend</li>
                      <li>
                        Backend queries Algorand for matching JD hashes
                      </li>
                      <li>
                        AI pipeline analyzes patterns and generates insights
                      </li>
                      <li>IPFS content fetched and processed</li>
                      <li>Personalized results returned to frontend</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* 5.3 Smart Contract Design */}
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  5.3 Smart Contract Design
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2">
                      Global State Variables
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        •{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          total_jds
                        </code>
                        : Counter of total JDs uploaded
                      </li>
                      <li>
                        •{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          total_verifications
                        </code>
                        : Counter of verification actions
                      </li>
                      <li>
                        •{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          jd_records
                        </code>
                        : Mapping of jd_id to JD metadata
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2">
                      Local State Variables (Per User)
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        •{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          tokens_earned
                        </code>
                        : Total ScholTokens earned
                      </li>
                      <li>
                        •{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          jds_uploaded
                        </code>
                        : Count of JDs uploaded by user
                      </li>
                      <li>
                        •{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          reputation_score
                        </code>
                        : Calculated based on contribution quality
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="font-medium mb-2">Key Functions</div>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      •{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        upload_jd()
                      </code>
                      : Store IPFS hash, metadata, mint tokens
                    </div>
                    <div>
                      •{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        verify_jd()
                      </code>
                      : Record verification vote, manage stakes
                    </div>
                    <div>
                      •{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        vote_quality()
                      </code>
                      : Update quality scores with weighted votes
                    </div>
                    <div>
                      •{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        claim_bonus()
                      </code>
                      : Distribute bonus tokens for popular content
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Diagrams (Toggle) ── */}
        <DiagramSection />

        {/* ── 6. Tech Stack ── */}
        <div id="techstack" className="mt-10">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="6. Technology Stack">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  Detailed Technology Breakdown
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm table-auto">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="px-3 py-2">Layer</th>
                        <th className="px-3 py-2">Tech</th>
                        <th className="px-3 py-2">Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Blockchain
                        </td>
                        <td className="px-3 py-2 align-top">
                          Algorand, PyTEAL, Beaker, AlgoKit
                        </td>
                        <td className="px-3 py-2 align-top">
                          Stateful smart contracts, ASAs (ScholTokens), Atomic
                          Transfers, Local/Global State; LocalNet → TestNet →
                          MainNet
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Decentralized Storage
                        </td>
                        <td className="px-3 py-2 align-top">
                          IPFS, Pinata / Web3.Storage
                        </td>
                        <td className="px-3 py-2 align-top">
                          Store JD PDFs, images, interview experiences with
                          content persistence via pinning services
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          AI/ML Pipeline
                        </td>
                        <td className="px-3 py-2 align-top">
                          spaCy v3.7+, Hugging Face, Custom BERT, Scikit-learn,
                          OpenAI GPT-4, Tesseract OCR
                        </td>
                        <td className="px-3 py-2 align-top">
                          NLP skill extraction, pattern recognition, TF-IDF
                          recommendations, roadmap generation, OCR for JD images
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Backend
                        </td>
                        <td className="px-3 py-2 align-top">
                          Python FastAPI, JWT + Wallet Auth, Redis
                        </td>
                        <td className="px-3 py-2 align-top">
                          RESTful API with /auth, /jds, /companies, /user,
                          /recommendations endpoints; rate limiting; async
                          testing with pytest
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Frontend
                        </td>
                        <td className="px-3 py-2 align-top">
                          React v18+ (TypeScript), Tailwind CSS, shadcn/ui,
                          Zustand, React Query
                        </td>
                        <td className="px-3 py-2 align-top">
                          Responsive dashboard, wallet integration
                          (@perawallet/connect), Recharts/D3.js visualization,
                          PWA, Dark mode
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Database
                        </td>
                        <td className="px-3 py-2 align-top">
                          PostgreSQL v15+, Redis
                        </td>
                        <td className="px-3 py-2 align-top">
                          Users, JDs, Verifications, InterviewExperiences,
                          ScholTokenTransactions tables; Redis caching for
                          insights &amp; roadmaps
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Infrastructure
                        </td>
                        <td className="px-3 py-2 align-top">
                          Docker, GitHub Actions, Vercel / Netlify, Railway /
                          Render / AWS EC2
                        </td>
                        <td className="px-3 py-2 align-top">
                          Containerized deployment, CI/CD, CDN auto-scaling
                          frontend, Sentry error tracking, Algorand Indexer
                          monitoring
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-center">
                  <TechStackGrid />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── 7. Expected Outcomes ── */}
        <div id="impact" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="7. Expected Outcomes">
            <div className="space-y-6">
              {/* 7.1 Immediate Impact */}
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  7.1 Immediate Impact (MVP)
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Database size={16} />
                      Centralized Knowledge Repository
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 50+ JDs uploaded in first month</li>
                      <li>• 100+ interview experiences shared</li>
                      <li>• All data verifiable and tamper-proof</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <TrendingUp size={16} />
                      Improved Preparation Efficiency
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Students save 50+ hours of research time</li>
                      <li>
                        • Personalized roadmaps increase success rate by 30%
                      </li>
                      <li>• Better company-student matching</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <div className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <Award size={16} />
                      Incentivized Contribution
                    </div>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>
                        • Seniors motivated to upload (earn ScholTokens)
                      </li>
                      <li>• Community-driven quality control</li>
                      <li>• Self-sustaining knowledge transfer</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 7.2 Long-Term Vision */}
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  7.2 Long-Term Vision
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Users size={16} />
                      Cross-College Network
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Expand to engineering colleges</li>
                      <li>• Shared ScholToken economy</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Target size={16} />
                      Recruiter Integration
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Companies access verified candidate pool</li>
                      <li>
                        • On-chain skill credentials (verifiable portfolios)
                      </li>
                      <li>• Direct recruitment through platform</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Coins size={16} />
                      Monetization
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Premium tier ($5/month): AI mock interviews,
                        mentorship
                      </li>
                      <li>
                        • Company partnerships: Sponsored JD placement
                      </li>
                      <li>• Data insights for TPOs</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Landmark size={16} />
                      DAO Governance
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Token holders vote on platform features
                      </li>
                      <li>• Community-driven roadmap</li>
                      <li>• Decentralized moderation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 7.3 Measurable Metrics */}
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  7.3 Measurable Success Metrics
                </h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Number of JDs uploaded and verified",
                    "Student engagement rate (daily active users)",
                    "Placement success rate improvement (before vs. after)",
                    "Time saved per student in preparation",
                    "ScholToken circulation and economy health",
                    "Cross-college adoption rate",
                    "Recruiter partnerships established",
                  ].map((metric, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border border-gray-200 rounded-lg text-sm flex items-start gap-2"
                    >
                      <BarChart3
                        size={14}
                        className="text-brand-blue mt-0.5 shrink-0"
                      />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── 8. Future Scope ── */}
        <div id="future" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="8. Future Scope">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  8.1 Feature Enhancements
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Cpu size={16} className="text-blue-600" />
                      Advanced AI Features
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Resume analyzer (match resume to JD requirements)
                      </li>
                      <li>
                        • Weakness identifier (suggest improvement areas)
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Shield size={16} className="text-purple-600" />
                      Blockchain Enhancements
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Cross-chain bridge (support Ethereum)
                      </li>
                      <li>
                        • Zero-knowledge proofs (stronger privacy)
                      </li>
                      <li>
                        • Arweave migration for permanent storage
                      </li>
                      <li>
                        • DAO treasury management
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Users size={16} className="text-green-600" />
                      Social Features
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Study groups with on-chain accountability contracts
                      </li>
                      <li>• Peer mentorship marketplace</li>
                      <li>• Alumni network integration</li>
                      <li>• Token-curated discussion forums</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">
                  8.2 Scalability Considerations
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                    <div className="font-medium">Technical Scalability</div>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-muted-foreground">
                      <li>Shard database for multi-college support</li>
                      <li>CDN for IPFS content delivery</li>
                      <li>Caching layer for AI-generated insights</li>
                      <li>Load balancing for API servers</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                    <div className="font-medium">Economic Scalability</div>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-muted-foreground">
                      <li>Token value appreciation as user base grows</li>
                      <li>Staking rewards (incentivize long-term holding)</li>
                      <li>Burn mechanism (reduce supply, increase scarcity)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── 9. Conclusion ── */}
        <div id="references" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="10. Conclusion">
            <div className="space-y-4 text-sm">
              <p>
                Scholaris DAO addresses critical gaps in campus coordination by
                combining blockchain's immutability for trust and verification,
                AI's intelligence for personalization and insights, and token
                economics for incentivizing participation.
              </p>
              <p>
                This solution transforms campus operations from isolated, opaque
                processes into collaborative, transparent, and efficient systems.
                By leveraging Algorand's unique features (low fees, fast
                finality, native ASAs), we create a sustainable ecosystem that
                benefits students, faculty, and institutions alike.
              </p>
              <p>
                Team Init2WinIt is committed to building a production-ready MVP
                that demonstrates the power of decentralized coordination in
                education. Our solution is not just technically sound but
                addresses real problems faced by thousands of students every
                year.
              </p>
            </div>
          </Card>
        </div>

        {/* ── References ── */}
        <div className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="References">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>
                <strong>Algorand Developer Documentation:</strong>{" "}
                <a
                  href="https://developer.algorand.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline"
                >
                  developer.algorand.org
                </a>
              </li>
              <li>
                <strong>PyTEAL Documentation:</strong>{" "}
                <a
                  href="https://pyteal.readthedocs.io"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline"
                >
                  pyteal.readthedocs.io
                </a>
              </li>
              <li>
                <strong>IPFS Documentation:</strong>{" "}
                <a
                  href="https://docs.ipfs.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline"
                >
                  docs.ipfs.tech
                </a>
              </li>
              <li>
                <strong>spaCy NLP Documentation:</strong>{" "}
                <a
                  href="https://spacy.io"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline"
                >
                  spacy.io
                </a>
              </li>
              <li>
                <strong>React Documentation:</strong>{" "}
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline"
                >
                  react.dev
                </a>
              </li>
              <li>
                <strong>FastAPI Documentation:</strong>{" "}
                <a
                  href="https://fastapi.tiangolo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline"
                >
                  fastapi.tiangolo.com
                </a>
              </li>
            </ol>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            MLSC Hackspirathon 2026
          </p>
        </div>
      </div>
    </section>
  );
}

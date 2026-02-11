import React, { useRef, useState } from "react";
import {
  BookOpen,
  Cpu,
  Shield,
  Workflow,
  Link2,
  Github,
  Linkedin,
  User as UserIcon,
  Mic,
  Image as ImageIcon,
  Upload,
  BadgeAlert,
  Stethoscope,
  Languages,
  Landmark,
  FlaskConical,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ZoomableImage from "./ZoomableImage";
import { AnimatedBeam } from "./AnimatedBeam";
import DevProfileCard from "./DevProfileCard";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">{title}</h3>
      <div className="mt-3 text-sm text-muted-foreground space-y-3">
        {children}
      </div>
    </div>
  );
}

function BeamShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const openaiRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const features = [
    { label: "Audio", Icon: Mic },
    { label: "Image", Icon: ImageIcon },
    { label: "Upload", Icon: Upload },
    { label: "Alerts", Icon: BadgeAlert },
  ];

  return (
    <div ref={containerRef} className="relative h-72 w-full">
      {/* Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={openaiRef}
        curvature={-60}
        pathColor="#60A5FA"
        pathWidth={2}
        gradientStartColor="#60A5FA"
        gradientStopColor="#22D3EE"
      />
      {featureRefs.map((ref, i) => (
        <AnimatedBeam
          key={i}
          containerRef={containerRef}
          fromRef={openaiRef}
          toRef={ref}
          curvature={-40 - i * 6}
          delay={i * 0.2}
          pathColor="#60A5FA"
          pathWidth={2}
          gradientStartColor="#60A5FA"
          gradientStopColor="#22D3EE"
        />
      ))}

      {/* Nodes */}
      <div className="absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: User */}
        <div className="flex flex-col items-center">
          <div
            ref={userRef}
            className="ml-2 size-16 rounded-full bg-secondary border border-border shadow grid place-items-center"
          >
            <img
              src="https://cdn.simpleicons.org/openai/1B8EE6"
              alt="OpenAI"
              className="h-6 w-6"
            />
          </div>
          <span className="mt-2 text-sm font-medium">User</span>
        </div>

        {/* Center: OpenAI */}
        <div className="flex flex-col items-center">
          <div
            ref={openaiRef}
            className="size-20 rounded-full bg-gradient-to-tr from-brand-blue/20 to-brand-teal/30 border border-border shadow grid place-items-center"
          >
            <img
              src="https://cdn.simpleicons.org/openai/1B8EE6"
              alt="OpenAI"
              className="h-6 w-6"
            />
          </div>
          <div className="mt-2 inline-flex items-center text-xs text-muted-foreground">
            <Link2 className="mr-1 h-3 w-3" /> LUMEN Runtime
          </div>
        </div>

        {/* Right: Features */}
        <div className="flex justify-end pr-2">
          <div className="grid gap-3">
            {features.map(({ label, Icon }, idx) => (
              <div key={label} className="flex items-center gap-2 justify-end">
                <div
                  ref={featureRefs[idx]}
                  className="size-12 rounded-full bg-white shadow border border-border grid place-items-center"
                >
                  <Icon className="text-brand-blue" size={18} />
                </div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TechStackGrid() {
  const techs = [
    { slug: "openai", label: "OpenAI", color: "1B8EE6" },
    { slug: "huggingface", label: "Hugging Face", color: "FF6A00" },
    { slug: "react", label: "React", color: "61DAFB" },
    { slug: "tailwindcss", label: "Tailwind CSS", color: "06B6D4" },
    { slug: "framer", label: "Framer Motion", color: "0055FF" },
    { slug: "nodedotjs", label: "Node.js", color: "339933" },
    { slug: "express", label: "Express", color: "000000" },
    { slug: "netlify", label: "Netlify", color: "00C7B4" },
    { slug: "github", label: "GitHub", color: "181717" },
    // Added remaining stack icons
    { slug: "postgresql", label: "PostgreSQL", color: "4169E1" },
    { slug: "redis", label: "Redis", color: "DC382D" },
    { slug: "pytorch", label: "PyTorch", color: "EE4C2C" },
    { slug: "jwt", label: "JWT", color: "000000" },
    { slug: "docker", label: "Docker", color: "2496ED" },
    { slug: "kubernetes", label: "Kubernetes", color: "326CE5" },
    { slug: "amazonwebservices", label: "AWS", color: "FF9900" },
    { slug: "googlecloud", label: "GCP", color: "4285F4" },
    { slug: "azure", label: "Azure", color: "0078D4" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full">
      {techs.map((t) => (
        <div
          key={t.slug}
          className="flex flex-col items-center p-3 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
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

function DiagramToggle({
  currentView,
  onToggle,
}: {
  currentView: "userflow" | "architecture" | "laymen";
  onToggle: (view: "userflow" | "architecture" | "laymen") => void;
}) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onToggle("userflow")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === "userflow"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          User Flow Diagram
        </button>
        <button
          onClick={() => onToggle("architecture")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === "architecture"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          System Architecture Diagram
        </button>
        <button
          onClick={() => onToggle("laymen")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === "laymen"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Laymen Terms Diagram
        </button>
      </div>
    </div>
  );
}

function TeamCard({
  name,
  role,
  photo,
  github,
  linkedin,
}: {
  name: string;
  role: string;
  photo?: string;
  github?: string;
  linkedin?: string;
}) {
  return (
    <div className="relative w-full max-w-[380px] h-[384px] flex flex-col items-center rounded-[20px] bg-white shadow-lg border border-gray-100">
      {/* Triangular Background Pattern */}
      <div className="h-48 w-full rounded-t-[20px] overflow-hidden relative pr-7">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              linear-gradient(60deg, hsl(var(--brand-blue)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-blue)) 75%, hsl(var(--brand-blue))),
              linear-gradient(120deg, hsl(var(--brand-teal)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-teal)) 75%, hsl(var(--brand-teal))),
              linear-gradient(60deg, hsl(var(--brand-blue)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-blue)) 75%, hsl(var(--brand-blue))),
              linear-gradient(120deg, hsl(var(--brand-teal)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-teal)) 75%, hsl(var(--brand-teal)))
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 0, 20px 20px, 20px 20px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="absolute w-[114px] h-[114px] bg-white rounded-full flex justify-center items-center top-[calc(50%-57px)] border-4 border-white shadow-lg">
        {photo ? (
          <img
            src={photo}
            alt={`${name} photo`}
            className="w-[100px] h-[100px] rounded-full object-cover object-top"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-muted grid place-items-center text-muted-foreground text-xs">
            Photo
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center pt-[60px] px-4">
        <h3 className="font-medium text-lg text-black">{name}</h3>
        <p className="mt-2.5 font-normal text-[15px] text-[#78858F] text-center">
          {role}
        </p>

        <div className="mt-4 flex gap-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              <Github size={16} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              <Linkedin size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Technical() {
  const [diagramView, setDiagramView] = useState<
    "userflow" | "architecture" | "laymen"
  >("userflow");

  return (
    <section id="technical" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cover Page (non-card) */}
        <div id="cover" className="mt-6 space-y-4">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Scholaris DAO – Illuminate Campus Activities with Blockchain
            </h2>
            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
              Decentralized, AI‑augmented platform that brings trust,
              transparency, and intelligent insights to campus activities –
              starting with placements.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Campus Blockchain Hackathon • February 12, 2026 • Platform:
              Algorand
            </p>
          </div>
        </div>

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
                  Scholaris DAO – Placement Module
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
                <a href="#implementation" className="text-brand-blue underline">
                  Implementation Approach
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
                <a href="#references" className="text-brand-blue underline">
                  Conclusion & References
                </a>
              </li>
            </ol>
          </Card>
        </div>

        {/* Problem Statement */}
        <div id="problem" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="Problem Statement">
            <div className="space-y-4 text-sm">
              <p className="text-base font-medium">
                Campus systems such as voting, attendance tracking, feedback
                collection, certification, and placement preparation often
                suffer from low trust, opaque processes, and fragmented
                information.
              </p>
              <p>
                Scholaris DAO explores how Algorand‑based blockchain + AI can
                bring verifiable records, fair participation, and
                privacy‑preserving coordination to campus activities – starting
                with a decentralized placement intelligence platform.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lack of trust in centralized authorities and portals</li>
                <li>
                  Manual verification and data entry leading to inefficiencies
                </li>
                <li>Risk of data tampering, bias, and manipulation</li>
                <li>
                  Privacy concerns for students and faculty when sharing
                  feedback or preferences
                </li>
                <li>
                  Information asymmetry in placement preparation – juniors
                  repeatedly rediscover what seniors already know
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* User Flow & High-Level Solutions */}
        <div id="architecture" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="User Flow & High‑Level Solutions">
            <div className="space-y-3">
              <DiagramToggle
                currentView={diagramView}
                onToggle={setDiagramView}
              />

              {diagramView === "userflow" ? (
                <div>
                  <h4 className="font-semibold mb-3 text-center">
                    User Flow Diagram
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    The user flow diagram illustrates how students, seniors, TPO
                    members, and recruiters interact with Scholaris DAO and the
                    underlying Algorand smart contracts.
                  </p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>
                        <strong>Student Input:</strong> Uploads JDs, interview
                        experiences, and skill profiles via the web UI
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>
                        <strong>Frontend Processing:</strong> React +
                        Tailwind‑based dashboard handles uploads, filtering, and
                        recommendations
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>
                        <strong>API Gateway:</strong> FastAPI backend processes
                        files, calls AI services, and prepares on‑chain
                        transactions
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>
                        <strong>AI/ML Processing:</strong> NLP + recommendation
                        models extract skills, detect patterns, and generate
                        roadmaps
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>
                        <strong>On‑Chain State:</strong> Algorand smart
                        contracts store IPFS hashes, contribution metadata, and
                        token balances
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span>
                        <strong>Output:</strong> Personalized company insights,
                        filters, and preparation plans surfaced back to students
                      </span>
                    </div>
                  </div>
                  <ZoomableImage
                    src="/user-flow.excalidraw.svg"
                    alt="Scholaris DAO User Flow Diagram"
                  />
                </div>
              ) : diagramView === "architecture" ? (
                <div>
                  <h4 className="font-semibold mb-3 text-center">
                    System Architecture Diagram
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Comprehensive system architecture showing all components and
                    their interactions:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <h5 className="font-semibold mb-2">Core Components</h5>
                      <ul className="space-y-1">
                        <li>
                          <strong>Frontend:</strong> React + Next.js with
                          multilingual support
                        </li>
                        <li>
                          <strong>API Gateway:</strong> FastAPI with JWT
                          authentication
                        </li>
                        <li>
                          <strong>AI/ML Core:</strong> GPT-4o, Whisper, PEARL
                          CT, Specialist modules
                        </li>
                        <li>
                          <strong>Databases:</strong> PostgreSQL, Redis, Vector
                          DB, AWS S3
                        </li>
                        <li>
                          <strong>Security:</strong> End-to-end encryption,
                          HIPAA/GDPR compliance
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Data Flow</h5>
                      <ol className="space-y-1 list-decimal list-inside">
                        <li>
                          User Input → Frontend processes multimodal input
                        </li>
                        <li>
                          API Gateway → Routes requests with security validation
                        </li>
                        <li>
                          AI/ML Core → Processes data using specialized models
                        </li>
                        <li>
                          Databases → Stores results and retrieves context
                        </li>
                        <li>
                          Output Generation → Delivers results in multiple
                          formats
                        </li>
                      </ol>
                    </div>
                  </div>
                  <ZoomableImage
                    src="/system-architecture-diagram.png"
                    alt="LUMEN System Architecture Diagram"
                  />
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold mb-3 text-center">
                    Laymen Terms Diagram
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Simplified system overview showing how LUMEN processes user
                    input through various modules to generate outputs:
                  </p>
                  <ZoomableImage
                    src="/laymen-diagram.png"
                    alt="LUMEN Laymen Terms Diagram"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Features */}
        <div id="solution" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="FEATURES">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4">Normal Features</h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Stethoscope className="text-brand-blue mt-1" />
                      <div>
                        <div className="font-semibold">
                          Symptoms‑Based Diagnosis & Guidance
                        </div>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Accepts multimodal inputs (text/audio/image)</li>
                          <li>
                            • Analyzes symptoms with severity categorization
                            (Green/Yellow/Red)
                          </li>
                          <li>
                            • Clear next-step guidance in voice, text, and
                            visual formats
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Cpu className="text-brand-blue mt-1" />
                      <div>
                        <div className="font-semibold">
                          AI Specialist Modules
                        </div>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>
                            • Dermatology, Radiology, Cardiology diagnostic
                            suggestions
                          </li>
                          <li>
                            • Patient-friendly advice and clinician-level
                            summaries
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Languages className="text-brand-blue mt-1" />
                      <div>
                        <div className="font-semibold">
                          Multilingual Voice‑First Chatbot
                        </div>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Supports five Indian languages</li>
                          <li>
                            • Uses Whisper for ASR and GPT for natural
                            explanations
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Unique Differentiator Features
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                      <Activity className="text-brand-teal" />
                      PEARL Integration - Personalized Estimated Anatomic
                      Reconstruction & Lifecare
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Hybrid CT reconstruction engine combining
                        geometry-aware modeling (PerX2CT), diffusion refinement
                        (XctDiff), and NeRF detail polishing (SAX-NeRF)
                      </li>
                      <li>
                        • Generates estimated CT volumes with voxel-level
                        uncertainty, enabling safer, lower-dose imaging for
                        follow-up
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                      <FlaskConical className="text-brand-teal" />
                      Lab Report Analyzer & Follow‑Up Generator
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Parses uploaded lab reports (PDF/image), compares
                        values with age- and sex-specific reference ranges
                      </li>
                      <li>
                        • Flags abnormalities and generates simple explanations
                        with diet/lifestyle advice
                      </li>
                      <li>
                        • <strong>Example:</strong> 30-year-old female,
                        Hemoglobin 9.8 g/dL → "Your blood count is lower than
                        normal, which may cause tiredness. Eat iron-rich foods
                        such as spinach, dal, jaggery, and vitamin C fruits."
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                      <Landmark className="text-brand-teal" />
                      Government Schemes & Benefits Assistant
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Retrieves up-to-date national and state health
                        schemes from knowledge base
                      </li>
                      <li>
                        • Explains eligibility + steps in local language
                      </li>
                      <li>
                        • <strong>Example:</strong> "My father in Uttar Pradesh
                        needs dialysis" → "Yes. Under Ayushman Bharat – PMJAY
                        and the UP State Health Scheme, eligible patients get
                        free dialysis at government hospitals."
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                      <BadgeAlert className="text-cta" />
                      Preliminary Triage & Emergency Education
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Step-by-step, life-saving instructions for common
                        emergencies (snakebite, drowning, burns, electric
                        shock)
                      </li>
                      <li>
                        • Clear voice, text, and visual guidance in local
                        language
                      </li>
                      <li>
                        • <strong>Example:</strong> "A child has stopped
                        breathing after drowning" → "Call for emergency help
                        immediately. Lay the child flat, check breathing. If not
                        breathing, start CPR: 30 chest compressions, 2 rescue
                        breaths."
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                      <Stethoscope className="text-pink-600" />
                      GynaeCare - Specialized Women's Health Module
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • <strong>Symptom Screening & Awareness:</strong> Private
                        Q&A to flag possible issues like PCOD/PCOS and
                        Endometriosis
                      </li>
                      <li>
                        • <strong>Guided Next Steps:</strong> Early red-flag
                        alerts and low-cost self-care tips
                      </li>
                      <li>
                        • <strong>Sanitation & Hygiene Education:</strong> Safe
                        use of cloth pads, menstrual cups, biodegradable pads
                        with proper disposal methods
                      </li>
                      <li>
                        • <strong>Govt Schemes & Support:</strong> Links to Jan
                        Aushadhi, Menstrual Hygiene Scheme (MHS), and connects
                        users with local ASHA/anganwadi workers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Role of OpenAI Tools */}
        <div id="openai" className="mt-6">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="Role of OpenAI Tools">
              <div className="p-2">
                <div className="font-medium mb-2">5. Role of OpenAI Tools</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm table-auto">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="px-3 py-2">LUMEN Feature</th>
                        <th className="px-3 py-2">OpenAI Model</th>
                        <th className="px-3 py-2">Usecase</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          Symptom Triage & Guidance
                        </td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">
                          Provides empathetic triage and severity classification
                          from patient symptoms
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          AI Specialist Summaries
                        </td>
                        <td className="px-3 py-2 align-top">gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">
                          Summarizes AI-ML Model outputs into doctor-style
                          report
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          Lab Report Analyzer
                        </td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">
                          Interprets OCR lab values and explains results in
                          patient-friendly terms
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          Govt Schemes Assistant
                        </td>
                        <td className="px-3 py-2 align-top">
                          text-embedding-3-small + gpt-4o-mini
                        </td>
                        <td className="px-3 py-2 align-top">
                          Retrieves and explains govt health scheme eligibility
                          in simple language.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          Emergency Protocols
                        </td>
                        <td className="px-3 py-2 align-top">gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">
                          Gives fast, step-by-step emergency medical
                          instructions.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          Voice Input (ASR)
                        </td>
                        <td className="px-3 py-2 align-top">whisper-1</td>
                        <td className="px-3 py-2 align-top">
                          Converts patient speech to text for symptom entry
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">
                          Voice Output (TTS)
                        </td>
                        <td className="px-3 py-2 align-top">
                          gpt-4o-audio / Azure TTS
                        </td>
                        <td className="px-3 py-2 align-top">
                          Delivers AI responses as a natural voice for
                          accessibility.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Chatbot</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">
                          Provides 24/7 conversational support, guiding users
                          across triage, lab results, schemes, and emergencies
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tech Stack */}
        <div id="techstack" className="mt-6">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="Tech Stack">
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
                          Frontend
                        </td>
                        <td className="px-3 py-2 align-top">
                          React (TypeScript), Next.js, Tailwind CSS
                        </td>
                        <td className="px-3 py-2 align-top">
                          Multilingual, responsive web UI for symptom input, lab
                          uploads, CT viewing, chatbot; SSR for speed & SEO
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Backend
                        </td>
                        <td className="px-3 py-2 align-top">FastAPI</td>
                        <td className="px-3 py-2 align-top">
                          High-performance backend framework; implements REST
                          API endpoints for frontend and AI/ML model
                          communication
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Primary DB
                        </td>
                        <td className="px-3 py-2 align-top">PostgreSQL</td>
                        <td className="px-3 py-2 align-top">
                          Stores user profiles, triage history, lab values, CT
                          metadata, government scheme eligibility
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Cache
                        </td>
                        <td className="px-3 py-2 align-top">Redis</td>
                        <td className="px-3 py-2 align-top">
                          Session caching, language translation caching
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Vector DB
                        </td>
                        <td className="px-3 py-2 align-top">Pinecone</td>
                        <td className="px-3 py-2 align-top">
                          Fully managed vector database for semantic search and
                          embeddings of medical protocols and government schemes
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Object Storage
                        </td>
                        <td className="px-3 py-2 align-top">AWS S3</td>
                        <td className="px-3 py-2 align-top">
                          Scalable, secure storage for CT scans, lab reports,
                          medical images; HIPAA/GDPR compliant
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          AI/ML Core
                        </td>
                        <td className="px-3 py-2 align-top">
                          PyTorch, Hugging Face Transformers, OpenAI APIs
                          (GPT-4o, Whisper, DALL·E)
                        </td>
                        <td className="px-3 py-2 align-top">
                          Hosts AI models (e.g., PEARL CT, dermatology AI) and
                          supports language and vision tasks via OpenAI
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Security
                        </td>
                        <td className="px-3 py-2 align-top">JWT, OAuth2</td>
                        <td className="px-3 py-2 align-top">
                          Authentication and authorization mechanisms
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Infrastructure & Deploy
                        </td>
                        <td className="px-3 py-2 align-top">
                          Docker, Kubernetes (K8s) on AWS/GCP/Azure, CDN
                        </td>
                        <td className="px-3 py-2 align-top">
                          Containerized deployment, GPU-enabled nodes for AI,
                          CDN for frontend assets delivery
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

        {/* Feasibility */}
        <div id="feasibility" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Feasibility">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {/* Left column */}
              <div className="space-y-4">
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.1 Technical Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Resources & Technology:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Prototype: Hugging Face free models (Indic-GPT, Donut,
                        Whisper-small).
                      </li>
                      <li>
                        Production: OpenAI APIs (GPT-4o, Whisper, DALL·E) +
                        custom PEARL CT pipeline.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Infrastructure:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Frontend: React + Tailwind CSS.</li>
                      <li>Backend: FastAPI (Python) with Docker.</li>
                      <li>
                        Deployment: Netlify (frontend), AWS/GCP (production).
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2">
                    Assessment: Existing technologies are sufficient. Only CT
                    reconstruction pipeline requires GPU resources, which are
                    available on cloud platforms.
                  </p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.2 Operational Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Problem Fit:</div>
                    <p>
                      Addresses rural healthcare gaps (900M+ residents), triage
                      delays, and lab follow-up inefficiencies.
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Ease of Operation:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Multilingual voice-first chatbot lowers digital literacy
                        barriers.
                      </li>
                      <li>
                        Offline-first design ensures use even in low-connectivity
                        areas.
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2">
                    Assessment: Operationally feasible, since workflows mirror
                    real-world healthcare interactions (symptom → guidance →
                    follow-up).
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.3 Economic Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Prototype Cost:</div>
                    <p>Minimal (free tiers: Hugging Face, Netlify, Firebase).</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Production Cost:</div>
                    <p>
                      API usage (OpenAI GPT, Whisper), GPU compute (CT), and
                      storage (AWS S3).
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">ROI:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Reducing preventable deaths (e.g., 58,000 annual
                        snakebite fatalities).
                      </li>
                      <li>
                        Saving costs from unnecessary clinic visits & repeated CT
                        scans.
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2">
                    Assessment: Strong cost-benefit justification; socially
                    impactful and scalable.
                  </p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.4 Legal Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Compliance Requirements:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Data protection → GDPR/HIPAA-like standards.</li>
                      <li>Informed consent → required for data use.</li>
                    </ul>
                  </div>
                  <p className="mt-2">
                    Assessment: Legally feasible with proper compliance in
                    production; no major barriers.
                  </p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.5 Market Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Target Users:</div>
                    <p>
                      900M+ rural/semi-urban Indians lacking timely healthcare.
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Market Trend:</div>
                    <p>
                      Rising smartphone penetration (67%+ rural households with
                      access).
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Competition:</div>
                    <p>
                      Existing health apps (Practo, 1mg) focus on urban users;
                      none combine triage + lab reports + CT + schemes in one
                      system.
                    </p>
                  </div>
                  <p className="mt-2">
                    Assessment: High demand, underserved market, unique
                    positioning.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Novelty */}
        <div id="novelty" className="mt-10">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="Novelty">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Comparison showing how LUMEN differs from traditional
                  healthcare systems and existing solutions.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm table-auto">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="px-3 py-2">Feature</th>
                        <th className="px-3 py-2">Traditional Systems</th>
                        <th className="px-3 py-2">LUMEN</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          CT Imaging
                        </td>
                        <td className="px-3 py-2 align-top">
                          Hospital CT scans (₹4,000–₹6,000); no AI low-dose
                          alternatives
                        </td>
                        <td className="px-3 py-2 align-top">
                          PEARL CT: Low-dose AI reconstruction with uncertainty
                          maps → safer & cheaper follow-ups
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Lab Report Analysis
                        </td>
                        <td className="px-3 py-2 align-top">
                          1mg, Apollo 24/7 show raw values only
                        </td>
                        <td className="px-3 py-2 align-top">
                          AI Analyzer: Flags abnormalities + gives
                          lifestyle/diet advice in simple local language
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Government Schemes Access
                        </td>
                        <td className="px-3 py-2 align-top">
                          Info scattered on portals (Ayushman Bharat website,
                          state portals)
                        </td>
                        <td className="px-3 py-2 align-top">
                          Integrated Assistant: Explains eligibility + steps in
                          voice/text for each patient's condition
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Emergency Education
                        </td>
                        <td className="px-3 py-2 align-top">
                          Missing in health apps; patients rely on hearsay or
                          healers
                        </td>
                        <td className="px-3 py-2 align-top">
                          Built-in Protocols: CPR, snakebite, burns →
                          step-by-step local language guidance
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Women's Health (LUMEN GynaeCare)
                        </td>
                        <td className="px-3 py-2 align-top">
                          Flo, Clue (cycle tracking); Practo (urban gyne
                          consults); NGOs like Goonj (hygiene awareness). Each
                          addresses only one aspect
                        </td>
                        <td className="px-3 py-2 align-top">
                          Integrated GynaeCare: Private symptom screening
                          (PCOD, endometriosis) + hygiene education (safe pad
                          use, disposal) + govt scheme linkage (MHS, Jan
                          Aushadhi) → all in one, voice-first & rural-friendly
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">
                          Costing
                        </td>
                        <td className="px-3 py-2 align-top">
                          Doctor visit: ₹300–₹500, travel to city hospital:
                          ₹800–₹1,500, CT scan: ₹4,000–₹6,000, follow-ups
                          ~₹1,000
                        </td>
                        <td className="px-3 py-2 align-top">
                          Cuts costs by 50–70% through local AI triage, fewer
                          city visits, and reduced repeat scans
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Impact & Benefits */}
        <div id="impact" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Impact & Benefits">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Quantitative Benefits
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="font-semibold text-green-800 mb-2">
                      Reduction in Preventable Morbidity and Mortality
                    </div>
                    <p className="text-sm text-green-700">
                      By providing immediate symptom-based triage, emergency
                      education, and guidance, LUMEN aims to significantly
                      reduce the 58,000 annual deaths from snakebites and other
                      emergencies in rural India.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="font-semibold text-blue-800 mb-2">
                      Cost Savings for Patients
                    </div>
                    <p className="text-sm text-blue-700">
                      Early and accurate triage can help avoid 20–30% unnecessary
                      hospital visits and repeat CT scans. Since a single CT
                      costs ₹3,000–₹8,000 and a hospital visit costs
                      ₹500–₹2,000, this translates to an average saving of
                      ₹1,200–₹2,800 ($50–$200) per patient.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <div className="font-semibold text-purple-800 mb-2">
                      Improved Diagnostic Efficiency
                    </div>
                    <p className="text-sm text-purple-700">
                      Automated analysis of lab reports and specialist modules
                      can reduce diagnostic delays from 2–7 days down to under 1
                      hour (98% faster turnaround). This efficiency also frees
                      up doctors' time, enabling them to see 2–3 additional
                      patients per hour and reducing complication-related
                      treatment costs by 15–20% in time-sensitive conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Potential Beneficiaries
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2">
                      Rural and Semi-Urban Populations
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Over 900 million residents with limited access to
                      qualified medical professionals
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2">
                      Primary Health Centers (PHCs) & Community Health Centers
                      (CHCs)
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Equipped with decision support for frontline healthcare
                      workers
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2">
                      Government Health Schemes Beneficiaries
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Increased awareness and access to schemes like Ayushman
                      Bharat, ensuring eligible patients receive entitled
                      benefits
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Awareness & Accessibility Gains
                </h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="font-semibold mb-2">
                      Multilingual, Voice-First Interface
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supports five Indian languages, enabling accessibility for
                      illiterate or non-English-speaking users
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="font-semibold mb-2">
                      Awareness of Government Schemes
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reduces the knowledge gap regarding available health
                      benefits, empowering users to claim entitlements without
                      intermediary assistance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Future Scope */}
        <div id="future" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Future Scope">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  Language Expansion
                </h4>
                <p className="text-sm text-muted-foreground">
                  Extend support to more Indian regional languages and dialects
                  to further improve inclusivity and reach across diverse
                  linguistic regions of India.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">
                  Additional Specialist Modules
                </h4>
                <p className="text-sm text-muted-foreground">
                  Incorporate more AI-driven modules in fields such as
                  Pediatrics, Obstetrics & Gynecology, Psychiatry, and Neurology
                  for broader diagnostic support and guidance.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">
                  NGO & Hospital Integrations
                </h4>
                <p className="text-sm text-muted-foreground">
                  Collaborate with NGOs and hospitals to integrate LUMEN into
                  field operations, enabling real-time reporting and referrals
                  from remote areas to specialized centers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">
                  Offline-First Mobile App
                </h4>
                <p className="text-sm text-muted-foreground">
                  Develop a fully-featured Android app with offline-first
                  capabilities, integrating preloaded emergency protocols,
                  government schemes, and first-aid guidance for even deeper
                  rural penetration.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">
                  Predictive Healthcare Analytics
                </h4>
                <p className="text-sm text-muted-foreground">
                  Leverage patient data and interaction history to provide
                  predictive health risk analytics and early warnings for chronic
                  diseases.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Local Development */}
        <div id="local-development" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Local Development">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">Requirements</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Node 18+, pnpm
                </p>

                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="mb-2"># Install dependencies</div>
                  <div className="mb-2">pnpm install</div>
                  <div className="mb-2"># Start development server</div>
                  <div className="mb-2">
                    pnpm dev # client + server with hot reload on port 8080
                  </div>
                  <div className="mb-2"># Build for production</div>
                  <div className="mb-2">pnpm build # production build</div>
                  <div className="mb-2"># Run production server</div>
                  <div className="mb-2">pnpm start # run the built server</div>
                  <div className="mb-2"># Run tests</div>
                  <div className="mb-2">pnpm test # vitest --run</div>
                  <div className="mb-2"># Type checking</div>
                  <div>pnpm typecheck # tsc</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">
                  Environment Variables
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Example — keep secrets server‑side:
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div># .env (not committed)</div>
                  <div>OPENAI_API_KEY=...</div>
                  <div>VECTOR_DB_URL=...</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* References */}
        <div id="references" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="References (IEEE‑style)">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>
                "Healthcare Access in Rural Communities in India," Ballard
                Brief, 18‑Dec‑2024. Available: Ballard Brief
              </li>
              <li>
                A. P. Ugargol et al., "In search of a fix to the primary health
                care chasm in India," PMC, 2023. PMC
              </li>
              <li>
                A. Nair et al., "Workforce problems at rural public
                health‑centres in India," Human Resources for Health, vol. 19,
                Art. 147, 2022. BioMed Central
              </li>
              <li>
                W. Suraweera et al., "Trends in snakebite deaths in India from
                2000 to 2019," eLife, vol. 9, e54076, 2020. eLifePMC
              </li>
              <li>"Snakebite," Wikipedia, last month. Wikipedia</li>
              <li>
                "India still struggles with rural doctor shortages … doctor,
                nurses, and midwives per 10,000 people," ResearchGate, 2025.
                ResearchGateAxios
              </li>
              <li>
                "Healthcare Access in Rural India," docboxmed.com, 23‑Sep‑2024.
                DocBox
              </li>
              <li>
                "Multiple incidents of snakebites in UP ... approx 50,000
                deaths annually," Times of India, recent. The Times of India
              </li>
              <li>
                "Traditional cure do more harm than good in snakebite cases,"
                Times of India, last month. The Times of India
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </section>
  );
}


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
  onToggle 
}: { 
  currentView: 'userflow' | 'architecture' | 'laymen';
  onToggle: (view: 'userflow' | 'architecture' | 'laymen') => void;
}) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onToggle('userflow')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === 'userflow'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          User Flow Diagram
        </button>
        <button
          onClick={() => onToggle('architecture')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === 'architecture'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          System Architecture Diagram
        </button>
        <button
          onClick={() => onToggle('laymen')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === 'laymen'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
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
  const [diagramView, setDiagramView] = useState<'userflow' | 'architecture' | 'laymen'>('userflow');

  return (
    <section id="technical" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cover Page (non-card) */}
        <div id="cover" className="mt-6 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              LUMEN – Localized Unified Medical Engine for Triage
            </h2>
            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
              A modern, multilingual, AI‑powered healthcare assistant designed for India. LUMEN integrates triage, specialist guidance, PEARL CT reconstruction, lab report analysis, government scheme discovery, emergency education, and specialized women's health modules into a single, accessible product.
            </p>
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ Disclaimer: LUMEN is a research prototype and does not replace professional medical advice.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              {/* View PPT button (to the left of View DOCX) */}
              <a
                href="https://www.canva.com/design/DAGyyT4id88/gHwsLe3XDFYSk5YurzKYwQ/edit?utm_content=DAGyyT4id88&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target="_blank"
                rel="noopener noreferrer"
                className="ppt-button"
              >
                <span>view ppt</span>
              </a>
              <a
                href="https://drive.google.com/file/d/10lJUY1iXO52l9iigFL96m1BYTQ_MfPCQ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="download-button"
              >
                <div className="docs">
                  <span>View DOCX</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <div className="download">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              </a>
              <div className="group relative ml-2">
                <a
                  href="https://github.com/sanchit1606/LUMEN.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </button>
                </a>
                <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                  GitHub
                </span>
              </div>
            </div>
            {/* Scoped styles for the PPT button */}
            <style>
              {`/* From Uiverse.io by barisdogansutcu */ 
              .ppt-button {
                border: none;
                position: relative;
                width: 200px;
                height: 73px;
                padding: 0;
                z-index: 2;
                -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='868' width='2500' viewBox='0 0 726 252.17'%3E%3Cpath d='M483.92 0S481.38 24.71 466 40.11c-11.74 11.74-24.09 12.66-40.26 15.07-9.42 1.41-29.7 3.77-34.81-.79-2.37-2.11-3-21-3.22-27.62-.21-6.92-1.36-16.52-2.82-18-.75 3.06-2.49 11.53-3.09 13.61S378.49 34.3 378 36a85.13 85.13 0 0 0-30.09 0c-.46-1.67-3.17-11.48-3.77-13.56s-2.34-10.55-3.09-13.61c-1.45 1.45-2.61 11.05-2.82 18-.21 6.67-.84 25.51-3.22 27.62-5.11 4.56-25.38 2.2-34.8.79-16.16-2.47-28.51-3.39-40.21-15.13C244.57 24.71 242 0 242 0H0s69.52 22.74 97.52 68.59c16.56 27.11 14.14 58.49 9.92 74.73C170 140 221.46 140 273 158.57c69.23 24.93 83.2 76.19 90 93.6 6.77-17.41 20.75-68.67 90-93.6 51.54-18.56 103-18.59 165.56-15.25-4.21-16.24-6.63-47.62 9.93-74.73C656.43 22.74 726 0 726 0z'/%3E%3C/svg%3E") no-repeat 50% 50%;
                mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='868' width='2500' viewBox='0 0 726 252.17'%3E%3Cpath d='M483.92 0S481.38 24.71 466 40.11c-11.74 11.74-24.09 12.66-40.26 15.07-9.42 1.41-29.7 3.77-34.81-.79-2.37-2.11-3-21-3.22-27.62-.21-6.92-1.36-16.52-2.82-18-.75 3.06-2.49 11.53-3.09 13.61S378.49 34.3 378 36a85.13 85.13 0 0 0-30.09 0c-.46-1.67-3.17-11.48-3.77-13.56s-2.34-10.55-3.09-13.61c-1.45 1.45-2.61 11.05-2.82 18-.21 6.67-.84 25.51-3.22 27.62-5.11 4.56-25.38 2.2-34.8.79-16.16-2.47-28.51-3.39-40.21-15.13C244.57 24.71 242 0 242 0H0s69.52 22.74 97.52 68.59c16.56 27.11 14.14 58.49 9.92 74.73C170 140 221.46 140 273 158.57c69.23 24.93 83.2 76.19 90 93.6 6.77-17.41 20.75-68.67 90-93.6 51.54-18.56 103-18.59 165.56-15.25-4.21-16.24-6.63-47.62 9.93-74.73C656.43 22.74 726 0 726 0z'/%3E%3C/svg%3E") no-repeat 50% 50%;
                -webkit-mask-size: 100%;
                cursor: pointer;
                background-color: transparent;
                transform: translateY(8px)
              }

              .ppt-button:after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                box-shadow: 0px 0 0 0 white;
                transition: all 2s ease;
              }

              .ppt-button:hover:after {
                box-shadow: 0px -13px 56px 12px #ffffffa6;
              }

              .ppt-button span {
                position: absolute;
                width: 100%;
                font-size: 15px;
                font-weight: 100;
                left: 50%;
                top: 39%;
                letter-spacing: 3px;
                text-align: center;
                transform: translate(-50%,-50%);
                color: black;
                transition: all 2s ease;
              }

              .ppt-button:hover span {
                color: white;
              }

              .ppt-button:before {
                content: '';
                position: absolute;
                width: 0;
                height: 100%;
                background-color: black;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                transition: all 1s ease;
              }

              .ppt-button:hover:before {
                width: 100%;
              }
            `}
            </style>
            <style>
              {`/* From Uiverse.io by barisdogansutcu */
              .download-button {
                position: relative;
                border-width: 0;
                color: white;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                border-radius: 4px;
                z-index: 1;
              }

              .download-button .docs {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                min-height: 40px;
                padding: 0 10px;
                border-radius: 4px;
                z-index: 1;
                background-color: #242a35;
                border: solid 1px #e8e8e82d;
                transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
              }

              .download-button:hover {
                box-shadow:
                  rgba(0, 0, 0, 0.25) 0px 54px 55px,
                  rgba(0, 0, 0, 0.12) 0px -12px 30px,
                  rgba(0, 0, 0, 0.12) 0px 4px 6px,
                  rgba(0, 0, 0, 0.17) 0px 12px 13px,
                  rgba(0, 0, 0, 0.09) 0px -3px 5px;
              }

              .download {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                max-width: 90%;
                margin: 0 auto;
                z-index: -1;
                border-radius: 4px;
                transform: translateY(0%);
                background-color: #01e056;
                border: solid 1px #01e0572d;
                transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
              }

              .download-button:hover .download {
                transform: translateY(100%);
              }

              .download svg polyline,
              .download svg line {
                animation: docs 1s infinite;
              }

              @keyframes docs {
                0% {
                  transform: translateY(0%);
                }

                50% {
                  transform: translateY(-15%);
                }

                100% {
                  transform: translateY(0%);
                }
              }`}
            </style>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 bg-secondary/40">
              <div className="text-xs text-muted-foreground">Institution</div>
              <div className="font-medium">
                Vishwakarma Institute of Technology, Pune
              </div>
              <div className="text-sm">
                Department of Computer Engineering & IT
              </div>
            </div>
            <div className="rounded-lg border p-3 bg-secondary/40">
              <div className="font-medium">Team LUMEN</div>
              <ul className="mt-1 list-disc pl-5 text-sm">
                <li>Sanchit Nipanikar</li>
                <li>Priyal Patange</li>
                <li>Paras Patil</li>
                <li>Kshitij Kalrao</li>
              </ul>
            </div>
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
                <a href="#solution" className="text-brand-blue underline">
                  Proposed Solution
                </a>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li><a href="#normal-features" className="text-brand-blue underline">Normal Features</a></li>
                  <li><a href="#unique-differentiators" className="text-brand-blue underline">Unique Differentiators</a></li>
                </ol>
              </li>
              <li>
                <a href="#openai" className="text-brand-blue underline">
                  Role of OpenAI Tools
                </a>
              </li>
              <li>
                <a href="#techstack" className="text-brand-blue underline">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-brand-blue underline">
                  User Flow & System Architecture
                </a>
              </li>
              <li>
                <a href="#feasibility" className="text-brand-blue underline">
                  Feasibility
                </a>
              </li>
              <li>
                <a href="#novelty" className="text-brand-blue underline">
                  Novelty
                </a>
              </li>
              <li>
                <a href="#impact" className="text-brand-blue underline">
                  Impact & Benefits
                </a>
              </li>
              <li>
                <a href="#future" className="text-brand-blue underline">
                  Future Scope
                </a>
              </li>
              <li>
                <a href="#local-development" className="text-brand-blue underline">
                  Local Development
                </a>
              </li>
              <li>
                <a href="#references" className="text-brand-blue underline">
                  References (IEEE‑style)
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
                How do we ensure that rural women and families get timely, affordable, and reliable healthcare? Why are preventable deaths still common in villages despite government schemes and technology progress?
              </p>
              <p>
                India's rural healthcare system faces critical gaps that result in preventable deaths, untreated conditions, and rising costs.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-base mb-2">Limited Access & Workforce Shortage</div>
              <ul className="list-disc pl-5 space-y-1">
                    <li>Over 900 million rural residents (65% of the population) face inadequate infrastructure, with 16% fewer PHCs and 50% fewer CHCs than required</li>
                    <li>Shortages are severe: 8% PHCs lack doctors, 38% lack lab technicians, and workforce density is 20.6 per 10,000, far below the WHO norm of 44.5</li>
                    <li>Doctor/nurse/midwife density is 20.6 per 10,000 vs WHO recommendation 44.5 per 10,000</li>
              </ul>
                </div>

                <div>
                  <div className="font-semibold text-base mb-2">Emergency Care Deficiencies</div>
              <ul className="list-disc pl-5 space-y-1">
                    <li>Snakebites alone cause 58,000 deaths annually, 70% in rural areas where delays and lack of first-aid knowledge prevail</li>
                    <li>Many victims first turn to traditional healers, worsening outcomes</li>
              </ul>
              </div>

                <div>
                  <div className="font-semibold text-base mb-2">Women's Health & Menstrual Hygiene Gaps</div>
              <ul className="list-disc pl-5 space-y-1">
                    <li>Disorders like PCOS (6–10% prevalence) and endometriosis remain underdiagnosed, with low awareness in rural India</li>
                    <li>Only 42–43% of adolescent girls use hygienic menstrual products; poor practices increase risk of infections</li>
                    <li>Stigma and taboos limit discussion and treatment, while awareness of government schemes like MHS and Jan Aushadhi remains low, adding travel and wage-loss costs for women</li>
              </ul>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
                  <p className="text-red-800 font-medium">
                    These gaps result in avoidable morbidity, mortality, and economic strain, while existing policies remain fragmented and underutilized. A holistic, context-aware intervention is urgently needed.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>


        {/* Proposed Solution */}
        <div id="architecture" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Proposed Solution">
            <div className="space-y-3">
              
              <DiagramToggle 
                currentView={diagramView} 
                onToggle={setDiagramView} 
              />
              
              {diagramView === 'userflow' ? (
                <div>
                  <h4 className="font-semibold mb-3 text-center">User Flow Diagram</h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    The user flow diagram illustrates the complete journey from user interaction to system output:
                  </p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span><strong>User Input:</strong> Rural patients or health workers submit symptoms, lab reports, CT scans, or emergency requests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span><strong>Frontend Processing:</strong> React/Next.js interface handles multilingual input and file uploads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span><strong>API Gateway:</strong> FastAPI routes requests to appropriate AI/ML modules with security validation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span><strong>AI/ML Processing:</strong> Specialized modules process different types of medical data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span><strong>Data Storage:</strong> Results stored in PostgreSQL, Redis cache, Vector DB, and S3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span><strong>Output Generation:</strong> System delivers triage results, medical summaries, and guidance in multiple formats</span>
                    </div>
                  </div>
              <ZoomableImage
                    src="/user-flow-diagram.png"
                    alt="LUMEN User Flow Diagram"
                  />
                </div>
              ) : diagramView === 'architecture' ? (
                <div>
                  <h4 className="font-semibold mb-3 text-center">System Architecture Diagram</h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Comprehensive system architecture showing all components and their interactions:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <h5 className="font-semibold mb-2">Core Components</h5>
                      <ul className="space-y-1">
                        <li><strong>Frontend:</strong> React + Next.js with multilingual support</li>
                        <li><strong>API Gateway:</strong> FastAPI with JWT authentication</li>
                        <li><strong>AI/ML Core:</strong> GPT-4o, Whisper, PEARL CT, Specialist modules</li>
                        <li><strong>Databases:</strong> PostgreSQL, Redis, Vector DB, AWS S3</li>
                        <li><strong>Security:</strong> End-to-end encryption, HIPAA/GDPR compliance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Data Flow</h5>
                      <ol className="space-y-1 list-decimal list-inside">
                        <li>User Input → Frontend processes multimodal input</li>
                        <li>API Gateway → Routes requests with security validation</li>
                        <li>AI/ML Core → Processes data using specialized models</li>
                        <li>Databases → Stores results and retrieves context</li>
                        <li>Output Generation → Delivers results in multiple formats</li>
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
                  <h4 className="font-semibold mb-3 text-center">Laymen Terms Diagram</h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Simplified system overview showing how LUMEN processes user input through various modules to generate outputs:
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
                        <div className="font-semibold">Symptoms‑Based Diagnosis & Guidance</div>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Accepts multimodal inputs (text/audio/image)</li>
                          <li>• Analyzes symptoms with severity categorization (Green/Yellow/Red)</li>
                          <li>• Clear next-step guidance in voice, text, and visual formats</li>
                        </ul>
                    </div>
                  </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Cpu className="text-brand-blue mt-1" />
                  <div>
                        <div className="font-semibold">AI Specialist Modules</div>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Dermatology, Radiology, Cardiology diagnostic suggestions</li>
                          <li>• Patient-friendly advice and clinician-level summaries</li>
                        </ul>
                  </div>
                </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Languages className="text-brand-blue mt-1" />
                  <div>
                        <div className="font-semibold">Multilingual Voice‑First Chatbot</div>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Supports five Indian languages</li>
                          <li>• Uses Whisper for ASR and GPT for natural explanations</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Unique Differentiator Features</h4>
              <div className="space-y-4">
                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                  <Activity className="text-brand-teal" />
                      PEARL Integration - Personalized Estimated Anatomic Reconstruction & Lifecare
                  </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Hybrid CT reconstruction engine combining geometry-aware modeling (PerX2CT), diffusion refinement (XctDiff), and NeRF detail polishing (SAX-NeRF)</li>
                      <li>• Generates estimated CT volumes with voxel-level uncertainty, enabling safer, lower-dose imaging for follow-up</li>
                    </ul>
                </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                  <FlaskConical className="text-brand-teal" />
                      Lab Report Analyzer & Follow‑Up Generator
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Parses uploaded lab reports (PDF/image), compares values with age- and sex-specific reference ranges</li>
                      <li>• Flags abnormalities and generates simple explanations with diet/lifestyle advice</li>
                      <li>• <strong>Example:</strong> 30-year-old female, Hemoglobin 9.8 g/dL → "Your blood count is lower than normal, which may cause tiredness. Eat iron-rich foods such as spinach, dal, jaggery, and vitamin C fruits."</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                  <Landmark className="text-brand-teal" />
                      Government Schemes & Benefits Assistant
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Retrieves up-to-date national and state health schemes from knowledge base</li>
                      <li>• Explains eligibility + steps in local language</li>
                      <li>• <strong>Example:</strong> "My father in Uttar Pradesh needs dialysis" → "Yes. Under Ayushman Bharat – PMJAY and the UP State Health Scheme, eligible patients get free dialysis at government hospitals."</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                  <BadgeAlert className="text-cta" />
                      Preliminary Triage & Emergency Education
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Step-by-step, life-saving instructions for common emergencies (snakebite, drowning, burns, electric shock)</li>
                      <li>• Clear voice, text, and visual guidance in local language</li>
                      <li>• <strong>Example:</strong> "A child has stopped breathing after drowning" → "Call for emergency help immediately. Lay the child flat, check breathing. If not breathing, start CPR: 30 chest compressions, 2 rescue breaths."</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                    <div className="font-semibold flex items-center gap-2 mb-2">
                      <Stethoscope className="text-pink-600" />
                      GynaeCare - Specialized Women's Health Module
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Symptom Screening & Awareness:</strong> Private Q&A to flag possible issues like PCOD/PCOS and Endometriosis</li>
                      <li>• <strong>Guided Next Steps:</strong> Early red-flag alerts and low-cost self-care tips</li>
                      <li>• <strong>Sanitation & Hygiene Education:</strong> Safe use of cloth pads, menstrual cups, biodegradable pads with proper disposal methods</li>
                      <li>• <strong>Govt Schemes & Support:</strong> Links to Jan Aushadhi, Menstrual Hygiene Scheme (MHS), and connects users with local ASHA/anganwadi workers</li>
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
                        <td className="px-3 py-2 align-top">Symptom Triage & Guidance</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">Provides empathetic triage and severity classification from patient symptoms</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">AI Specialist Summaries</td>
                        <td className="px-3 py-2 align-top">gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">Summarizes AI-ML Model outputs into doctor-style report</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Lab Report Analyzer</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">Interprets OCR lab values and explains results in patient-friendly terms</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Govt Schemes Assistant</td>
                        <td className="px-3 py-2 align-top">text-embedding-3-small + gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">Retrieves and explains govt health scheme eligibility in simple language.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Emergency Protocols</td>
                        <td className="px-3 py-2 align-top">gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">Gives fast, step-by-step emergency medical instructions.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Voice Input (ASR)</td>
                        <td className="px-3 py-2 align-top">whisper-1</td>
                        <td className="px-3 py-2 align-top">Converts patient speech to text for symptom entry</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Voice Output (TTS)</td>
                        <td className="px-3 py-2 align-top">gpt-4o-audio / Azure TTS</td>
                        <td className="px-3 py-2 align-top">Delivers AI responses as a natural voice for accessibility.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Chatbot</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">Provides 24/7 conversational support, guiding users across triage, lab results, schemes, and emergencies</td>
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
                <h4 className="font-semibold text-lg">Detailed Technology Breakdown</h4>
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
                        <td className="px-3 py-2 align-top font-medium">Frontend</td>
                        <td className="px-3 py-2 align-top">React (TypeScript), Next.js, Tailwind CSS</td>
                        <td className="px-3 py-2 align-top">Multilingual, responsive web UI for symptom input, lab uploads, CT viewing, chatbot; SSR for speed & SEO</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Backend</td>
                        <td className="px-3 py-2 align-top">FastAPI</td>
                        <td className="px-3 py-2 align-top">High-performance backend framework; implements REST API endpoints for frontend and AI/ML model communication</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Primary DB</td>
                        <td className="px-3 py-2 align-top">PostgreSQL</td>
                        <td className="px-3 py-2 align-top">Stores user profiles, triage history, lab values, CT metadata, government scheme eligibility</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Cache</td>
                        <td className="px-3 py-2 align-top">Redis</td>
                        <td className="px-3 py-2 align-top">Session caching, language translation caching</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Vector DB</td>
                        <td className="px-3 py-2 align-top">Pinecone</td>
                        <td className="px-3 py-2 align-top">Fully managed vector database for semantic search and embeddings of medical protocols and government schemes</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Object Storage</td>
                        <td className="px-3 py-2 align-top">AWS S3</td>
                        <td className="px-3 py-2 align-top">Scalable, secure storage for CT scans, lab reports, medical images; HIPAA/GDPR compliant</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">AI/ML Core</td>
                        <td className="px-3 py-2 align-top">PyTorch, Hugging Face Transformers, OpenAI APIs (GPT-4o, Whisper, DALL·E)</td>
                        <td className="px-3 py-2 align-top">Hosts AI models (e.g., PEARL CT, dermatology AI) and supports language and vision tasks via OpenAI</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Security</td>
                        <td className="px-3 py-2 align-top">JWT, OAuth2</td>
                        <td className="px-3 py-2 align-top">Authentication and authorization mechanisms</td>
                    </tr>
                    <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Infrastructure & Deploy</td>
                        <td className="px-3 py-2 align-top">Docker, Kubernetes (K8s) on AWS/GCP/Azure, CDN</td>
                        <td className="px-3 py-2 align-top">Containerized deployment, GPU-enabled nodes for AI, CDN for frontend assets delivery</td>
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
                      <li>Prototype: Hugging Face free models (Indic-GPT, Donut, Whisper-small).</li>
                      <li>Production: OpenAI APIs (GPT-4o, Whisper, DALL·E) + custom PEARL CT pipeline.</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Infrastructure:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Frontend: React + Tailwind CSS.</li>
                      <li>Backend: FastAPI (Python) with Docker.</li>
                      <li>Deployment: Netlify (frontend), AWS/GCP (production).</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Existing technologies are sufficient. Only CT reconstruction pipeline requires GPU resources, which are available on cloud platforms.</p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.2 Operational Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Problem Fit:</div>
                    <p>Addresses rural healthcare gaps (900M+ residents), triage delays, and lab follow-up inefficiencies.</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Ease of Operation:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Multilingual voice-first chatbot lowers digital literacy barriers.</li>
                      <li>Offline-first design ensures use even in low-connectivity areas.</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Operationally feasible, since workflows mirror real-world healthcare interactions (symptom → guidance → follow-up).</p>
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
                    <p>API usage (OpenAI GPT, Whisper), GPU compute (CT), and storage (AWS S3).</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">ROI:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reducing preventable deaths (e.g., 58,000 annual snakebite fatalities).</li>
                      <li>Saving costs from unnecessary clinic visits & repeated CT scans.</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Strong cost-benefit justification; socially impactful and scalable.</p>
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
                  <p className="mt-2">Assessment: Legally feasible with proper compliance in production; no major barriers.</p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.5 Market Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Target Users:</div>
                    <p>900M+ rural/semi-urban Indians lacking timely healthcare.</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Market Trend:</div>
                    <p>Rising smartphone penetration (67%+ rural households with access).</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Competition:</div>
                    <p>Existing health apps (Practo, 1mg) focus on urban users; none combine triage + lab reports + CT + schemes in one system.</p>
                  </div>
                  <p className="mt-2">Assessment: High demand, underserved market, unique positioning.</p>
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
                  Comparison showing how LUMEN differs from traditional healthcare systems and existing solutions.
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
                        <td className="px-3 py-2 align-top font-medium">CT Imaging</td>
                        <td className="px-3 py-2 align-top">Hospital CT scans (₹4,000–₹6,000); no AI low-dose alternatives</td>
                        <td className="px-3 py-2 align-top">PEARL CT: Low-dose AI reconstruction with uncertainty maps → safer & cheaper follow-ups</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Lab Report Analysis</td>
                        <td className="px-3 py-2 align-top">1mg, Apollo 24/7 show raw values only</td>
                        <td className="px-3 py-2 align-top">AI Analyzer: Flags abnormalities + gives lifestyle/diet advice in simple local language</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Government Schemes Access</td>
                        <td className="px-3 py-2 align-top">Info scattered on portals (Ayushman Bharat website, state portals)</td>
                        <td className="px-3 py-2 align-top">Integrated Assistant: Explains eligibility + steps in voice/text for each patient's condition</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Emergency Education</td>
                        <td className="px-3 py-2 align-top">Missing in health apps; patients rely on hearsay or healers</td>
                        <td className="px-3 py-2 align-top">Built-in Protocols: CPR, snakebite, burns → step-by-step local language guidance</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Women's Health (LUMEN GynaeCare)</td>
                        <td className="px-3 py-2 align-top">Flo, Clue (cycle tracking); Practo (urban gyne consults); NGOs like Goonj (hygiene awareness). Each addresses only one aspect</td>
                        <td className="px-3 py-2 align-top">Integrated GynaeCare: Private symptom screening (PCOD, endometriosis) + hygiene education (safe pad use, disposal) + govt scheme linkage (MHS, Jan Aushadhi) → all in one, voice-first & rural-friendly</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top font-medium">Costing</td>
                        <td className="px-3 py-2 align-top">Doctor visit: ₹300–₹500, travel to city hospital: ₹800–₹1,500, CT scan: ₹4,000–₹6,000, follow-ups ~₹1,000</td>
                        <td className="px-3 py-2 align-top">Cuts costs by 50–70% through local AI triage, fewer city visits, and reduced repeat scans</td>
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
                <h4 className="font-semibold text-lg mb-4">Quantitative Benefits</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="font-semibold text-green-800 mb-2">Reduction in Preventable Morbidity and Mortality</div>
                    <p className="text-sm text-green-700">
                      By providing immediate symptom-based triage, emergency education, and guidance, LUMEN aims to significantly reduce the 58,000 annual deaths from snakebites and other emergencies in rural India.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="font-semibold text-blue-800 mb-2">Cost Savings for Patients</div>
                    <p className="text-sm text-blue-700">
                      Early and accurate triage can help avoid 20–30% unnecessary hospital visits and repeat CT scans. Since a single CT costs ₹3,000–₹8,000 and a hospital visit costs ₹500–₹2,000, this translates to an average saving of ₹1,200–₹2,800 ($50–$200) per patient.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <div className="font-semibold text-purple-800 mb-2">Improved Diagnostic Efficiency</div>
                    <p className="text-sm text-purple-700">
                      Automated analysis of lab reports and specialist modules can reduce diagnostic delays from 2–7 days down to under 1 hour (98% faster turnaround). This efficiency also frees up doctors' time, enabling them to see 2–3 additional patients per hour and reducing complication-related treatment costs by 15–20% in time-sensitive conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Potential Beneficiaries</h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2">Rural and Semi-Urban Populations</div>
                    <p className="text-sm text-muted-foreground">Over 900 million residents with limited access to qualified medical professionals</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2">Primary Health Centers (PHCs) & Community Health Centers (CHCs)</div>
                    <p className="text-sm text-muted-foreground">Equipped with decision support for frontline healthcare workers</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold mb-2">Government Health Schemes Beneficiaries</div>
                    <p className="text-sm text-muted-foreground">Increased awareness and access to schemes like Ayushman Bharat, ensuring eligible patients receive entitled benefits</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Awareness & Accessibility Gains</h4>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="font-semibold mb-2">Multilingual, Voice-First Interface</div>
                    <p className="text-sm text-muted-foreground">Supports five Indian languages, enabling accessibility for illiterate or non-English-speaking users</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="font-semibold mb-2">Awareness of Government Schemes</div>
                    <p className="text-sm text-muted-foreground">Reduces the knowledge gap regarding available health benefits, empowering users to claim entitlements without intermediary assistance</p>
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
                <h4 className="font-semibold text-lg mb-3">Language Expansion</h4>
                <p className="text-sm text-muted-foreground">
                  Extend support to more Indian regional languages and dialects to further improve inclusivity and reach across diverse linguistic regions of India.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">Additional Specialist Modules</h4>
                <p className="text-sm text-muted-foreground">
                  Incorporate more AI-driven modules in fields such as Pediatrics, Obstetrics & Gynecology, Psychiatry, and Neurology for broader diagnostic support and guidance.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">NGO & Hospital Integrations</h4>
                <p className="text-sm text-muted-foreground">
                  Collaborate with NGOs and hospitals to integrate LUMEN into field operations, enabling real-time reporting and referrals from remote areas to specialized centers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">Offline-First Mobile App</h4>
                <p className="text-sm text-muted-foreground">
                  Develop a fully-featured Android app with offline-first capabilities, integrating preloaded emergency protocols, government schemes, and first-aid guidance for even deeper rural penetration.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">Predictive Healthcare Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Leverage patient data and interaction history to provide predictive health risk analytics and early warnings for chronic diseases.
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
                <p className="text-sm text-muted-foreground mb-4">Node 18+, pnpm</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="mb-2"># Install dependencies</div>
                  <div className="mb-2">pnpm install</div>
                  <div className="mb-2"># Start development server</div>
                  <div className="mb-2">pnpm dev          # client + server with hot reload on port 8080</div>
                  <div className="mb-2"># Build for production</div>
                  <div className="mb-2">pnpm build        # production build</div>
                  <div className="mb-2"># Run production server</div>
                  <div className="mb-2">pnpm start        # run the built server</div>
                  <div className="mb-2"># Run tests</div>
                  <div className="mb-2">pnpm test         # vitest --run</div>
                  <div className="mb-2"># Type checking</div>
                  <div>pnpm typecheck    # tsc</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">Environment Variables</h4>
                <p className="text-sm text-muted-foreground mb-2">Example — keep secrets server‑side:</p>
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
                "Healthcare Access in Rural Communities in India," Ballard Brief, 18‑Dec‑2024. Available: Ballard Brief
              </li>
              <li>
                A. P. Ugargol et al., "In search of a fix to the primary health care chasm in India," PMC, 2023. PMC
              </li>
              <li>
                A. Nair et al., "Workforce problems at rural public health‑centres in India," Human Resources for Health, vol. 19, Art. 147, 2022. BioMed Central
              </li>
              <li>
                W. Suraweera et al., "Trends in snakebite deaths in India from 2000 to 2019," eLife, vol. 9, e54076, 2020. eLifePMC
              </li>
              <li>"Snakebite," Wikipedia, last month. Wikipedia</li>
              <li>
                "India still struggles with rural doctor shortages … doctor, nurses, and midwives per 10,000 people," ResearchGate, 2025. ResearchGateAxios
              </li>
              <li>
                "Healthcare Access in Rural India," docboxmed.com, 23‑Sep‑2024. DocBox
              </li>
              <li>
                "Multiple incidents of snakebites in UP ... approx 50,000 deaths annually," Times of India, recent. The Times of India
              </li>
              <li>
                "Traditional cure do more harm than good in snakebite cases," Times of India, last month. The Times of India
              </li>
            </ol>
          </Card>
        </div>
      </div>
      </section>
    );
  }
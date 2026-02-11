import React from "react";
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/ui/dock";
import { Github, Linkedin, Globe, Home } from "lucide-react";
import DocumentationContent from "@/components/documentation/Technical";

const DocumentationPage = () => {
  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <main className="pt-24 relative z-10">
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center video-text">
              Technical Documentation
            </h1>
            <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
              Deep dive into architecture, workflows, and implementation notes
              for Scholaris DAO.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="spinner" />
            </div>
            <style>
              {`/* From Uiverse.io by satyamchaudharydev */
              .spinner {
               --size: 30px;
               --first-block-clr: #005bba;
               --second-block-clr: #fed500;
               --clr: #111;
               width: 100px;
               height: 100px;
               position: relative;
              }

              .spinner::after,.spinner::before {
               box-sizing: border-box;
               position: absolute;
               content: "";
               width: var(--size);
               height: var(--size);
               top: 50%;
               animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
               left: 50%;
               background: var(--first-block-clr);
              }

              .spinner::after {
               background: var(--second-block-clr);
               top: calc(50% - var(--size));
               left: calc(50% - var(--size));
               animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
              }

              @keyframes down {
               0%, 100% {
                transform: none;
               }

               25% {
                transform: translateX(100%);
               }

               50% {
                transform: translateX(100%) translateY(100%);
               }

               75% {
                transform: translateY(100%);
               }
              }

              @keyframes up {
               0%, 100% {
                transform: none;
               }

               25% {
                transform: translateX(-100%);
               }

               50% {
                transform: translateX(-100%) translateY(-100%);
               }

               75% {
                transform: translateY(-100%);
               }
              }`}
            </style>
          </div>
        </section>

        {/* Full technical-style content reused from previous project */}
        <DocumentationContent />
      </main>

      {/* Fixed bottom-center Dock on Documentation page */}
      <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-screen-2xl -translate-x-1/2 pointer-events-none">
        <div className="flex justify-center pointer-events-auto">
          <div className="w-auto">
            <Dock>
              <DockItem>
                <DockIcon>
                  <a href="/" target="_self" rel="noreferrer">
                    <Home className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </a>
                </DockIcon>
                <DockLabel>Home</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <a
                    href="https://github.com/sanchit1606"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </a>
                </DockIcon>
                <DockLabel>GitHub</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <a
                    href="https://www.linkedin.com/in/sanchit1606"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </a>
                </DockIcon>
                <DockLabel>LinkedIn</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <a
                    href="https://portfolio-three-silk-62.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Globe className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </a>
                </DockIcon>
                <DockLabel>Portfolio</DockLabel>
              </DockItem>
            </Dock>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;

import React from "react";
import { Home, Wallet, Sparkles } from "lucide-react";
import { useWalletStore } from "@/stores/walletStore";
import { cn } from "@/lib/utils";
import DocumentationContent from "@/components/documentation/Technical";

const AuroraLayer = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div
      className={cn(
        `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
        [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
        [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
        [background-image:var(--white-gradient),var(--aurora)]
        dark:[background-image:var(--dark-gradient),var(--aurora)]
        [background-size:300%,_200%]
        [background-position:50%_50%,50%_50%]
        filter blur-[10px] invert dark:invert-0
        after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
        after:dark:[background-image:var(--dark-gradient),var(--aurora)]
        after:[background-size:200%,_100%]
        after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
        absolute -inset-[10px] opacity-30 will-change-transform
        [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
      )}
    />
  </div>
);

const DocumentationPage = () => {
  const { setShowConnectModal } = useWalletStore();

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Aurora neon background effect */}
      <AuroraLayer />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: spacer for balance */}
            <div className="flex-1" />

            {/* Center: Title + Home */}
            <div className="flex items-center gap-3">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                Scholaris DAO
              </span>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Home</span>
              </a>
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <a
                href="/#features"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Sparkles size={16} />
                <span className="hidden sm:inline">Explore Features</span>
              </a>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
                onClick={() => setShowConnectModal(true)}
              >
                <Wallet size={16} />
                <span className="hidden sm:inline">Connect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </header>

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

        {/* Full technical-style content */}
        <DocumentationContent />
      </main>
    </div>
  );
};

export default DocumentationPage;

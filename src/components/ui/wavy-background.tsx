 "use client";
 import { cn } from "@/lib/utils";
 import React, { useEffect, useRef, useState } from "react";
 import { createNoise3D } from "simplex-noise";

 export const WavyBackground = ({
   children,
   className,
   containerClassName,
   colors,
   waveWidth,
   backgroundFill,
   blur = 10,
   speed = "fast",
  moveWithScroll,
  parallax = 0.5,
   waveOpacity = 0.5,
   ...props
 }: {
   children?: any;
   className?: string;
   containerClassName?: string;
   colors?: string[];
   waveWidth?: number;
   backgroundFill?: string;
   blur?: number;
   speed?: "slow" | "fast";
  moveWithScroll?: boolean;
  parallax?: number;
   waveOpacity?: number;
   [key: string]: any;
 }) => {
   const noise = createNoise3D();
   let w: number,
     h: number,
     nt: number,
     i: number,
     x: number,
     ctx: any,
     canvas: any;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollOffsetRef = useRef(0);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const getSpeed = () => {
     switch (speed) {
       case "slow":
         return 0.001;
       case "fast":
         return 0.002;
       default:
         return 0.001;
     }
   };

   const init = () => {
     canvas = canvasRef.current;
     if (!canvas) return;
     ctx = canvas.getContext("2d");
     if (!ctx) return;
    // size canvas to viewport so waveform stays centered in the visible screen
    w = (ctx.canvas.width = window.innerWidth);
    h = (ctx.canvas.height = window.innerHeight);
     ctx.filter = `blur(${blur}px)`;
     nt = 0;
     window.onresize = function () {
      w = (ctx.canvas.width = window.innerWidth);
      h = (ctx.canvas.height = window.innerHeight);
       ctx.filter = `blur(${blur}px)`;
     };
    // listen to scroll for parallax effect
    const onScroll = () => {
      scrollOffsetRef.current = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    render();
    // cleanup will remove listener in effect cleanup
   };

   const waveColors = colors ?? [
     "#38bdf8",
     "#818cf8",
     "#c084fc",
     "#e879f9",
     "#22d3ee",
   ];
   const drawWave = (n: number) => {
     nt += getSpeed();
     const offset = moveWithScroll ? (scrollOffsetRef.current ?? 0) * parallax : 0;
     // keep waveform visually centered in the viewport by default
     const baselineY = (window.innerHeight || (h * 0.5)) * 0.5 * 2 ? window.innerHeight * 0.5 + offset : h * 0.5 + offset;
     for (i = 0; i < n; i++) {
       ctx.beginPath();
       ctx.lineWidth = waveWidth || 50;
       ctx.strokeStyle = waveColors[i % waveColors.length];
       for (x = 0; x < w; x += 5) {
         var y = noise(x / 800, 0.3 * i, nt) * 100;
         ctx.lineTo(x, y + (window.innerHeight ? window.innerHeight * 0.5 : h * 0.5) + offset);
       }
       ctx.stroke();
       ctx.closePath();
     }
   };

   let animationId: number;
   const render = () => {
    ctx.fillStyle = backgroundFill || "black";
     ctx.globalAlpha = waveOpacity || 0.5;
     ctx.fillRect(0, 0, w, h);
     drawWave(5);
     animationId = requestAnimationFrame(render);
   };

   useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", () => {
        /* removed in init via named handler; noop here */
      });
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [isSafari, setIsSafari] = useState(false);
   useEffect(() => {
     setIsSafari(
       typeof window !== "undefined" &&
         navigator.userAgent.includes("Safari") &&
         !navigator.userAgent.includes("Chrome")
     );
   }, []);

   return (
    <div
      ref={containerRef}
       className={cn(
         "h-screen flex flex-col items-center justify-center",
         containerClassName
       )}
     >
    <canvas
        className="fixed inset-0 z-0 pointer-events-none"
         ref={canvasRef}
         id="canvas"
         style={{
           ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
         }}
       ></canvas>
       <div className={cn("relative z-10", className)} {...props}>
         {children}
       </div>
     </div>
   );
 };


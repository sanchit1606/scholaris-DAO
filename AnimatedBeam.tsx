import React from "react";

// Lightweight stub so Technical.tsx can render without additional complexity.
// In the original project this draws animated SVG beams between elements.

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  curvature?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
}

export function AnimatedBeam(_props: AnimatedBeamProps) {
  return null;
}



import React, { useState, useRef } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    setScale((prev) => {
      const next = prev + delta * 0.0015;
      return Math.min(Math.max(next, 0.6), 2);
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
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-2 text-xs">
        <button
          className="btn-secondary-glass px-2 py-1"
          onClick={() => setScale((s) => Math.min(s + 0.15, 2))}
        >
          +
        </button>
        <button
          className="btn-secondary-glass px-2 py-1"
          onClick={() => setScale((s) => Math.max(s - 0.15, 0.6))}
        >
          −
        </button>
        <button
          className="btn-secondary-glass px-3 py-1"
          onClick={resetView}
        >
          Reset
        </button>
      </div>

      <div
        className="relative h-[260px] sm:h-[320px] overflow-hidden rounded-xl border border-border bg-background"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img
          src={src}
          alt={alt}
          className="absolute left-1/2 top-1/2 max-w-none"
          style={{
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
}



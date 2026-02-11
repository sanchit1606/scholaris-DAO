import React, { useCallback, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function ZoomableImage({ src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  const clampScale = (s: number) => Math.min(6, Math.max(1, s));

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    const mx = e.clientX - (rect?.left ?? 0);
    const my = e.clientY - (rect?.top ?? 0);
    const delta = -e.deltaY * 0.0015;
    const newScale = clampScale(scale * (1 + delta));
    // Zoom towards cursor
    const k = newScale / scale;
    setPos({ x: mx - k * (mx - pos.x), y: my - k * (my - pos.y) });
    setScale(newScale);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDrag({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag) return;
    setPos({ x: e.clientX - drag.x, y: e.clientY - drag.y });
  };
  const onMouseUp = () => setDrag(null);
  const onMouseLeave = () => setDrag(null);

  const zoomIn = () => setScale((s) => clampScale(s * 1.25));
  const zoomOut = () => setScale((s) => clampScale(s / 1.25));
  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const onDblClick = useCallback(() => {
    if (scale !== 1) reset();
    else setScale(2);
  }, [scale]);

  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button
          onClick={zoomOut}
          className="px-2 py-1 rounded-md bg-white/80 shadow-sm border hover:bg-white"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          className="px-2 py-1 rounded-md bg-white/80 shadow-sm border hover:bg-white"
        >
          +
        </button>
        <button
          onClick={reset}
          className="px-2 py-1 rounded-md bg-white/80 shadow-sm border hover:bg-white"
        >
          Reset
        </button>
      </div>
      <div
        ref={containerRef}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onDoubleClick={onDblClick}
        className="relative w-full overflow-hidden rounded-xl border bg-white cursor-grab active:cursor-grabbing"
        style={{ minHeight: "300px", maxHeight: "600px" }}
      >
        <img
          src={src}
          alt={alt}
          className="select-none will-change-transform w-full h-auto max-w-full"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
          loading="lazy"
        />
      </div>
    </div>
  );
}


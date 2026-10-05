"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CrystalScene = dynamic(() => import("./CrystalScene"), { ssr: false });

function webglOK() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

/** Static SVG crystal. Used on phones, with reduced motion, or when WebGL is unavailable. */
function StaticCrystal() {
  return (
    <svg viewBox="0 0 400 520" className="h-full w-full" role="img" aria-label="Faceted gold-lit crystal">
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#d8be8c" stopOpacity=".35" /><stop offset="1" stopColor="#d8be8c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="f1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a332a" /><stop offset="1" stopColor="#12100e" /></linearGradient>
        <linearGradient id="f2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a7247" /><stop offset="1" stopColor="#1a1714" /></linearGradient>
      </defs>
      <circle cx="200" cy="250" r="190" fill="url(#glow)" />
      <g stroke="#d8be8c" strokeOpacity=".65" strokeWidth="1">
        <polygon points="200,40 290,170 200,230" fill="url(#f2)" />
        <polygon points="200,40 110,180 200,230" fill="url(#f1)" />
        <polygon points="290,170 320,330 200,230" fill="url(#f1)" />
        <polygon points="110,180 80,320 200,230" fill="url(#f2)" opacity=".85" />
        <polygon points="80,320 200,230 210,470" fill="url(#f1)" />
        <polygon points="320,330 200,230 210,470" fill="url(#f2)" opacity=".9" />
      </g>
      <ellipse cx="200" cy="250" rx="175" ry="52" fill="none" stroke="#d8be8c" strokeOpacity=".6" transform="rotate(-18 200 250)" />
    </svg>
  );
}

export default function HeroVisual({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const box = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(small || reduce || !webglOK() ? "static" : "3d");
  }, []);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0">
      {mode === "3d" && <CrystalScene scrollRef={scrollRef} active={visible} />}
      {mode === "static" && <div className="mx-auto h-full max-w-[380px] opacity-90"><StaticCrystal /></div>}
    </div>
  );
}

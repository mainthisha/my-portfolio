"use client";
import { motion } from "framer-motion";

const stars = [
  [5, 12, 2, 0.7], [17, 27, 1, 0.45], [29, 18, 1, 0.55], [41, 8, 2, 0.55], [53, 24, 1, 0.4], [67, 13, 2, 0.65], [79, 31, 1, 0.45], [91, 16, 2, 0.6],
  [8, 52, 1, 0.5], [22, 72, 2, 0.5], [37, 58, 1, 0.4], [49, 82, 2, 0.55], [63, 66, 1, 0.45], [76, 88, 2, 0.5], [89, 61, 1, 0.4],
  [12, 93, 2, 0.45], [34, 91, 1, 0.5], [57, 96, 1, 0.4], [72, 48, 1, 0.45], [96, 77, 2, 0.5],
] as const;

export default function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,190,140,.055),transparent_35%),radial-gradient(circle_at_80%_65%,rgba(216,190,140,.045),transparent_32%)]" />
      <div className="gold-vignette absolute inset-0" />
      {stars.map(([x, y, size, opacity], i) => (
        <motion.span
          key={i}
          className="gold-star absolute rounded-full bg-gold"
          style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity }}
          animate={{ opacity: [opacity * 0.35, opacity, opacity * 0.45], scale: [0.8, 1.35, 0.8] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: (i % 7) * 0.7, ease: "easeInOut" }}
        />
      ))}
      <span className="orbit orbit-a absolute -left-32 bottom-[-170px] h-[420px] w-[420px] rounded-full border border-gold/20" />
      <span className="orbit orbit-b absolute -left-24 bottom-[-120px] h-[310px] w-[520px] rotate-[26deg] rounded-[50%] border border-gold/15" />
      <span className="orbit orbit-c absolute -right-48 top-[8%] h-[520px] w-[520px] rounded-full border border-gold/10" />
    </div>
  );
}

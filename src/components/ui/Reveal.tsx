"use client";
import { motion } from "framer-motion";

/** Scroll reveal. Used for section headings and key blocks only. */
export default function Reveal({ children, delay = 0, y = 32, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line mask reveal for large headlines. */
export function MaskLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]" aria-hidden>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

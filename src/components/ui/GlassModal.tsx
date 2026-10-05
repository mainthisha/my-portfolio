"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "./Icons";

export default function GlassModal({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
            className="glass-modal relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-[30px] border border-gold/25 p-7 md:p-10"
            initial={{ opacity: 0, y: 24, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: .97 }}
            transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(216,190,140,.13),transparent_68%)]" />
            <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-bone/70 transition-colors hover:border-gold/40 hover:text-gold">
              <X className="h-4 w-4" />
            </button>
            {eyebrow && <p className="label uppercase tracking-[.2em] text-gold/80">{eyebrow}</p>}
            <h3 className="display mt-3 pr-10 text-[clamp(2rem,4vw,3.5rem)] leading-[.95] text-gold">{title}</h3>
            <div className="mt-7 h-px bg-gold/15" />
            <div className="mt-7 text-[15px] leading-7 text-bone/70">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
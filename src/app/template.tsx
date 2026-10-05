"use client";
import { motion } from "framer-motion";

/** Re-mounts on every route change: a gold curtain wipes away, then content settles in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-gold"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />
      <motion.main id="main" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.main>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Desktop-only cursor. Grows over anything with data-cursor, links and buttons. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a,button,[data-cursor],input,textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-gold" />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[200]"
      >
        <motion.div
          animate={{ width: active ? 64 : 34, height: active ? 64 : 34, opacity: active ? 0.9 : 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="-ml-[17px] -mt-[17px] rounded-full border border-gold"
          style={{ translateX: active ? -15 : 0, translateY: active ? -15 : 0 }}
        />
      </motion.div>
    </>
  );
}
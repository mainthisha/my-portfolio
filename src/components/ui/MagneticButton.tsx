"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "line";
  download?: boolean;
  external?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
};

/** Button that leans toward the pointer. Disabled automatically on touch. */
export default function MagneticButton({ href, children, variant = "gold", download, external, onClick, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.3 });
  const cls = `${variant === "gold" ? "btn-gold" : "btn-line"} ${className}`;

  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const leave = () => { x.set(0); y.set(0); };

  const inner = external || download || href.startsWith("mailto:") || href.startsWith("tel:") ? (
    <a href={href} className={cls} onClick={onClick} download={download ? "" : undefined}
       {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
  ) : (
    <Link href={href} className={cls} onClick={onClick}>{children}</Link>
  );

  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x: sx, y: sy }} className="inline-block" data-cursor>
      {inner}
    </motion.div>
  );
}

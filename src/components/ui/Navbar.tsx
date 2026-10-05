"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { nav, profile } from "@/data/profile";
import { scrollToHash } from "@/lib/scroll";

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * 0.4;
      let current = nav[0].href;

      for (const n of nav) {
        const el = document.querySelector(n.href);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = n.href;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = nav[nav.length - 1].href;

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToHash(href), open ? 280 : 0);
  };

  return (
    <>
      <motion.header
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled ? "border-b border-gold/10 bg-[#090806]/75 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[74px] items-center justify-between md:h-[92px]">
          <Link href="#home" onClick={go("#home")} className="display text-[20px] tracking-[-.02em] text-bone">
            MAINTHISHA <span className="text-gold">S</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={go(n.href)}
                className={`group relative py-3 text-[13px] transition-colors ${
                  active === n.href ? "text-gold" : "text-bone/65 hover:text-bone"
                }`}
              >
                {n.label}
                <span
                  className={`absolute bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                    active === n.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumePath}
              download
              className="hidden rounded-full border border-gold/55 px-5 py-3 text-[10px] font-semibold tracking-[.18em] text-gold transition-all hover:bg-gold hover:text-ink sm:block"
            >
              DOWNLOAD RESUME ↓
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 lg:hidden"
              aria-label="Menu"
            >
              <span className="space-y-1.5">
                <i className={`block h-px w-4 bg-gold transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
                <i className={`block h-px w-4 bg-gold transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#090806]/95 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={go(n.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="display flex items-center justify-between border-b border-white/10 py-4 text-4xl"
                >
                  {n.label}
                  <span className="text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                </motion.a>
              ))}
            </nav>
            <a href={profile.resumePath} download className="btn-gold mt-10 w-full justify-center">
              DOWNLOAD RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
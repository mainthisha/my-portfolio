"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hackathons, type Hackathon } from "@/data/hackathons";
import { Trophy, ArrowUpRight, Arrow, X } from "@/components/ui/Icons";

function CertificateModal({ h, onClose }: { h: Hackathon | null; onClose: () => void }) {
  useEffect(() => {
    if (!h) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [h, onClose]);

  return (
    <AnimatePresence>
      {h && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass-modal relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-gold/25 p-5 md:p-7"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink/60 text-bone/70 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="label uppercase tracking-[.2em] text-gold/80">{h.type}</p>
            <h3 className="display mt-2 pr-12 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05] text-gold">{h.name}</h3>
            <p className="mt-2 text-sm text-bone/55">
              {h.organizer} · {h.date}
            </p>

            <a
              href={h.certificate}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="mt-5 block overflow-hidden rounded-[16px] border border-gold/25 bg-[#0f0d0b] p-2"
              aria-label="Open certificate in a new tab"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.certificate} alt={`${h.name} certificate`} className="h-auto w-full rounded-[10px]" />
            </a>

            <a
              href={h.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5"
              data-cursor
            >
              OPEN FULL SIZE <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hackathons() {
  const rail = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Hackathon | null>(null);

  const scrollBy = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="hackathons" className="relative section-rule py-24 md:py-36">
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="label">Hackathons</p>
            <h2 className="display mt-5 text-[clamp(3.2rem,7vw,7rem)]">Learning by competing.</h2>
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              data-cursor
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-bone/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              data-cursor
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-bone/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Arrow />
            </button>
          </div>
        </div>

        <div
          ref={rail}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {hackathons.map((h, i) => (
            <motion.button
              type="button"
              key={h.name}
              onClick={() => setSelected(h)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              data-cursor
              className="glass-card rounded-[26px] group relative flex min-h-[200px] w-[270px] shrink-0 snap-start flex-col justify-between p-6 text-left sm:w-[300px]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                  <Trophy className="h-5 w-5" />
                </span>
                <span className="text-xs text-taupe">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div>
                <h3 className="display text-[1.6rem] leading-[1.05]">{h.name}</h3>
                <p className="mt-2 text-sm text-gold/85">{h.type}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-bone/45 transition-colors group-hover:text-gold">
                  View certificate <ArrowUpRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertificateModal h={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
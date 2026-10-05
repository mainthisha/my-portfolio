"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import { Trophy, ArrowUpRight, X } from "@/components/ui/Icons";
import { achievements } from "@/data/achievements";

type Achievement = (typeof achievements)[number];

function AchievementModal({ a, onClose }: { a: Achievement | null; onClose: () => void }) {
  useEffect(() => {
    if (!a) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [a, onClose]);

  const rows = a
    ? [
        ["Event", a.event],
        ["Result", a.place],
        ["Team", a.team],
        ["College", a.college],
        ["Date", a.date],
        ["Organized by", a.issuer],
        ["What we built", a.built],
      ].filter(([, v]) => v)
    : [];

  return (
    <AnimatePresence>
      {a && (
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
            className="glass-modal relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[30px] border border-gold/25 p-5 md:p-8"
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

            <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr] md:gap-8">
              {/* CERTIFICATE */}
              <a
                href={a.certificate}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="block overflow-hidden rounded-[18px] border border-gold/25 bg-[#0f0d0b] p-2"
                aria-label="Open certificate in a new tab"
              >
                <img
                  src={a.certificate}
                  alt={`${a.title} certificate`}
                  className="h-auto w-full rounded-[12px]"
                />
              </a>

              {/* DETAILS */}
              <div>
                <p className="label uppercase tracking-[.2em] text-gold/80">
                  {a.year} · {a.issuer}
                </p>
                <h3 className="display mt-3 pr-10 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1] text-gold">
                  {a.title}
                </h3>
                <div className="mt-5 h-px bg-gold/15" />

                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-[14px] leading-6">
                  {rows.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-[11px] uppercase tracking-[.18em] text-bone/40">{k}</dt>
                      <dd className="text-bone/80">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={a.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    data-cursor
                  >
                    VIEW CERTIFICATE
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null);
  return (
    <section id="achievements" className="relative border-t border-white/10 py-16 md:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHead
            kicker="Achievements"
            lines={["Milestones worth highlighting."]}
            note="Competitive moments that reflect initiative, technical effort and growth."
          />
        </div>
        <div className="mx-auto max-w-3xl">
          {achievements.map((a, i) => (
            <motion.button
              type="button"
              key={a.title}
              onClick={() => setSelected(a)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="glass-card group relative w-full overflow-hidden rounded-[30px] p-8 text-center transition-transform duration-300 hover:-translate-y-1 md:p-10"
            >
              <div className="relative flex flex-col items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold shadow-[0_0_35px_rgba(216,190,140,.08)]">
                  <Trophy className="h-7 w-7" />
                </span>
                <p className="label mt-5 uppercase tracking-[.2em] text-gold/75">
                  {a.year} · {a.issuer}
                </p>
                <h3 className="display mt-2 text-[clamp(1.8rem,3.5vw,2.7rem)] leading-tight text-bone">
                  {a.title}
                </h3>
                <p className="prose-copy mt-4 max-w-2xl text-sm leading-7 text-bone/55">{a.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-gold">
                  View achievement <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AchievementModal a={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
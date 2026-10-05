"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import { Trophy, Seal, Layers, ArrowUpRight } from "@/components/ui/Icons";

const iconFor = (kind: string) =>
  kind === "award" ? Trophy : kind === "badge" ? Layers : Seal;

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative section-rule py-24 md:py-36"
    >
      <div className="container-x">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label">Certifications</p>

            <h2 className="display mt-5 text-[clamp(3.2rem,7vw,7rem)]">
              Proof of learning.
            </h2>
          </div>

          <p className="hidden max-w-sm text-right text-sm text-bone/45 md:block">
            Professional certificates, badges and simulations
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications
            .filter((c) => c.kind !== "award")
            .map((c, i) => {
              const I = iconFor(c.kind);

              return (
                <motion.article
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="glass group relative flex min-h-[230px] flex-col p-7"
                >
                  <div className="flex justify-between">
                    <I className="text-gold" />

                    <span className="text-xs text-taupe">
                      {c.year}
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-[1.45rem] leading-tight">
                    {c.title}
                  </h3>

                  <p className="mt-3 text-sm text-bone/45">
                    {c.issuer}
                  </p>

                  <div className="mt-auto pt-6">
                    {c.credential ? (
                      <a
                        href={c.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-gold transition-all duration-300 hover:gap-3"
                      >
                        VERIFY CREDENTIAL
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-bone/25">
                        VERIFICATION LINK PENDING
                      </span>
                    )}
                  </div>

                  <span className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gold transition group-hover:scale-x-100" />
                </motion.article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
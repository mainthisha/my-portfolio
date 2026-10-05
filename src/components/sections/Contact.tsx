"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Pin,
  Arrow,
} from "@/components/ui/Icons";

type Status = "idle" | "sending" | "sent" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkjglwwg";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
] as const;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");

        if (data?.errors?.length) {
          setErrorMessage(
            data.errors
              .map((error: { message?: string }) => error.message)
              .filter(Boolean)
              .join(" ")
          );
        } else {
          setErrorMessage(
            "Something went wrong. Please try again, or email me directly."
          );
        }

        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to send your message right now. Please try again or email me directly."
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-white/10 py-20 md:py-24"
    >
      <div className="container-x">
        <div className="glass-card relative overflow-hidden rounded-[36px] p-7 md:p-12 lg:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(216,190,140,.13),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(216,190,140,.08),transparent_30%)]" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            {/* LEFT SIDE */}
            <div className="min-w-0 lg:pr-6">
              <p className="label uppercase tracking-[.25em]">
                Get in touch
              </p>

              <h2 className="display mt-5 max-w-[30rem] text-[clamp(3rem,5.5vw,5.6rem)] leading-[.86]">
                <span className="block">LET&apos;S BUILD</span>
                <span className="mt-2 block text-gold">SOMETHING.</span>
              </h2>

              <p className="prose-copy mt-7 max-w-md text-[14px] leading-7 text-bone/60">
                Open to internships, collaborative projects and opportunities
                where AI, data, web and product thinking come together.
              </p>

              <ul className="mt-10 space-y-5 text-sm">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-4 text-bone/70 transition-colors hover:text-gold"
                  >
                    <Mail className="text-gold" />
                    {profile.email}
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:${profile.phoneHref}`}
                    className="flex items-center gap-4 text-bone/70 transition-colors hover:text-gold"
                  >
                    <Phone className="text-gold" />
                    {profile.phone}
                  </a>
                </li>

                <li className="flex items-center gap-4 text-bone/70">
                  <Pin className="text-gold" />
                  {profile.location}
                </li>
              </ul>

              <div className="mt-9 flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                >
                  <Github />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                >
                  <Linkedin />
                </a>
              </div>
            </div>

            {/* RIGHT SIDE — CONTACT FORM */}
            <Reveal className="min-w-0">
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-[28px] border border-white/10 bg-ink/50 p-6 md:p-8"
              >
                {/* Honeypot spam protection */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-7 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.name === "subject" ? "sm:col-span-2" : ""
                      }
                    >
                      <label
                        htmlFor={field.name}
                        className="label mb-2 block uppercase tracking-[.16em]"
                      >
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required
                        autoComplete={
                          field.name === "name"
                            ? "name"
                            : field.name === "email"
                              ? "email"
                              : "off"
                        }
                        className="w-full border-0 border-b border-white/15 bg-transparent py-3 text-lg text-bone outline-none transition-colors placeholder:text-taupe/50 focus:border-gold"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="message"
                    className="label mb-2 block uppercase tracking-[.16em]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full resize-none border-0 border-b border-white/15 bg-transparent py-3 text-lg text-bone outline-none transition-colors focus:border-gold"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gold mt-8 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "SENDING…" : "SEND MESSAGE"}

                  {status !== "sending" && <Arrow />}
                </motion.button>

                {/* STATUS MESSAGE */}
                <div aria-live="polite" className="mt-4">
                  {status === "sent" && (
                    <p className="text-sm text-gold">
                      Thank you — your message has been received. I&apos;ll
                      reply by email soon.
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      {errorMessage ||
                        "Something went wrong. Please try again, or email me directly."}
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
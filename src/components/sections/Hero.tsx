"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "@/data/profile";
import MagneticButton from "@/components/ui/MagneticButton";
import { Github, Linkedin, Mail, Arrow } from "@/components/ui/Icons";

const roles = [
  "AI Engineer",
  "Cloud & DevOps Enthusiast",
  "Data Analyst",
  "Full-Stack Developer",
  "UI/UX Designer",
];

const nodes = [
  { x: 18, y: 68, label: "Python" },
  { x: 28, y: 44, label: "Machine Learning" },
  { x: 39, y: 62, label: "Flask" },
  { x: 50, y: 30, label: "RAG" },
  { x: 62, y: 51, label: "React" },
  { x: 72, y: 24, label: "Node.js" },
  { x: 82, y: 43, label: "Cloud" },
  { x: 70, y: 72, label: "DevOps" },
  { x: 48, y: 78, label: "Embeddings" },
  { x: 31, y: 82, label: "Vercel" },
];

const ribbon = [
  "Python",
  "Machine Learning",
  "RAG & LLM APIs",
  "React",
  "Node.js",
  "Flask",
  "MongoDB",
  "Cloud",
  "DevOps",
  "CI/CD",
  "UI/UX",
];

function Typewriter() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? roles[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const full = roles[index];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text === full) {
      timer = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((index + 1) % roles.length);
    } else {
      timer = setTimeout(
        () =>
          setText(
            full.slice(0, text.length + (deleting ? -1 : 1))
          ),
        deleting ? 35 : 75
      );
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [text, deleting, index, reduce]);

  return (
    <span>
      {text}
      <span className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[.1em] animate-pulse bg-gold" />
    </span>
  );
}

function Letters({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden py-[.12em] -my-[.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", rotate: 6 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </>
  );
}

function Chip({
  className,
  children,
  delay,
}: {
  className: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      style={{ transform: "translateZ(70px)" }}
      className={`pointer-events-none absolute z-20 hidden rounded-full border border-gold/30 bg-[#0d0c0b]/80 px-4 py-2 text-[10px] uppercase tracking-[.2em] text-gold shadow-[0_10px_40px_rgba(0,0,0,.5)] backdrop-blur-md md:block ${className}`}
      animate={{ y: [0, -9, 0] }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_#d8be8c]" />
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const px = useSpring(useMotionValue(0), {
    stiffness: 80,
    damping: 18,
  });
  const py = useSpring(useMotionValue(0), {
    stiffness: 80,
    damping: 18,
  });

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(216,190,140,.13), transparent 62%)`;

  const rotateY = useTransform(px, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(py, [-0.5, 0.5], [10, -10]);
  const bgShift = useTransform(px, [-0.5, 0.5], [-40, 40]);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;

    const r = e.currentTarget.getBoundingClientRect();

    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] overflow-hidden pt-[92px]"
    >
      {/* cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlight }}
      />

      {/* giant outlined backdrop word */}
      <motion.div
        aria-hidden
        style={{
          x: bgShift,
          WebkitTextStroke: "1px rgba(216,190,140,.09)",
        }}
        className="display pointer-events-none absolute -right-[4%] top-[12%] z-0 select-none text-[26vw] leading-none text-transparent"
      >
        AI
      </motion.div>

      <div className="container-x relative z-10 grid min-h-[calc(100svh-92px)] items-center gap-12 py-14 pb-28 lg:grid-cols-12 lg:gap-10 lg:py-10 lg:pb-28">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="label mb-5 flex items-center gap-4"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px w-12 origin-left bg-gold"
            />
            HELLO, I&apos;M
          </motion.p>

          {/* NAME — ALL CAPS */}
          <h1 className="display whitespace-nowrap text-[clamp(2.5rem,5.6vw,7rem)] font-medium uppercase leading-[.95] tracking-[.03em] text-bone [text-shadow:0_0_60px_rgba(216,190,140,.18)]">
            <Letters text="MAINTHISHA" delay={0.35} />{" "}
            <span className="text-gold">
              <Letters text="S" delay={0.95} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-7 max-w-2xl"
          >
            <p className="min-h-[1.2em] font-display text-[clamp(1.25rem,2.1vw,1.95rem)] leading-[1.1] tracking-[.02em] text-gold">
              <Typewriter />
            </p>

            {/* TAGLINE — single line, Sora, no italic */}
            <p
              className="mt-5 whitespace-nowrap text-[clamp(.8rem,1.18vw,1.12rem)] font-light tracking-[.03em] text-bone/80"
              style={{
                fontFamily:
                  "'Sora', 'Hanken Grotesk', system-ui, sans-serif",
              }}
            >
              Transforming Ideas into{" "}
              <span className="font-normal text-gold">
                Intelligent Digital Experiences
              </span>
            </p>
          </motion.div>

          {/* STATUS PILL — slightly smaller */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[.04] px-3 py-1.5 text-[10px] uppercase tracking-[.16em] text-gold/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-gold" />
            </span>

            Open to internships &amp; collaborations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects">
              EXPLORE PROJECTS <Arrow />
            </MagneticButton>

            <MagneticButton
              href={profile.resumePath}
              download
              variant="line"
            >
              DOWNLOAD RESUME ↓
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-bone/55"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gold"
            >
              <Github /> GitHub
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gold"
            >
              <Linkedin /> LinkedIn
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 hover:text-gold"
            >
              <Mail /> Email
            </a>
          </motion.div>
        </div>

        {/* 3D tilt card */}
        <div className="lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              rotateX: reduce ? 0 : rotateX,
              rotateY: reduce ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            <Chip className="-left-4 top-[14%]" delay={0}>
              RAG · LLM APIs
            </Chip>

            <Chip className="-right-3 top-[56%]" delay={1.2}>
              Live on Vercel
            </Chip>

            <Chip className="left-[10%] -bottom-4" delay={2.2}>
              5 Internships
            </Chip>

            {/* rotating gold light border */}
            <div className="relative overflow-hidden rounded-[26px] p-px shadow-[0_40px_120px_-30px_rgba(216,190,140,.25)]">
              <motion.div
                aria-hidden
                className="absolute -inset-[60%]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0 62%, rgba(216,190,140,.9) 82%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative aspect-[1.02] min-h-[380px] rounded-[25px] bg-[#0f0d0b] p-7 md:p-9">
                <div className="absolute inset-0 rounded-[25px] bg-[radial-gradient(circle_at_50%_45%,rgba(216,190,140,.16),transparent_46%)]" />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="label">
                      INTELLIGENT SYSTEMS
                    </span>

                    <span className="h-2 w-2 animate-pulse rounded-full bg-gold shadow-[0_0_18px_rgba(216,190,140,.8)]" />
                  </div>

                  <svg
                    viewBox="0 0 520 430"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <defs>
                      <radialGradient id="heroGlow">
                        <stop
                          stopColor="#d8be8c"
                          stopOpacity=".8"
                        />
                        <stop
                          offset="1"
                          stopColor="#d8be8c"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>

                    <circle
                      cx="260"
                      cy="210"
                      r="95"
                      fill="none"
                      stroke="#d8be8c"
                      strokeOpacity=".22"
                    />

                    <motion.circle
                      cx="260"
                      cy="210"
                      r="150"
                      fill="none"
                      stroke="#d8be8c"
                      strokeOpacity=".2"
                      strokeDasharray="4 10"
                      style={{ transformOrigin: "260px 210px" }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <motion.circle
                      cx="260"
                      cy="210"
                      r="195"
                      fill="none"
                      stroke="#d8be8c"
                      strokeOpacity=".1"
                      strokeDasharray="2 14"
                      style={{ transformOrigin: "260px 210px" }}
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 90,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <motion.circle
                      cx="260"
                      cy="210"
                      r="38"
                      fill="url(#heroGlow)"
                      style={{ transformOrigin: "260px 210px" }}
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {nodes.map((n, i) => {
                      const cx = n.x * 5.2;
                      const cy = n.y * 4.1;
                      const big = i % 3 === 0;

                      return (
                        <g key={n.label}>
                          <line
                            x1="260"
                            y1="210"
                            x2={cx}
                            y2={cy}
                            stroke="#d8be8c"
                            strokeOpacity=".22"
                          />

                          <motion.circle
                            r="2.4"
                            fill="#f6efe0"
                            animate={{
                              cx: [260, cx],
                              cy: [210, cy],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2.2,
                              delay: i * 0.45,
                              repeat: Infinity,
                              repeatDelay: 2.5,
                              ease: "easeInOut",
                            }}
                          />

                          <motion.circle
                            cx={cx}
                            cy={cy}
                            r={big ? 7 : 4.5}
                            fill="#d8be8c"
                            fillOpacity={big ? 0.85 : 0.6}
                            animate={{
                              opacity: [0.6, 1, 0.6],
                              scale: [1, 1.25, 1],
                            }}
                            style={{
                              transformOrigin: `${cx}px ${cy}px`,
                            }}
                            transition={{
                              duration: 3 + (i % 4),
                              delay: i * 0.3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />

                          <text
                            x={cx}
                            y={cy + (big ? 22 : 19)}
                            textAnchor="middle"
                            fontSize="10.5"
                            letterSpacing="1.6"
                            fill="#d8be8c"
                            fillOpacity=".8"
                            style={{ textTransform: "uppercase" }}
                          >
                            {n.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="relative mt-auto border-t border-gold/15 pt-4 text-[11px] uppercase tracking-[.22em] text-gold/75">
                    AI • Data • Web • Cloud &amp; DevOps
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* tech ribbon */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-gold/10 bg-[#0b0a09]/70 py-4 backdrop-blur-md">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <motion.div
            className="flex w-max gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...ribbon, ...ribbon, ...ribbon, ...ribbon].map(
              (t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 whitespace-nowrap text-[11px] uppercase tracking-[.3em] text-gold/60"
                >
                  {t}{" "}
                  <span className="text-gold/35">◆</span>
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
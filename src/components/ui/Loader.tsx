"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "ms-intro-seen";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) {
      setShow(false);
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2600);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
          }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="relative flex flex-col items-center justify-center">

            {/* SUBTLE AMBIENT GLOW */}
            <motion.div
              className="
                pointer-events-none
                absolute
                h-[420px]
                w-[420px]
                rounded-full
                bg-gold/[0.025]
                blur-[100px]
              "
              animate={{
                scale: [0.85, 1.05, 0.85],
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* MAIN ORBITAL LOADER */}
            <div className="relative h-[190px] w-[190px] sm:h-[220px] sm:w-[220px]">

              {/* faint outer orbit */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/[0.08]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* OUTER ORBIT */}
              <motion.svg
                viewBox="0 0 220 220"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <defs>
                  <linearGradient
                    id="goldOrbitOuter"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#d8be8c" stopOpacity="0" />
                    <stop offset="35%" stopColor="#d8be8c" stopOpacity="0.2" />
                    <stop offset="58%" stopColor="#f1d49a" stopOpacity="0.95" />
                    <stop offset="72%" stopColor="#d8be8c" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d8be8c" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <ellipse
                  cx="110"
                  cy="110"
                  rx="91"
                  ry="64"
                  fill="none"
                  stroke="url(#goldOrbitOuter)"
                  strokeWidth="1.4"
                />

                <circle
                  cx="191"
                  cy="110"
                  r="3"
                  fill="#f1d49a"
                />
              </motion.svg>

              {/* SECOND ORBIT — opposite direction */}
              <motion.svg
                viewBox="0 0 220 220"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <defs>
                  <linearGradient
                    id="goldOrbitSecond"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#d8be8c" stopOpacity="0" />
                    <stop offset="42%" stopColor="#d8be8c" stopOpacity="0.12" />
                    <stop offset="65%" stopColor="#f5dba4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8be8c" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <ellipse
                  cx="110"
                  cy="110"
                  rx="78"
                  ry="46"
                  fill="none"
                  stroke="url(#goldOrbitSecond)"
                  strokeWidth="1.1"
                  transform="rotate(-28 110 110)"
                />

                <circle
                  cx="32"
                  cy="110"
                  r="2.2"
                  fill="#d8be8c"
                />
              </motion.svg>

              {/* THIRD THIN ORBIT */}
              <motion.svg
                viewBox="0 0 220 220"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <ellipse
                  cx="110"
                  cy="110"
                  rx="67"
                  ry="91"
                  fill="none"
                  stroke="#d8be8c"
                  strokeOpacity="0.16"
                  strokeWidth="0.8"
                  strokeDasharray="2 7"
                />

                <circle
                  cx="110"
                  cy="19"
                  r="2"
                  fill="#d8be8c"
                  fillOpacity="0.8"
                />
              </motion.svg>

              {/* INNER ENERGY SWEEP */}
              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[108px]
                  w-[108px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-gold/[0.13]
                "
                animate={{
                  scale: [0.92, 1.08, 0.92],
                  opacity: [0.35, 0.8, 0.35],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* CENTER — NO MS, NO SECOND CIRCLE */}
              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-3
                  w-3
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-gold
                  shadow-[0_0_18px_rgba(216,190,140,0.85)]
                "
                animate={{
                  scale: [0.7, 1.35, 0.7],
                  opacity: [0.55, 1, 0.55],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* FLOATING PARTICLE 1 */}
              <motion.span
                className="
                  absolute
                  left-[17%]
                  top-[30%]
                  h-1
                  w-1
                  rounded-full
                  bg-gold
                  shadow-[0_0_10px_rgba(216,190,140,0.7)]
                "
                animate={{
                  opacity: [0.15, 1, 0.15],
                  scale: [0.7, 1.4, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* FLOATING PARTICLE 2 */}
              <motion.span
                className="
                  absolute
                  right-[17%]
                  top-[62%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-gold/80
                  shadow-[0_0_12px_rgba(216,190,140,0.6)]
                "
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.6, 1.3, 0.6],
                }}
                transition={{
                  duration: 2.6,
                  delay: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* GOLD SWEEP */}
              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-px
                  w-[155px]
                  -translate-x-1/2
                  -translate-y-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-gold/50
                  to-transparent
                  opacity-40
                "
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* TAGLINE */}
            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-9
                text-center
                font-display
                text-[17px]
                italic
                tracking-[0.08em]
                text-gold/80
                sm:text-[20px]
              "
            >
              Turning ideas into intelligent solutions
            </motion.p>

            {/* ELEGANT DIVIDER */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 110,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mt-6 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
            >
              <motion.span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1.5
                  w-1.5
                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-45
                  bg-gold
                  shadow-[0_0_10px_rgba(216,190,140,0.8)]
                "
                animate={{
                  opacity: [0.35, 1, 0.35],
                  scale: [0.7, 1.2, 0.7],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
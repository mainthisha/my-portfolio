"use client";

const sparkles = [
  { left: "8%", top: "16%", size: 18, delay: "0s" },
  { left: "23%", top: "42%", size: 12, delay: "1.4s" },
  { left: "38%", top: "19%", size: 15, delay: "2.2s" },
  { left: "52%", top: "72%", size: 11, delay: "0.8s" },
  { left: "64%", top: "28%", size: 19, delay: "2.8s" },
  { left: "76%", top: "58%", size: 13, delay: "1.1s" },
  { left: "88%", top: "18%", size: 16, delay: "3.1s" },
  { left: "93%", top: "76%", size: 11, delay: "1.9s" },
  { left: "14%", top: "82%", size: 13, delay: "2.5s" },
  { left: "46%", top: "35%", size: 9, delay: "3.5s" },
];

export default function Sparkles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {sparkles.map((sparkle, index) => (
        <span
          key={index}
          className="portfolio-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            fontSize: `${sparkle.size}px`,
            animationDelay: sparkle.delay,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
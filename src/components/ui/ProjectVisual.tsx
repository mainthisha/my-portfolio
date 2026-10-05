import type { Motif } from "@/types";

const G = "#d8be8c";

function contour(r: number, k: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 90; i++) {
    const a = (i / 90) * Math.PI * 2;
    const rr = r + Math.sin(a * 3 + k) * (6 + r * 0.06) + Math.cos(a * 5 - k * 1.7) * (3 + r * 0.03);
    pts.push(`${i ? "L" : "M"}${(400 + Math.cos(a) * rr * 1.5).toFixed(1)} ${(250 + Math.sin(a) * rr * 0.9).toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

function Art({ motif }: { motif: Motif }) {
  const line = { stroke: G, fill: "none", strokeWidth: 1 } as const;
  switch (motif) {
    case "routes":
      return (
        <g {...line}>
          <circle cx="400" cy="250" r="190" strokeOpacity=".25" />
          <circle cx="400" cy="250" r="120" strokeOpacity=".25" strokeDasharray="2 6" />
          <path d="M120 380 C 220 120, 330 420, 420 230 S 640 90, 690 300" strokeWidth="1.5" strokeDasharray="1 8" strokeLinecap="round" />
          <path d="M120 380 C 260 330, 300 150, 420 230" strokeOpacity=".5" />
          {[[120, 380], [420, 230], [690, 300], [560, 130]].map(([x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="5" fill={G} /><circle cx={x} cy={y} r="16" strokeOpacity=".5" /></g>
          ))}
          <path d="M400 60v40M400 400v40M210 250h40M550 250h40" strokeOpacity=".4" />
        </g>
      );
    case "blueprint":
      return (
        <g {...line}>
          {Array.from({ length: 17 }).map((_, i) => <path key={"v" + i} d={`M${i * 50} 0V500`} strokeOpacity=".08" />)}
          {Array.from({ length: 11 }).map((_, i) => <path key={"h" + i} d={`M0 ${i * 50}H800`} strokeOpacity=".08" />)}
          <path d="M150 400V210L300 130V400M300 400V170H470V400M470 400V90L560 60V400M60 400H740" strokeWidth="1.5" />
          <path d="M300 170L470 400M300 400L470 170M150 210L300 400M300 130L150 400" strokeOpacity=".35" />
          <path d="M560 400L720 400M600 400V300H700V400M620 340h60" strokeOpacity=".6" />
          <path d="M150 440H470M150 432v16M470 432v16" strokeOpacity=".7" />
          <path d="M600 60 680 60M600 52v16M680 52v16" strokeOpacity=".5" />
        </g>
      );
    case "stage":
      return (
        <g {...line}>
          {Array.from({ length: 11 }).map((_, i) => {
            const x = 130 + i * 54;
            return <path key={i} d={`M400 40 L${x} 400`} strokeOpacity={0.12 + (i % 2) * 0.18} />;
          })}
          <path d="M60 400 Q400 300 740 400" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((r) =>
            Array.from({ length: 18 - r * 2 }).map((_, i) => {
              const n = 18 - r * 2;
              const t = (i + 0.5) / n;
              return <circle key={r + "-" + i} cx={110 + t * 580} cy={430 + r * 20 - Math.sin(t * Math.PI) * 25} r="2.6" fill={G} fillOpacity={0.35 + r * 0.12} stroke="none" />;
            })
          )}
          <circle cx="400" cy="40" r="7" fill={G} />
          <circle cx="400" cy="40" r="20" strokeOpacity=".4" />
        </g>
      );
    case "pipeline":
      return (
        <g {...line}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={60 + i * 142} y={i % 2 ? 300 : 170} width="96" height="60" strokeWidth="1.5" />
              <rect x={72 + i * 142} y={(i % 2 ? 300 : 170) + 14} width="40" height="3" fill={G} stroke="none" />
              <rect x={72 + i * 142} y={(i % 2 ? 300 : 170) + 26} width="64" height="2" fill={G} fillOpacity=".4" stroke="none" />
              {i < 4 && <path d={`M${156 + i * 142} ${(i % 2 ? 330 : 200)} C ${190 + i * 142} ${(i % 2 ? 330 : 200)}, ${170 + i * 142} ${(i % 2 ? 200 : 330)}, ${202 + i * 142} ${(i % 2 ? 200 : 330)}`} strokeDasharray="3 5" />}
            </g>
          ))}
          <path d="M108 140C 108 60, 700 60, 700 140" strokeOpacity=".35" />
          <path d="M700 140l-6-10m6 10 8-9" strokeOpacity=".5" />
        </g>
      );
    case "shelves":
      return (
        <g {...line}>
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <path d={`M80 ${170 + row * 110}H720`} strokeWidth="1.5" />
              {Array.from({ length: 26 }).map((_, i) => {
                const h = 40 + ((i * 37 + row * 23) % 44);
                const w = 12 + ((i * 7) % 12);
                const x = 90 + i * 24.5;
                return <rect key={i} x={x} y={170 + row * 110 - h} width={w} height={h} strokeOpacity={i % 5 === 0 ? 1 : 0.4} fill={i % 7 === 0 ? G : "none"} fillOpacity=".25" />;
              })}
            </g>
          ))}
          <circle cx="640" cy="80" r="28" strokeOpacity=".7" /><path d="M660 100l24 24" strokeWidth="1.5" />
        </g>
      );
    case "contours":
      return (
        <g {...line}>
          {Array.from({ length: 10 }).map((_, i) => <path key={i} d={contour(24 + i * 22, i * 0.4)} strokeOpacity={0.2 + i * 0.07} />)}
          <path d="M120 420C 260 380, 330 400, 470 350S 640 300, 700 320" strokeDasharray="2 6" />
          {[[240, 386], [470, 350], [640, 308]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={G} />)}
        </g>
      );
    case "document":
      return (
        <g {...line}>
          <rect x="120" y="90" width="230" height="320" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M150 ${140 + i * 30}H${i % 3 === 2 ? 260 : 320}`} strokeOpacity={i === 3 || i === 4 ? 1 : 0.35} />)}
          {[[520, 130], [610, 200], [540, 280], [660, 340], [560, 390], [690, 120]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M350 ${i === 3 || i === 4 ? 230 : 190 + i * 8} L${x} ${y}`} strokeOpacity=".3" strokeDasharray="2 5" />
              <circle cx={x} cy={y} r="6" fill={i === 3 ? G : "none"} /><circle cx={x} cy={y} r="14" strokeOpacity=".3" />
            </g>
          ))}
          <path d="M150 200h170v20H150z" fill={G} fillOpacity=".18" stroke="none" />
        </g>
      );
    case "junction":
      return (
        <g {...line}>
          <path d="M0 210H320M480 210H800M0 290H320M480 290H800M320 0V210M320 290V500M480 0V210M480 290V500" strokeWidth="1.5" />
          <path d="M0 250H310M490 250H800M400 0V200M400 300V500" strokeDasharray="10 12" strokeOpacity=".5" />
          <rect x="320" y="210" width="160" height="80" strokeOpacity=".25" />
          {[[90, 230], [190, 268], [610, 232], [700, 270], [380, 90], [420, 410], [380, 150]].map(([x, y], i) => <rect key={i} x={x - 9} y={y - 5} width="18" height="10" fill={G} fillOpacity={i % 3 === 0 ? 0.9 : 0.4} stroke="none" />)}
          <circle cx="400" cy="250" r="70" strokeOpacity=".4" strokeDasharray="1 6" />
          <circle cx="400" cy="250" r="6" fill={G} />
        </g>
      );
  }
}

/** Abstract, generated project art. Pass `overlay` to draw only the line art (transparent) on top of a photo. */
export default function ProjectVisual({
  motif,
  className = "",
  overlay = false,
}: {
  motif: Motif;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className={`h-full w-full ${className}`} role="img" aria-label={`Abstract ${motif} illustration`}>
      <defs>
        <radialGradient id={`bg-${motif}`} cx="70%" cy="30%" r="90%">
          <stop offset="0" stopColor="#2b241b" /><stop offset="0.55" stopColor="#15120f" /><stop offset="1" stopColor="#0d0c0b" />
        </radialGradient>
      </defs>
      {!overlay && <rect width="800" height="500" fill={`url(#bg-${motif})`} />}
      <Art motif={motif} />
    </svg>
  );
}
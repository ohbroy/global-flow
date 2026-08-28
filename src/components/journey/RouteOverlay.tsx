const NODES = [
  { id: "africa", label: "AFRICA", x: 26, y: 60 },
  { id: "europe", label: "EUROPE", x: 30, y: 18 },
  { id: "middle-east", label: "MIDDLE EAST", x: 46, y: 40 },
  { id: "asia", label: "ASIA", x: 70, y: 34 },
  { id: "sea-asia", label: "SOUTH EAST ASIA", x: 74, y: 58 },
];

const ROUTES = [
  { d: "M26,60 C24,44 26,30 30,18", delay: "0s" },
  { d: "M26,60 C34,54 40,48 46,40", delay: "0.6s" },
  { d: "M46,40 C56,34 62,33 70,34", delay: "1.2s" },
  { d: "M70,34 C74,44 74,50 74,58", delay: "1.8s" },
  { d: "M30,18 C44,12 60,20 70,34", delay: "2.4s" },
];

export function RouteOverlay() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {ROUTES.map((route) => (
        <path
          key={route.d}
          d={route.d}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.22"
          strokeLinecap="round"
          className="route-line"
          style={{ animationDelay: route.delay }}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {NODES.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="1.6" fill="var(--primary)" className="node-pulse" />
          <circle cx={node.x} cy={node.y} r="0.55" fill="white" />
        </g>
      ))}
    </svg>
  );
}

export function RouteLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      {NODES.map((node) => (
        <span
          key={node.id}
          className="absolute eyebrow whitespace-nowrap text-[0.6rem] text-white/70"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(14px, -50%)" }}
        >
          {node.label}
        </span>
      ))}
    </div>
  );
}

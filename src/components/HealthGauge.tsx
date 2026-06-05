export function HealthGauge({ value, size = 160 }: { value: number; size?: number }) {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = value >= 95 ? "var(--color-success)" : value >= 70 ? "var(--color-warning)" : "var(--color-destructive)";
  const label = value >= 95 ? "Excellent" : value >= 70 ? "Warning" : "Compromised";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-muted)" strokeWidth="10" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-4xl font-bold" style={{ color }}>{value}</div>
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
}

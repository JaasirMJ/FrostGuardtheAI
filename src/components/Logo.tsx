import { Snowflake } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const t = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div className="flex items-center gap-2">
      <div className={`${s} rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-elegant`}>
        <Snowflake className="h-1/2 w-1/2" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <div className={`${t} font-display font-semibold tracking-tight`}>FrostGuard <span className="text-teal">AI</span></div>
      </div>
    </div>
  );
}

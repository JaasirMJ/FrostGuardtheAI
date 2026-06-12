import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ArrowRight, Snowflake } from "lucide-react";

export const Route = createFileRoute("/splash")({
  head: () => ({ meta: [{ title: "FrostGuard AI" }] }),
  component: Splash,
});

function Splash() {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-hero px-6">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, oklch(0.72 0.13 185 / 0.35), transparent 40%), radial-gradient(circle at 70% 70%, oklch(0.62 0.18 250 / 0.3), transparent 45%)",
        }}
      />
      <div className="w-full max-w-md text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow animate-pulse">
          <Snowflake className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">FrostGuard AI</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Affordable Intelligence for Temperature-Sensitive Logistics
        </p>

        {!ready ? (
          <div className="mt-10">
            <div className="mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-1/2 animate-[loader_1.6s_ease-in-out_infinite] rounded-full bg-gradient-primary" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Loading…</p>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-3">
            <Button
              size="lg"
              className="bg-gradient-primary shadow-elegant"
              onClick={() => navigate({ to: "/install" })}
            >
              Launch App <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        )}
        <div className="mt-10 opacity-60"><Logo size="sm" /></div>
      </div>
      <style>{`@keyframes loader { 0% { transform: translateX(-100%) } 100% { transform: translateX(200%) } }`}</style>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ArrowRight, ShieldCheck, ScanLine, BrainCircuit, Activity, Snowflake, Heart, Truck, Stethoscope, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FrostGuard AI — Affordable cold-chain monitoring" },
      { name: "description", content: "AI-powered cold-chain monitoring for vaccines, insulin and perishables — using low-cost passive indicators and QR scans." },
      { property: "og:title", content: "FrostGuard AI" },
      { property: "og:description", content: "Protecting critical shipments without expensive hardware." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#problem" className="hover:text-foreground">Problem</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#impact" className="hover:text-foreground">Impact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/app/dashboard">Sign in</Link></Button>
            <Button asChild size="sm" className="bg-gradient-primary shadow-elegant">
              <Link to="/app/dashboard">Launch app <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 -z-10 opacity-40"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.72 0.13 185 / 0.25), transparent 40%), radial-gradient(circle at 80% 30%, oklch(0.62 0.18 250 / 0.25), transparent 40%)" }} />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">
                <Snowflake className="h-3.5 w-3.5 text-teal" />
                Passive indicators · QR scans · AI analysis
              </div>
              <h1 className="mt-5 font-display text-5xl font-bold tracking-tight lg:text-6xl">
                Protecting critical shipments <span className="text-gradient">without expensive hardware</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                FrostGuard AI turns a ₹5 sticker and a smartphone camera into a complete cold-chain monitoring system — for vaccines, insulin, blood samples and perishables.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-primary shadow-elegant">
                  <Link to="/app/dashboard">Open dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/app/scan">Try the QR scanner</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" /> Used by 14 PHC networks</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal" /> Government-ready audit trail</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-teal opacity-20 blur-2xl" />
              <div className="relative rounded-3xl border border-border bg-card p-6 shadow-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Shipment</div>
                    <div className="font-mono text-sm font-semibold">FG-2026-00184</div>
                  </div>
                  <span className="rounded-full border border-success/30 bg-success/15 px-2.5 py-1 text-xs font-medium text-success">Safe</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-secondary p-4">
                    <div className="text-xs text-muted-foreground">Health score</div>
                    <div className="mt-1 font-display text-4xl font-bold text-success">96</div>
                    <div className="text-xs text-success">Excellent</div>
                  </div>
                  <div className="rounded-2xl bg-secondary p-4">
                    <div className="text-xs text-muted-foreground">AI confidence</div>
                    <div className="mt-1 font-display text-4xl font-bold">94%</div>
                    <div className="text-xs text-muted-foreground">indicator: white</div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-border p-4">
                  <div className="flex items-center gap-2 text-sm font-medium"><BrainCircuit className="h-4 w-4 text-teal" /> AI reasoning</div>
                  <p className="mt-1 text-sm text-muted-foreground">Indicator color matches baseline white. No prolonged thermal exposure detected across 3 scan checkpoints.</p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"><Truck className="h-3.5 w-3.5" /></div>
                  Chennai → Villupuram · 240 vials · MMR vaccine
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-teal">The problem</div>
            <h2 className="mt-2 font-display text-4xl font-bold">Electronic trackers cost ₹5,000–₹12,000 per shipment.</h2>
            <p className="mt-4 text-muted-foreground">
              Rural PHCs, NGOs and small distributors can't afford IoT loggers — so spoiled vaccines, insulin and blood samples reach patients without anyone knowing.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { n: "25%", l: "Vaccines wasted globally due to cold-chain failures" },
              { n: "₹5", l: "Cost of one FrostGuard passive indicator" },
              { n: "0", l: "Batteries, calibration or replacement needed" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-teal">How it works</div>
            <h2 className="mt-2 font-display text-4xl font-bold">Three steps. No hardware to maintain.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Stick & ship", d: "Attach a passive temperature-indicator sticker and the FrostGuard QR onto every package before dispatch.", i: Snowflake },
              { n: "02", t: "Scan en route", d: "At each checkpoint, staff scan the QR and photograph the indicator with any smartphone.", i: ScanLine },
              { n: "03", t: "AI verdict", d: "Our model reads the sticker color, scores shipment health and flags risk — instantly.", i: BrainCircuit },
            ].map((s) => {
              const Icon = s.i;
              return (
                <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:shadow-elegant">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-2xl font-bold text-muted-foreground/40">{s.n}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              );
            })}
          </div>

          {/* indicator legend */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-sm font-semibold">What the indicator color means</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                { c: "#ffffff", b: "border-border", l: "White", s: "Safe", I: CheckCircle2, t: "text-success" },
                { c: "#bfdbfe", b: "border-border", l: "Light blue", s: "Minor exposure", I: AlertTriangle, t: "text-warning" },
                { c: "#60a5fa", b: "border-border", l: "Medium blue", s: "Warning", I: AlertTriangle, t: "text-warning" },
                { c: "#1d4ed8", b: "border-border", l: "Dark blue", s: "Compromised", I: XCircle, t: "text-destructive" },
              ].map((x) => (
                <div key={x.l} className={`flex items-center gap-3 rounded-xl border ${x.b} p-3`}>
                  <div className="h-10 w-10 rounded-lg border border-border" style={{ background: x.c }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{x.l}</div>
                    <div className={`flex items-center gap-1 text-xs ${x.t}`}><x.I className="h-3 w-3" />{x.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-xs font-semibold uppercase tracking-widest text-teal">Platform</div>
        <h2 className="mt-2 max-w-2xl font-display text-4xl font-bold">Everything a health logistics team needs — in one console.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Activity, t: "Real-time health score", d: "0–100 score per shipment with visual gauge and audit trail." },
            { i: BrainCircuit, t: "AI risk reasoning", d: "Plain-language explanations behind every flagged shipment." },
            { i: ScanLine, t: "Mobile QR + camera capture", d: "Works on any Android phone at the last mile." },
            { i: ShieldCheck, t: "Audit-ready logs", d: "Tamper-resistant scan history with timestamp, GPS and operator." },
            { i: Heart, t: "Patient impact lens", d: "Tie compromised batches back to facility, route and product type." },
            { i: Truck, t: "Route analytics", d: "Discover risky corridors, time windows and handover failures." },
          ].map((f) => {
            const Icon = f.i;
            return (
              <div key={f.t} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="bg-gradient-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <h2 className="font-display text-4xl font-bold">Measured impact, not marketing.</h2>
              <p className="mt-3 max-w-lg text-primary-foreground/80">
                Pilot deployments across district health networks show what affordable, AI-backed cold-chain looks like at scale.
              </p>
            </div>
            {[
              { n: "1.2M+", l: "Doses verified safe" },
              { n: "97.4%", l: "Indicator-reading accuracy" },
              { n: "₹38L", l: "Spoilage avoided in Q1" },
              { n: "14", l: "District networks live" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur">
                <div className="font-display text-3xl font-bold">{s.n}</div>
                <div className="mt-1 text-sm text-primary-foreground/80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight lg:text-5xl">
          Start protecting your next shipment today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Walk through the live demo — register a shipment, scan an indicator, and see the AI verdict in seconds.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-gradient-primary shadow-elegant">
            <Link to="/app/register">Register a shipment <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline"><Link to="/app/dashboard">View dashboard</Link></Button>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground md:flex-row">
          <Logo size="sm" />
          <div>© {new Date().getFullYear()} FrostGuard AI · Affordable intelligence for temperature-sensitive logistics</div>
        </div>
      </footer>
    </div>
  );
}

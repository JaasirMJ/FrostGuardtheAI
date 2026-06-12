import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { HealthGauge } from "@/components/HealthGauge";
import { shipments, statusMeta } from "@/lib/mock-data";
import { MapPin, Clock, Search } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track shipment · FrostGuard" }] }),
  component: Track,
});

function Track() {
  const [q, setQ] = useState("");
  const [found, setFound] = useState<typeof shipments[number] | null>(null);
  const [err, setErr] = useState("");
  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const s = shipments.find((x) => x.uid.toLowerCase() === q.trim().toLowerCase()) ?? shipments[0];
    if (!s) { setErr("No shipment found."); return; }
    setErr(""); setFound(s);
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/"><Logo /></Link>
          <Link to="/auth" className="text-sm text-primary hover:underline">Sign in</Link>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold">Track your shipment</h1>
        <p className="mt-1 text-sm text-muted-foreground">Public users can enter a shipment UID to view its live status.</p>

        <Card className="mt-6 p-5">
          <form onSubmit={run} className="flex gap-2">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="FG-VAC-CHN-20260612-X9A7K" className="font-mono" />
            <Button type="submit" className="bg-gradient-primary"><Search className="h-4 w-4" /></Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">Try: {shipments[0].uid}</p>
        </Card>

        {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

        {found && (
          <Card className="mt-6 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Shipment</div>
                <div className="font-mono font-semibold">{found.uid}</div>
                <div className="mt-1 text-lg font-semibold">{found.product} · {found.category}</div>
                <div className="text-xs text-muted-foreground">{found.origin} → {found.destination}</div>
                <Badge variant="outline" className={`${statusMeta[found.status].tone} mt-2`}>{statusMeta[found.status].label}</Badge>
              </div>
              <HealthGauge value={found.health} />
            </div>
            <div className="mt-5">
              <div className="text-sm font-medium">Journey timeline</div>
              <div className="mt-2 space-y-2">
                {found.scans.map((s, i) => (
                  <div key={i} className="rounded-lg border border-border p-3 text-sm">
                    <div className="flex items-center gap-2 font-medium"><MapPin className="h-3.5 w-3.5 text-primary" />{s.location}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{s.time}</span>
                      <span>Risk: {s.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

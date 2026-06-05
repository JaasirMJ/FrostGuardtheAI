import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { shipments, statusMeta } from "@/lib/mock-data";
import { HealthGauge } from "@/components/HealthGauge";
import { Search, MapPin, Clock, User } from "lucide-react";

export const Route = createFileRoute("/app/shipments")({
  head: () => ({ meta: [{ title: "Shipments · FrostGuard" }] }),
  component: ShipmentsPage,
});

function ShipmentsPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(shipments[0]);
  const filtered = shipments.filter((s) =>
    [s.uid, s.product, s.origin, s.destination].join(" ").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Shipments</h1>
        <p className="text-sm text-muted-foreground">Browse, filter and inspect any shipment.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search UID, product or city…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="space-y-2">
            {filtered.map((s) => (
              <button key={s.uid} onClick={() => setActive(s)}
                className={`w-full rounded-xl border p-3 text-left transition ${active.uid === s.uid ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-muted-foreground">{s.uid}</div>
                  <Badge variant="outline" className={statusMeta[s.status].tone}>{statusMeta[s.status].label}</Badge>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.product} · {s.category}</div>
                    <div className="text-xs text-muted-foreground">{s.origin} → {s.destination}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold">{s.health}</div>
                    <div className="text-[10px] uppercase text-muted-foreground">health</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Shipment</div>
                <div className="font-mono font-semibold">{active.uid}</div>
                <div className="mt-1 text-lg font-semibold">{active.product}</div>
                <div className="text-xs text-muted-foreground">{active.category}</div>
              </div>
              <HealthGauge value={active.health} size={120} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">Origin</div><div className="font-medium">{active.origin}</div></div>
              <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">Destination</div><div className="font-medium">{active.destination}</div></div>
              <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">Risk</div><div className="font-medium">{active.risk}</div></div>
              <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">AI confidence</div><div className="font-medium">{active.confidence}%</div></div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="font-semibold">Scan history</div>
            <div className="mt-4 space-y-3">
              {active.scans.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium"><MapPin className="h-3 w-3 text-muted-foreground" />{s.location}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{s.time}</span>
                      <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{s.user}</span>
                      <span>Risk: {s.risk}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

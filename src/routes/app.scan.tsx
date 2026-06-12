import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { shipments, statusMeta } from "@/lib/mock-data";
import { ScanLine, Camera, MapPin, Clock, Thermometer, Truck, User } from "lucide-react";

export const Route = createFileRoute("/app/scan")({
  head: () => ({ meta: [{ title: "Scan QR · FrostGuard" }] }),
  component: Scan,
});

const riskTone: Record<string, string> = {
  Low: "text-success", Medium: "text-warning", High: "text-destructive",
};

function Scan() {
  const [scanned, setScanned] = useState<typeof shipments[number] | null>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Scan shipment QR</h1>
        <p className="text-sm text-muted-foreground">Point your camera at the QR sticker — or pick a demo shipment.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              <div className="text-center">
                <Camera className="mx-auto h-10 w-10 opacity-50" />
                <div className="mt-2 text-sm">Camera preview</div>
              </div>
            </div>
            <div className="absolute inset-10 rounded-2xl border-2 border-primary/60" />
            <div className="absolute inset-x-10 top-10 h-0.5 animate-pulse bg-primary" />
          </div>
          <div className="mt-4 grid gap-2">
            <div className="text-xs font-medium text-muted-foreground">Try a demo scan:</div>
            <div className="flex flex-wrap gap-2">
              {shipments.slice(0, 4).map((s) => (
                <Button key={s.uid} variant="outline" size="sm" onClick={() => setScanned(s)}>
                  <ScanLine className="mr-1 h-3.5 w-3.5" />{s.uid.slice(0, 18)}…
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          {scanned ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">Shipment</div>
                  <div className="font-mono text-sm font-semibold break-all">{scanned.uid}</div>
                  <div className="mt-1 text-lg font-semibold">{scanned.product}</div>
                  <div className="text-xs text-muted-foreground">{scanned.origin} → {scanned.destination}</div>
                </div>
                <Badge variant="outline" className={statusMeta[scanned.status].tone}>{statusMeta[scanned.status].label}</Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-secondary p-2.5"><div className="text-muted-foreground">Dealer</div><div className="mt-0.5 font-mono">{scanned.dealer ?? "—"}</div></div>
                <div className="rounded-lg bg-secondary p-2.5"><div className="text-muted-foreground flex items-center gap-1"><Thermometer className="h-3 w-3" />Temp class</div><div className="mt-0.5 font-medium">{scanned.tempClass ?? "—"}</div></div>
                <div className="rounded-lg bg-secondary p-2.5"><div className="text-muted-foreground flex items-center gap-1"><Truck className="h-3 w-3" />Quantity</div><div className="mt-0.5 font-medium">{scanned.quantity}</div></div>
                <div className="rounded-lg bg-secondary p-2.5"><div className="text-muted-foreground">Category</div><div className="mt-0.5 font-medium">{scanned.category}</div></div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium">Scan timeline</div>
                <div className="mt-2 space-y-2">
                  {scanned.scans.map((s, i) => (
                    <div key={i} className="rounded-lg border border-border p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium text-foreground"><MapPin className="h-3 w-3" />{s.location}</div>
                        <span className={`text-xs font-semibold ${riskTone[s.risk] ?? ""}`}>{s.risk}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{s.time}</span>
                        <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{s.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild className="mt-5 w-full bg-gradient-primary shadow-elegant">
                <Link to="/app/analysis">Capture indicator sticker →</Link>
              </Button>
            </>
          ) : (
            <div className="grid h-full place-items-center text-center text-muted-foreground">
              <div>
                <ScanLine className="mx-auto h-10 w-10 opacity-60" />
                <div className="mt-2 text-sm">Scan results will appear here</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

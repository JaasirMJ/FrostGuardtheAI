import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, trend, categoryRisk, shipments, statusMeta, insights } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, ShieldCheck, AlertTriangle, XCircle, Boxes, Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · FrostGuard" }] }),
  component: Dashboard,
});

function KpiCard({ icon: Icon, label, value, tone, delta }: any) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
          <div className="mt-1 font-display text-3xl font-bold">{value.toLocaleString()}</div>
          {delta && <div className="mt-1 text-xs text-success flex items-center gap-1"><ArrowUpRight className="h-3 w-3" />{delta}</div>}
        </div>
        <div className={`h-10 w-10 rounded-xl grid place-items-center ${tone}`}><Icon className="h-5 w-5" /></div>
      </div>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Cold-chain operations</h1>
          <p className="text-sm text-muted-foreground">Live overview across all registered shipments.</p>
        </div>
        <Button asChild className="bg-gradient-primary shadow-elegant"><Link to="/app/register">+ New shipment</Link></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Boxes} label="Total shipments" value={kpis.total} tone="bg-primary/10 text-primary" delta="+4.2% this week" />
        <KpiCard icon={ShieldCheck} label="Safe" value={kpis.safe} tone="bg-success/15 text-success" delta="86.3% rate" />
        <KpiCard icon={AlertTriangle} label="Warning" value={kpis.warning} tone="bg-warning/15 text-warning" />
        <KpiCard icon={XCircle} label="Compromised" value={kpis.compromised} tone="bg-destructive/15 text-destructive" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Shipment status — last 7 days</div>
              <div className="text-xs text-muted-foreground">Stacked daily volume</div>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="safe" stackId="1" stroke="var(--color-success)" fill="url(#g1)" />
                <Area type="monotone" dataKey="warning" stackId="1" stroke="var(--color-warning)" fill="url(#g2)" />
                <Area type="monotone" dataKey="compromised" stackId="1" stroke="var(--color-destructive)" fill="url(#g3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-semibold">Category risk</div>
          <div className="text-xs text-muted-foreground">% of compromised shipments</div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={categoryRisk}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="risk" radius={[6, 6, 0, 0]} fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Recent shipments</div>
            <Link to="/app/shipments" className="text-xs font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-medium">UID</th>
                  <th className="py-2 text-left font-medium">Product</th>
                  <th className="py-2 text-left font-medium">Route</th>
                  <th className="py-2 text-left font-medium">Health</th>
                  <th className="py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.slice(0, 6).map((s) => (
                  <tr key={s.uid} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono text-xs">{s.uid}</td>
                    <td className="py-3">{s.product}</td>
                    <td className="py-3 text-muted-foreground">{s.origin} → {s.destination}</td>
                    <td className="py-3 font-semibold">{s.health}</td>
                    <td className="py-3"><Badge variant="outline" className={statusMeta[s.status].tone}>{statusMeta[s.status].label}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-teal" /> AI insights</div>
          <div className="mt-4 space-y-3">
            {insights.map((i) => (
              <div key={i.title} className="rounded-xl border border-border p-3">
                <div className={`text-xs font-semibold ${i.tone === "success" ? "text-success" : i.tone === "warning" ? "text-warning" : "text-destructive"}`}>{i.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{i.body}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" /> Regional map</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { r: "Tamil Nadu", s: 412, w: 32, c: 8 },
            { r: "Karnataka", s: 268, w: 24, c: 11 },
            { r: "Maharashtra", s: 221, w: 36, c: 17 },
            { r: "Gujarat", s: 208, w: 32, c: 15 },
          ].map((x) => (
            <div key={x.r} className="rounded-xl border border-border p-4">
              <div className="text-sm font-medium">{x.r}</div>
              <div className="mt-2 flex items-end gap-1.5">
                <span className="h-2 rounded-full bg-success" style={{ width: `${x.s / 5}px` }} />
                <span className="h-2 rounded-full bg-warning" style={{ width: `${x.w}px` }} />
                <span className="h-2 rounded-full bg-destructive" style={{ width: `${x.c * 2}px` }} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{x.s} safe · {x.w} warn · {x.c} comp.</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

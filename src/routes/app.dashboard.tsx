import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, trend, categoryRisk, shipments, statusMeta, insights, recentActivity, cityHeat, heatColor } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, ShieldCheck, AlertTriangle, XCircle, Boxes, Sparkles, MapPin, Truck, CheckCircle2, Clock, BellRing, Activity } from "lucide-react";

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
          <div className="mt-1 font-display text-2xl font-bold">{value.toLocaleString()}</div>
          {delta && <div className="mt-1 text-xs text-success flex items-center gap-1"><ArrowUpRight className="h-3 w-3" />{delta}</div>}
        </div>
        <div className={`h-9 w-9 rounded-xl grid place-items-center ${tone}`}><Icon className="h-4 w-4" /></div>
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <KpiCard icon={Boxes} label="Total shipments" value={kpis.total} tone="bg-primary/10 text-primary" delta="+4.2%" />
        <KpiCard icon={Truck} label="Active" value={kpis.active} tone="bg-teal/10 text-teal" />
        <KpiCard icon={CheckCircle2} label="Delivered" value={kpis.delivered} tone="bg-success/15 text-success" />
        <KpiCard icon={ShieldCheck} label="Safe" value={kpis.safe} tone="bg-success/15 text-success" />
        <KpiCard icon={AlertTriangle} label="Warning" value={kpis.warning} tone="bg-warning/15 text-warning" />
        <KpiCard icon={XCircle} label="Compromised" value={kpis.compromised} tone="bg-destructive/15 text-destructive" />
        <KpiCard icon={Clock} label="Delayed" value={kpis.delayed} tone="bg-warning/15 text-warning" />
        <KpiCard icon={BellRing} label="AI Alerts" value={kpis.aiAlerts} tone="bg-primary/10 text-primary" />
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
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} /></linearGradient>
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
          <div className="flex items-center gap-2 font-semibold"><Activity className="h-4 w-4 text-primary" /> Recent activity</div>
          <div className="mt-3 space-y-2.5">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <div className="text-xs font-mono text-muted-foreground w-16 shrink-0 pt-0.5">{a.time}</div>
                <div className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${a.tone === "warning" ? "bg-warning" : a.tone === "destructive" ? "bg-destructive" : "bg-primary"}`} />
                <div className="text-foreground">{a.text}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" /> India risk heatmap</div>
            <div className="flex gap-3 text-xs">
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" />Safe</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" />Warning</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" />High risk</span>
            </div>
          </div>
          <div className="relative mt-4 h-[360px] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary/50 to-background">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {/* stylized india silhouette */}
              <path d="M30,18 Q42,8 56,14 Q72,16 80,22 Q88,32 84,42 Q92,48 86,56 Q92,64 82,68 Q78,78 70,82 Q62,92 54,90 Q48,98 42,90 Q34,86 32,76 Q22,68 26,58 Q18,52 24,42 Q22,32 30,18 Z"
                fill="oklch(0.95 0.02 220)" stroke="oklch(0.85 0.03 220)" strokeWidth="0.5" opacity="0.6" />
              {cityHeat.map((c) => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r={Math.max(1.6, Math.min(4, c.count / 90))} fill={heatColor[c.level]} opacity="0.85">
                    <animate attributeName="r" values={`${Math.max(1.6, Math.min(4, c.count/90))};${Math.max(2.4, Math.min(5.5, c.count/70))};${Math.max(1.6, Math.min(4, c.count/90))}`} dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={c.x} cy={c.y} r={Math.max(2.4, Math.min(6.5, c.count / 60))} fill={heatColor[c.level]} opacity="0.2" />
                </g>
              ))}
            </svg>
            <div className="pointer-events-none absolute inset-0">
              {cityHeat.map((c) => (
                <div key={c.name} className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-foreground/80"
                  style={{ left: `${c.x}%`, top: `${c.y + 3}%` }}>{c.name}</div>
              ))}
            </div>
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
    </div>
  );
}

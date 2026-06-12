import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shipments, statusMeta, notifications } from "@/lib/mock-data";
import { Search, Plus, Ban, Pencil } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin · FrostGuard" }] }),
  component: Admin,
});

const tabs = ["Shipments", "Dealers", "Users", "Scan logs", "AI Alerts"] as const;

function Admin() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Shipments");
  const [q, setQ] = useState("");

  const dealers = [
    { id: "DLR-CHN-2045", name: "Chennai South Cold Hub", region: "Tamil Nadu", shipments: 412, status: "Active" },
    { id: "DLR-BLR-1810", name: "Bengaluru MediDistro", region: "Karnataka", shipments: 268, status: "Active" },
    { id: "DLR-MUM-3320", name: "Mumbai Lab Logistics", region: "Maharashtra", shipments: 311, status: "Suspended" },
    { id: "DLR-HYD-9120", name: "Hyderabad Pharma Net", region: "Telangana", shipments: 221, status: "Active" },
    { id: "DLR-COK-7710", name: "Kochi Coast Carriers", region: "Kerala", shipments: 134, status: "Active" },
  ];

  const users = [
    { name: "R. Selvam", role: "Dealer", region: "Tamil Nadu", scans: 142 },
    { name: "Apollo Greams Rd", role: "Hospital", region: "Tamil Nadu", scans: 96 },
    { name: "M. Iyer", role: "Distributor", region: "Karnataka", scans: 211 },
    { name: "Govt of Maharashtra", role: "Government", region: "Maharashtra", scans: 58 },
    { name: "PathLabs NGO", role: "NGO", region: "All India", scans: 73 },
  ];

  const logs = shipments.flatMap((s) => s.scans.map((sc) => ({ uid: s.uid, ...sc, product: s.product })));

  const filteredShipments = useMemo(() => shipments.filter((s) =>
    [s.uid, s.product, s.origin, s.destination, s.dealer ?? ""].join(" ").toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Admin panel</h1>
        <p className="text-sm text-muted-foreground">Manage shipments, dealers, users, scan logs and AI alerts.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
            {t}
          </button>
        ))}
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${tab.toLowerCase()}…`} className="pl-9" />
          </div>
          {tab === "Dealers" && <Button className="bg-gradient-primary"><Plus className="mr-1 h-4 w-4" />Add dealer</Button>}
        </div>

        <div className="mt-4 overflow-x-auto">
          {tab === "Shipments" && (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr className="border-b border-border">
                <th className="py-2 text-left font-medium">UID</th><th className="py-2 text-left font-medium">Product</th>
                <th className="py-2 text-left font-medium">Route</th><th className="py-2 text-left font-medium">Dealer</th>
                <th className="py-2 text-left font-medium">Status</th>
              </tr></thead>
              <tbody>
                {filteredShipments.map((s) => (
                  <tr key={s.uid} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono text-xs">{s.uid}</td>
                    <td className="py-3">{s.product}</td>
                    <td className="py-3 text-muted-foreground">{s.origin} → {s.destination}</td>
                    <td className="py-3 font-mono text-xs">{s.dealer}</td>
                    <td className="py-3"><Badge variant="outline" className={statusMeta[s.status].tone}>{statusMeta[s.status].label}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "Dealers" && (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr className="border-b border-border">
                <th className="py-2 text-left font-medium">Dealer ID</th><th className="py-2 text-left font-medium">Name</th>
                <th className="py-2 text-left font-medium">Region</th><th className="py-2 text-left font-medium">Shipments</th>
                <th className="py-2 text-left font-medium">Status</th><th className="py-2 text-right font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {dealers.map((d) => (
                  <tr key={d.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono text-xs">{d.id}</td>
                    <td className="py-3">{d.name}</td>
                    <td className="py-3 text-muted-foreground">{d.region}</td>
                    <td className="py-3">{d.shipments}</td>
                    <td className="py-3"><Badge variant="outline" className={d.status === "Active" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"}>{d.status}</Badge></td>
                    <td className="py-3 text-right">
                      <Button size="sm" variant="ghost"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost"><Ban className="h-3.5 w-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "Users" && (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr className="border-b border-border">
                <th className="py-2 text-left font-medium">Name</th><th className="py-2 text-left font-medium">Role</th>
                <th className="py-2 text-left font-medium">Region</th><th className="py-2 text-left font-medium">Scans</th>
              </tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.name} className="border-b border-border/60 last:border-0">
                    <td className="py-3">{u.name}</td>
                    <td className="py-3"><Badge variant="outline">{u.role}</Badge></td>
                    <td className="py-3 text-muted-foreground">{u.region}</td>
                    <td className="py-3">{u.scans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "Scan logs" && (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr className="border-b border-border">
                <th className="py-2 text-left font-medium">Time</th><th className="py-2 text-left font-medium">UID</th>
                <th className="py-2 text-left font-medium">Product</th><th className="py-2 text-left font-medium">Location</th>
                <th className="py-2 text-left font-medium">User</th><th className="py-2 text-left font-medium">Risk</th>
              </tr></thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono text-xs">{l.time}</td>
                    <td className="py-3 font-mono text-xs">{l.uid}</td>
                    <td className="py-3">{l.product}</td>
                    <td className="py-3 text-muted-foreground">{l.location}</td>
                    <td className="py-3">{l.user}</td>
                    <td className="py-3">{l.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "AI Alerts" && (
            <div className="space-y-2">
              {notifications.map((n, i) => (
                <div key={i} className={`rounded-xl border p-4 text-sm ${
                  n.tone === "destructive" ? "border-destructive/30 bg-destructive/5" :
                  n.tone === "warning" ? "border-warning/30 bg-warning/5" :
                  "border-primary/30 bg-primary/5"
                }`}>{n.text}</div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shipments, statusMeta } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin · FrostGuard" }] }),
  component: Admin,
});

const tabs = ["Shipments", "Users", "Scan logs"] as const;

function Admin() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Shipments");
  const [q, setQ] = useState("");

  const users = [
    { name: "R. Selvam", role: "Field Operator", region: "Tamil Nadu", scans: 142 },
    { name: "A. Devi", role: "Relay Lead", region: "Tamil Nadu", scans: 96 },
    { name: "M. Iyer", role: "DC Manager", region: "Karnataka", scans: 211 },
    { name: "P. Nair", role: "Distributor", region: "Karnataka", scans: 58 },
    { name: "S. Khan", role: "Lab Tech", region: "Maharashtra", scans: 73 },
  ];

  const logs = shipments.flatMap((s) => s.scans.map((sc) => ({ uid: s.uid, ...sc, product: s.product })));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Admin panel</h1>
        <p className="text-sm text-muted-foreground">Manage shipments, users and audit logs across the network.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl bg-secondary p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === t ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <Card className="overflow-hidden">
        {tab === "Shipments" && (
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">UID</th>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Route</th>
                <th className="px-4 py-3 text-left font-medium">Qty</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {shipments.filter((s) => JSON.stringify(s).toLowerCase().includes(q.toLowerCase())).map((s) => (
                <tr key={s.uid} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs">{s.uid}</td>
                  <td className="px-4 py-3">{s.product}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.origin} → {s.destination}</td>
                  <td className="px-4 py-3">{s.quantity}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className={statusMeta[s.status].tone}>{statusMeta[s.status].label}</Badge></td>
                  <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">Manage</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "Users" && (
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground bg-secondary/50">
              <tr><th className="px-4 py-3 text-left font-medium">Name</th><th className="px-4 py-3 text-left font-medium">Role</th><th className="px-4 py-3 text-left font-medium">Region</th><th className="px-4 py-3 text-left font-medium">Scans</th></tr>
            </thead>
            <tbody>
              {users.filter((u) => JSON.stringify(u).toLowerCase().includes(q.toLowerCase())).map((u) => (
                <tr key={u.name} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.role}</td>
                  <td className="px-4 py-3">{u.region}</td>
                  <td className="px-4 py-3">{u.scans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "Scan logs" && (
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground bg-secondary/50">
              <tr><th className="px-4 py-3 text-left font-medium">Time</th><th className="px-4 py-3 text-left font-medium">UID</th><th className="px-4 py-3 text-left font-medium">Location</th><th className="px-4 py-3 text-left font-medium">User</th><th className="px-4 py-3 text-left font-medium">Risk</th></tr>
            </thead>
            <tbody>
              {logs.filter((l) => JSON.stringify(l).toLowerCase().includes(q.toLowerCase())).map((l, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 text-muted-foreground">{l.time}</td>
                  <td className="px-4 py-3 font-mono text-xs">{l.uid}</td>
                  <td className="px-4 py-3">{l.location}</td>
                  <td className="px-4 py-3">{l.user}</td>
                  <td className="px-4 py-3">{l.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

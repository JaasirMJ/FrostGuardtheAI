import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · FrostGuard AI" },
      { name: "description", content: "Affordable SaaS plans for hospitals, distributors and government health programs." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  { name: "Starter", price: "₹499", per: "/month", desc: "For small clinics and independent dealers.", features: ["Up to 200 shipments/mo", "QR + indicator AI analysis", "Web dashboard", "Email support"] },
  { name: "Hospital", price: "₹2,999", per: "/month", desc: "For hospitals and multi-site pharmacy networks.", features: ["Up to 5,000 shipments/mo", "Multi-user roles", "Route risk AI", "Priority support"], featured: true },
  { name: "Enterprise", price: "₹24,999", per: "/month", desc: "For pharma distributors and large NGOs.", features: ["Unlimited shipments", "API & ERP integrations", "Batch failure detection", "Dedicated success manager"] },
  { name: "Government", price: "Custom", per: "", desc: "For health ministries and public programs.", features: ["State-wide deployments", "On-premise option", "Custom dashboards", "Audit & compliance"] },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/"><Logo /></Link>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
            <Button asChild size="sm" className="bg-gradient-primary"><Link to="/splash">Launch app</Link></Button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal">Pricing</div>
          <h1 className="mt-2 font-display text-4xl font-bold">Affordable for every scale of cold-chain</h1>
          <p className="mt-3 text-muted-foreground">Replace expensive IoT trackers with passive indicators + AI. Pay per network, not per device.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t) => (
            <Card key={t.name} className={`p-6 ${t.featured ? "border-primary shadow-glow" : ""}`}>
              {t.featured && <div className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Most popular</div>}
              <div className="font-display text-xl font-bold">{t.name}</div>
              <div className="mt-2 flex items-end gap-1">
                <span className="font-display text-3xl font-bold">{t.price}</span>
                <span className="pb-1 text-sm text-muted-foreground">{t.per}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{f}</li>
                ))}
              </ul>
              <Button className={`mt-5 w-full ${t.featured ? "bg-gradient-primary shadow-elegant" : ""}`} variant={t.featured ? "default" : "outline"}>
                {t.price === "Custom" ? "Contact sales" : "Start trial"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

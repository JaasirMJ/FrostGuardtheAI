import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { ShieldCheck, Building2, Stethoscope, Truck, User, Landmark } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in · FrostGuard" }] }),
  component: Auth,
});

const profiles = [
  { id: "gov", label: "Government", icon: Landmark, desc: "Health ministry dashboard" },
  { id: "hosp", label: "Hospital", icon: Stethoscope, desc: "Apollo, PHC, Clinics" },
  { id: "dist", label: "Distributor", icon: Building2, desc: "Pharma companies" },
  { id: "dealer", label: "Dealer", icon: Truck, desc: "Regional warehouses" },
  { id: "public", label: "Public", icon: User, desc: "Track your shipment" },
];

function Auth() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("dealer");
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: profile === "public" ? "/track" : "/app/dashboard" });
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-hero p-12 lg:flex relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-50"
            style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.72 0.13 185 / 0.3), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.62 0.18 250 / 0.3), transparent 45%)" }}
          />
          <Logo />
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight">
              Trusted by health ministries, NGOs and pharma networks.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Sign in to your role-specific console — or track a shipment as a public user with just a UID.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-teal" /> SOC2-ready · Audit trail · End-to-end encrypted
            </div>
          </div>
          <div className="text-xs text-muted-foreground">© FrostGuard AI</div>
        </div>

        <div className="grid place-items-center p-6 lg:p-12">
          <Card className="w-full max-w-md p-8">
            <div className="lg:hidden mb-6"><Logo size="sm" /></div>
            <h2 className="font-display text-2xl font-bold">Sign in to FrostGuard</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose your profile, then continue.</p>

            <div className="mt-5 grid grid-cols-5 gap-1.5">
              {profiles.map((p) => {
                const I = p.icon; const active = p.id === profile;
                return (
                  <button key={p.id} onClick={() => setProfile(p.id)}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-[10px] font-medium transition ${active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                    <I className="h-4 w-4" />{p.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{profiles.find(p => p.id === profile)?.desc}</p>

            {profile === "public" ? (
              <form onSubmit={go} className="mt-6 space-y-3">
                <div>
                  <Label>Shipment UID</Label>
                  <Input placeholder="FG-VAC-CHN-20260612-X9A7K" className="font-mono mt-1.5" />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Track shipment</Button>
              </form>
            ) : (
              <Tabs defaultValue="email" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone OTP</TabsTrigger>
                  <TabsTrigger value="dealer">Dealer ID</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={go} className="space-y-3 pt-3">
                    <div><Label>Email</Label><Input type="email" placeholder="you@hospital.org" className="mt-1.5" /></div>
                    <div><Label>Password</Label><Input type="password" placeholder="••••••••" className="mt-1.5" /></div>
                    <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Sign in</Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  <form onSubmit={go} className="space-y-3 pt-3">
                    <div><Label>Phone</Label>
                      <div className="mt-1.5 flex gap-2">
                        <span className="grid w-14 place-items-center rounded-md border border-input bg-secondary text-sm">+91</span>
                        <Input placeholder="98765 43210" />
                      </div>
                    </div>
                    <div><Label>OTP</Label><Input placeholder="6-digit code" className="mt-1.5" /></div>
                    <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Verify & continue</Button>
                  </form>
                </TabsContent>
                <TabsContent value="dealer">
                  <form onSubmit={go} className="space-y-3 pt-3">
                    <div><Label>Dealer ID</Label><Input placeholder="DLR-CHN-2045" className="font-mono mt-1.5" /></div>
                    <div><Label>Password</Label><Input type="password" placeholder="••••••••" className="mt-1.5" /></div>
                    <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Sign in</Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}

            <p className="mt-6 text-center text-xs text-muted-foreground">
              New here? <Link to="/install" className="text-primary hover:underline">Get the mobile app</Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

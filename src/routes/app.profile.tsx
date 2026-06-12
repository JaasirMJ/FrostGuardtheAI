import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";
import { Bell, LogOut, Moon, Globe, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile · FrostGuard" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your dealer account, notifications and preferences.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-2xl font-bold text-primary-foreground">RS</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-display text-xl font-bold">R. Selvam</div>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Dealer</Badge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">selvam@frostguard-dealer.in · +91 98765 43210</div>
              <div className="mt-1 font-mono text-xs">DLR-CHN-2045 · Tamil Nadu</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-border p-3"><div className="text-xs text-muted-foreground">Shipments handled</div><div className="mt-1 font-display text-xl font-bold">412</div></div>
            <div className="rounded-xl border border-border p-3"><div className="text-xs text-muted-foreground">Success rate</div><div className="mt-1 font-display text-xl font-bold text-success">94.2%</div></div>
            <div className="rounded-xl border border-border p-3"><div className="text-xs text-muted-foreground">Warnings</div><div className="mt-1 font-display text-xl font-bold text-warning">17</div></div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3"><Moon className="h-4 w-4 text-muted-foreground" /><div><div className="text-sm font-medium">Dark mode</div><div className="text-xs text-muted-foreground">Use system preference</div></div></div>
              <Switch />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3"><Globe className="h-4 w-4 text-muted-foreground" /><div><div className="text-sm font-medium">Language</div><div className="text-xs text-muted-foreground">English (India)</div></div></div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-muted-foreground" /><div><div className="text-sm font-medium">Two-factor auth</div><div className="text-xs text-muted-foreground">SMS + Authenticator app</div></div></div>
              <Switch defaultChecked />
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth"><LogOut className="mr-1 h-4 w-4" /> Sign out</Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 font-semibold"><Bell className="h-4 w-4 text-primary" /> Notifications</div>
          <div className="mt-4 space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className={`rounded-xl border p-3 text-sm ${
                n.tone === "destructive" ? "border-destructive/30 bg-destructive/5" :
                n.tone === "warning" ? "border-warning/30 bg-warning/5" :
                "border-primary/30 bg-primary/5"
              }`}>
                {n.text}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

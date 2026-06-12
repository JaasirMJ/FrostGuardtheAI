import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, PackagePlus, ScanLine, FlaskConical, Bot, Boxes, ShieldCheck, Bell, Tag } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/shipments", label: "Shipments", icon: Boxes },
  { to: "/app/register", label: "Register", icon: PackagePlus },
  { to: "/app/scan", label: "Scan QR", icon: ScanLine },
  { to: "/app/analysis", label: "AI Analysis", icon: FlaskConical },
  { to: "/app/copilot", label: "AI Copilot", icon: Bot },
  { to: "/app/admin", label: "Admin", icon: ShieldCheck },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="px-5 py-5 border-b border-border">
          <Link to="/"><Logo /></Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = path.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-primary/10 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}>
                <Icon className="h-4 w-4" />{n.label}
              </Link>
            );
          })}
          <Link to="/pricing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent">
            <Tag className="h-4 w-4" />Pricing
          </Link>
        </nav>
        <div className="m-3 rounded-xl bg-gradient-teal p-4 text-teal-foreground">
          <div className="text-xs font-semibold opacity-80">Coverage</div>
          <div className="text-2xl font-display font-bold">86.4%</div>
          <div className="text-xs opacity-80">Shipments verified this week</div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
          <div className="flex h-14 items-center justify-between px-4 lg:px-8">
            <div className="lg:hidden"><Logo size="sm" /></div>
            <div className="hidden lg:block text-sm text-muted-foreground">
              {nav.find((n) => path.startsWith(n.to))?.label ?? "FrostGuard"}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
              <Link to="/app/profile" className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground hover:opacity-90" title="Profile">RS</Link>
            </div>
          </div>
          <nav className="lg:hidden flex gap-1 overflow-x-auto px-2 pb-2">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = path.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                    active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}>
                  <Icon className="h-3.5 w-3.5" />{n.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}

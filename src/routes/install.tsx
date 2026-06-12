import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Download, Smartphone, WifiOff, BrainCircuit, ScanLine, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/install")({
  head: () => ({ meta: [{ title: "Install FrostGuard" }] }),
  component: Install,
});

function Install() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Back to website</Link>
        </div>

        <Card className="overflow-hidden">
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.2fr] md:p-10">
            <div className="grid place-items-center rounded-2xl bg-gradient-hero p-8">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
                <div className="relative grid h-44 w-28 place-items-center rounded-[2rem] border-4 border-foreground/80 bg-background shadow-glow">
                  <Smartphone className="h-14 w-14 text-primary" />
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-teal">Mobile app</div>
              <h1 className="mt-1 font-display text-3xl font-bold">Download FrostGuard</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Get the full FrostGuard experience on your device — works in the field, even with patchy connectivity.
              </p>

              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  { icon: WifiOff, t: "Offline support" },
                  { icon: BrainCircuit, t: "On-device AI analysis" },
                  { icon: ScanLine, t: "QR shipment tracking" },
                  { icon: CheckCircle2, t: "Auto-sync when online" },
                ].map(({ icon: I, t }) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal/10 text-teal"><I className="h-4 w-4" /></span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button size="lg" className="bg-gradient-primary shadow-elegant">
                  <Download className="mr-1 h-4 w-4" /> Install App
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/auth">Use Web App</Link>
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Available on Android, iOS and as a PWA.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

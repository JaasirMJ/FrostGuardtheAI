import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HealthGauge } from "@/components/HealthGauge";
import { BrainCircuit, Upload, Sparkles, Calendar, Route as RouteIcon, Thermometer, AlertTriangle, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/app/analysis")({
  head: () => ({ meta: [{ title: "AI analysis · FrostGuard" }] }),
  component: Analysis,
});

type Ind = "white" | "light_blue" | "medium_blue" | "dark_blue";
const swatches: { id: Ind; color: string; label: string }[] = [
  { id: "white", color: "#ffffff", label: "White" },
  { id: "light_blue", color: "#bfdbfe", label: "Light blue" },
  { id: "medium_blue", color: "#60a5fa", label: "Medium blue" },
  { id: "dark_blue", color: "#1d4ed8", label: "Dark blue" },
];

type Verdict = {
  health: number; risk: string; severity: "Low" | "Moderate" | "Severe" | "None";
  conf: number; reasoning: string; tone: string;
  shelfLife: number; spoilage: number; routeRisk: number; delayHours: number;
  recommendations: string[];
};

const verdicts: Record<Ind, Verdict> = {
  white: {
    health: 96, risk: "Low", severity: "None", conf: 94, tone: "text-success",
    reasoning: "Indicator matches baseline white. No prolonged thermal exposure observed; cold chain intact.",
    shelfLife: 28, spoilage: 3, routeRisk: 8, delayHours: 0,
    recommendations: ["Maintain current cold-pack rotation cadence.", "Safe to release for clinical use."],
  },
  light_blue: {
    health: 82, risk: "Low–Medium", severity: "Low", conf: 89, tone: "text-success",
    reasoning: "Slight color shift consistent with a short out-of-range event (<15 min). Product likely safe but monitor next checkpoint.",
    shelfLife: 22, spoilage: 9, routeRisk: 16, delayHours: 1,
    recommendations: ["Re-scan at next checkpoint within 4 hours.", "Verify loading-bay temperature at origin."],
  },
  medium_blue: {
    health: 68, risk: "Medium", severity: "Moderate", conf: 87, tone: "text-warning",
    reasoning: "Moderate degradation suggests prolonged temperature exposure between 8–15°C. Recommend quality review before patient use.",
    shelfLife: 14, spoilage: 22, routeRisk: 32, delayHours: 3,
    recommendations: ["Quarantine batch pending QA approval.", "Investigate Trichy relay storage logs.", "Notify dealer DLR-CHN-2045."],
  },
  dark_blue: {
    health: 38, risk: "High", severity: "Severe", conf: 92, tone: "text-destructive",
    reasoning: "Strong saturation indicates extended exposure above safe threshold. Shipment likely compromised — quarantine batch.",
    shelfLife: 0, spoilage: 71, routeRisk: 48, delayHours: 5,
    recommendations: ["Do not release for clinical use.", "Trigger batch failure review for Batch #A129.", "Audit Pune receiving facility refrigeration."],
  },
};

function Bar({ value, color = "bg-primary" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className={`h-full ${color}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

function Analysis() {
  const [pick, setPick] = useState<Ind | null>(null);
  const v = pick ? verdicts[pick] : null;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">AI indicator analysis</h1>
        <p className="text-sm text-muted-foreground">Upload or simulate an indicator photo. The model returns a full risk profile in seconds.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card className="p-6">
          <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
            <div className="mt-2 text-sm font-medium">Drop indicator photo</div>
            <div className="text-xs text-muted-foreground">or use a swatch below to simulate</div>
            <Button variant="outline" size="sm" className="mt-3">Choose file</Button>
          </div>
          <div className="mt-5">
            <div className="text-xs font-medium text-muted-foreground">Simulate indicator color</div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {swatches.map((s) => (
                <button key={s.id} onClick={() => setPick(s.id)}
                  className={`group rounded-xl border p-3 text-center transition ${pick === s.id ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-secondary"}`}>
                  <div className="mx-auto h-12 w-12 rounded-lg border border-border" style={{ background: s.color }} />
                  <div className="mt-2 text-xs font-medium">{s.label}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          {v ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal"><Sparkles className="h-3 w-3" />AI Verdict</div>
                  <div className={`mt-1 font-display text-3xl font-bold ${v.tone}`}>{v.risk} risk</div>
                  <div className="text-sm text-muted-foreground">{v.severity} exposure · {v.conf}% confidence</div>
                </div>
                <div className="text-center">
                  <HealthGauge value={v.health} />
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">AI risk score</div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><BrainCircuit className="h-4 w-4 text-primary" />AI reasoning</div>
                <p className="mt-2 text-sm text-muted-foreground">{v.reasoning}</p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> Shelf-life prediction</div>
                  <div className="mt-1 text-xl font-display font-bold">{v.shelfLife} days</div>
                  <div className="mt-2"><Bar value={(v.shelfLife / 30) * 100} color={v.shelfLife > 14 ? "bg-success" : v.shelfLife > 0 ? "bg-warning" : "bg-destructive"} /></div>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Thermometer className="h-3 w-3" /> Spoilage probability</div>
                  <div className="mt-1 text-xl font-display font-bold">{v.spoilage}%</div>
                  <div className="mt-2"><Bar value={v.spoilage} color={v.spoilage < 15 ? "bg-success" : v.spoilage < 40 ? "bg-warning" : "bg-destructive"} /></div>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><RouteIcon className="h-3 w-3" /> Route risk uplift</div>
                  <div className="mt-1 text-xl font-display font-bold">+{v.routeRisk}%</div>
                  <div className="mt-2"><Bar value={v.routeRisk} color="bg-primary" /></div>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-3 w-3" /> Predicted delay</div>
                  <div className="mt-1 text-xl font-display font-bold">{v.delayHours}h</div>
                  <div className="mt-2"><Bar value={v.delayHours * 15} color={v.delayHours < 2 ? "bg-success" : "bg-warning"} /></div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-teal/30 bg-teal/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-teal"><Lightbulb className="h-4 w-4" /> AI recommendations</div>
                <ul className="mt-2 space-y-1 text-sm">
                  {v.recommendations.map((r) => (
                    <li key={r} className="flex gap-2"><span className="text-teal">•</span>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex gap-2">
                <Button className="bg-gradient-primary shadow-elegant flex-1">Log result to shipment</Button>
                <Button variant="outline">Re-analyze</Button>
              </div>
            </>
          ) : (
            <div className="grid h-full place-items-center text-center text-muted-foreground">
              <div>
                <BrainCircuit className="mx-auto h-10 w-10 opacity-60" />
                <div className="mt-2 text-sm">Select or upload an indicator to see the AI verdict.</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

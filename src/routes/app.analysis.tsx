import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HealthGauge } from "@/components/HealthGauge";
import { BrainCircuit, Upload, Sparkles } from "lucide-react";

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

const verdicts: Record<Ind, { health: number; risk: string; severity: string; conf: number; reasoning: string; tone: string }> = {
  white: { health: 96, risk: "Low", severity: "None detected", conf: 94, tone: "text-success",
    reasoning: "Indicator matches baseline white. No prolonged thermal exposure observed; cold chain intact." },
  light_blue: { health: 82, risk: "Low–Medium", severity: "Brief exposure", conf: 89, tone: "text-success",
    reasoning: "Slight color shift consistent with a short out-of-range event (<15 min). Product likely safe but monitor next checkpoint." },
  medium_blue: { health: 68, risk: "Medium", severity: "Moderate exposure", conf: 87, tone: "text-warning",
    reasoning: "Moderate degradation suggests prolonged temperature exposure between 8–15°C. Recommend quality review before patient use." },
  dark_blue: { health: 38, risk: "High", severity: "Severe exposure", conf: 92, tone: "text-destructive",
    reasoning: "Strong saturation indicates extended exposure above safe threshold. Shipment likely compromised — quarantine batch." },
};

function Analysis() {
  const [pick, setPick] = useState<Ind | null>(null);
  const v = pick ? verdicts[pick] : null;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">AI indicator analysis</h1>
        <p className="text-sm text-muted-foreground">Upload or simulate an indicator photo. The model returns a verdict in seconds.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
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
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal"><Sparkles className="h-3 w-3" />Verdict</div>
                  <div className={`mt-1 font-display text-3xl font-bold ${v.tone}`}>{v.risk} risk</div>
                  <div className="text-sm text-muted-foreground">{v.severity} · {v.conf}% confidence</div>
                </div>
                <HealthGauge value={v.health} />
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><BrainCircuit className="h-4 w-4 text-primary" />AI reasoning</div>
                <p className="mt-2 text-sm text-muted-foreground">{v.reasoning}</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">Risk level</div><div className="font-semibold">{v.risk}</div></div>
                <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">Confidence</div><div className="font-semibold">{v.conf}%</div></div>
                <div className="rounded-lg bg-secondary p-3"><div className="text-xs text-muted-foreground">Severity</div><div className="font-semibold">{v.severity}</div></div>
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

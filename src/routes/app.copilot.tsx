import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({ meta: [{ title: "AI Copilot · FrostGuard" }] }),
  component: Copilot,
});

const suggestions = [
  "Show compromised vaccines.",
  "Which route is most risky?",
  "Show today's alerts.",
  "Which city has highest failures?",
  "Show insulin shipments in Chennai.",
  "Generate health report.",
  "Predict next risk area.",
];

const canned: Record<string, string> = {
  "Show compromised vaccines.":
    "**2 compromised vaccine shipments** in the last 14 days:\n• FG-VAC-HYD-20260613-B4K6M — BCG vials · Hyderabad → Warangal (Health 38)\n• FG-VAC-CHN-20260610-N8R2J — MMR pediatric · Chennai → Madurai (Health 51)\nBoth show dark-blue indicators and >2h exposure events.",
  "Which route is most risky?":
    "**Chennai → Villupuram** tops the risk leaderboard this week: 3 of the last 8 vaccine shipments hit medium risk, mean health 71. The Kanchipuram relay shows temperature drift at midday — worth investigating.",
  "Show today's alerts.":
    "**4 alerts today**:\n• Compromised — FG-BLD-MUM-20260613-Q7T2W (Pune receiving)\n• Warning — Hassan distributor temperature spike\n• Predicted delay — Bengaluru → Hassan, ~3h\n• Batch anomaly — Batch #A129 (5 shipments)",
  "Which city has highest failures?":
    "**Mumbai** leads on compromised rate at 6.4% (vs 2.9% network average), driven by evening dispatches. Pune receiving facility is the dominant root cause.",
  "Show insulin shipments in Chennai.":
    "Found **3 insulin shipments** routed via Chennai in the last 7 days. All currently Safe — mean health 91. Cold-pack carton performance remains strong across the Chennai DC.",
  "Generate health report.":
    "**Weekly health report** generated:\n• Total shipments: 1,284 (+4.2%)\n• Safe rate: 86.3%\n• Compromised: 51 (-3 vs last week)\n• Top risk route: Chennai → Villupuram\n• AI confidence (avg): 88%",
  "Predict next risk area.":
    "Forecast points to **Trichy relay corridor** over the next 5 days — seasonal heat + dealer-warehouse cooling capacity historically dips in mid-June. Recommended action: pre-position extra cold-packs.",
};

function Copilot() {
  const [msgs, setMsgs] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi — I'm your FrostGuard copilot. Ask me anything about shipments, risk, or routes." },
  ]);
  const [input, setInput] = useState("");
  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = canned[text] ?? "I'm a demo copilot — try one of the suggested questions on the right to see a grounded answer.";
    setMsgs((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">AI Copilot</h1>
        <p className="text-sm text-muted-foreground">Ask in plain language. Grounded on your shipment data.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="flex h-[600px] flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "bot" && <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground"><Bot className="h-4 w-4" /></div>}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form className="flex gap-2 border-t border-border p-4" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your shipments…" />
            <Button type="submit" className="bg-gradient-primary"><Send className="h-4 w-4" /></Button>
          </form>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-teal" /> Suggested prompts</div>
          <div className="mt-4 space-y-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="w-full rounded-xl border border-border p-3 text-left text-sm hover:bg-secondary transition">
                {s}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

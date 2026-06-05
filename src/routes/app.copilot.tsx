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
  "Which route has the highest risk this week?",
  "Show compromised vaccine shipments.",
  "Which region needs investigation?",
  "Are afternoon dispatches riskier?",
];

const canned: Record<string, string> = {
  "Which route has the highest risk this week?":
    "**Chennai → Villupuram** has the highest risk: 3 of the last 8 vaccine shipments hit medium risk, with a mean health score of 71. The Kanchipuram relay shows a temperature drift at midday — worth investigating.",
  "Show compromised vaccine shipments.":
    "There are **2 compromised vaccine shipments** in the last 14 days:\n• FG-2026-00186 — Blood Sample · Mumbai → Pune (Health 42)\n• FG-2026-00171 — MMR vaccine · Hyderabad → Karimnagar (Health 51)\nBoth show dark-blue indicators and >2h exposure events.",
  "Which region needs investigation?":
    "**Maharashtra** shows the highest compromised rate at 6.4% (vs 2.9% network average), concentrated in evening deliveries. I'd start with the Pune receiving facility.",
  "Are afternoon dispatches riskier?":
    "Yes — shipments dispatched after **13:00** have a 2.4× higher warning rate than morning dispatches. Heat exposure at the loading bay is the most likely cause.",
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
          <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-teal" /> Try asking</div>
          <div className="mt-4 space-y-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="w-full rounded-xl border border-border p-3 text-left text-sm hover:bg-secondary">
                {s}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

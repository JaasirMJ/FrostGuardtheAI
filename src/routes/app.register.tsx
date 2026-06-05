import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, QrCode } from "lucide-react";

export const Route = createFileRoute("/app/register")({
  head: () => ({ meta: [{ title: "Register shipment · FrostGuard" }] }),
  component: Register,
});

const products = ["Vaccine", "Insulin", "Blood Sample", "Dairy Product", "Seafood", "Other"];

function QrPreview({ uid }: { uid: string }) {
  // deterministic pseudo-QR pattern from UID
  const cells = useMemo(() => {
    let h = 0; for (const c of uid) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return Array.from({ length: 21 * 21 }, (_, i) => {
      h = (h * 1103515245 + 12345) >>> 0;
      return (h >> 5) & 1;
    });
  }, [uid]);
  return (
    <div className="inline-grid gap-px rounded-md bg-foreground p-2" style={{ gridTemplateColumns: "repeat(21,1fr)" }}>
      {cells.map((b, i) => (
        <div key={i} className="h-2 w-2" style={{ background: b ? "var(--color-background)" : "var(--color-foreground)" }} />
      ))}
    </div>
  );
}

function Register() {
  const [uid] = useState(() => "FG-2026-" + Math.floor(10000 + Math.random() * 89999));
  const [done, setDone] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Register a shipment</h1>
        <p className="text-sm text-muted-foreground">Generate a unique QR and add it to your package before dispatch.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <div className="sm:col-span-2">
              <Label>Shipment UID</Label>
              <Input value={uid} readOnly className="font-mono mt-1.5" />
            </div>
            <div>
              <Label>Product type</Label>
              <Select defaultValue="Vaccine">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{products.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Category</Label><Input placeholder="e.g. MMR pediatric" className="mt-1.5" /></div>
            <div><Label>Origin</Label><Input placeholder="Chennai Hub" className="mt-1.5" /></div>
            <div><Label>Destination</Label><Input placeholder="Villupuram PHC" className="mt-1.5" /></div>
            <div><Label>Dispatch date</Label><Input type="date" className="mt-1.5" /></div>
            <div><Label>Expected delivery</Label><Input type="date" className="mt-1.5" /></div>
            <div><Label>Quantity</Label><Input type="number" placeholder="240" className="mt-1.5" /></div>
            <div className="sm:col-span-2"><Label>Notes</Label><Textarea placeholder="Handling instructions, contact person…" className="mt-1.5" /></div>
            <div className="sm:col-span-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">A passive indicator sticker should be applied next to the QR.</p>
              <Button type="submit" className="bg-gradient-primary shadow-elegant">{done ? <><Check className="mr-1 h-4 w-4" />Registered</> : "Create shipment"}</Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 font-semibold"><QrCode className="h-4 w-4 text-primary" /> Generated QR</div>
          <div className="mt-5 flex flex-col items-center">
            <QrPreview uid={uid} />
            <div className="mt-3 font-mono text-xs">{uid}</div>
            <p className="mt-3 text-center text-xs text-muted-foreground">Print on a 4×4cm sticker. Place adjacent to the temperature indicator.</p>
            <Button variant="outline" className="mt-4 w-full">Download PDF</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

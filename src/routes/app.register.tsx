import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Download, Printer, Plus, QrCode, Sparkles, ShieldCheck } from "lucide-react";
import {
  shipmentStore,
  generateShipmentId,
  generateRiskSummary,
  type GeneratedShipment,
} from "@/lib/shipment-store";
import { ShipmentLabel } from "@/components/ShipmentLabel";

export const Route = createFileRoute("/app/register")({
  head: () => ({ meta: [{ title: "Create shipment · FrostGuard" }] }),
  component: Register,
});

const categories = ["Vaccine", "Insulin", "Blood Sample", "Dairy", "Seafood", "Other"] as const;

interface FormState {
  product: string;
  category: string;
  origin: string;
  destination: string;
  batchNumber: string;
  expiryDate: string;
}

const empty: FormState = {
  product: "",
  category: "Vaccine",
  origin: "",
  destination: "",
  batchNumber: "",
  expiryDate: "",
};

function Register() {
  const [form, setForm] = useState<FormState>(empty);
  const [shipment, setShipment] = useState<GeneratedShipment | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const labelRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!shipment) {
      setQrDataUrl("");
      return;
    }
    const payload = JSON.stringify({
      shipmentId: shipment.shipmentId,
      product: shipment.product,
      category: shipment.category,
      batchNumber: shipment.batchNumber,
      origin: shipment.origin,
      destination: shipment.destination,
      expiryDate: shipment.expiryDate,
      status: shipment.status,
      createdAt: shipment.createdAt,
    });
    QRCode.toDataURL(payload, {
      width: 512,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => toast.error("Could not generate QR"));
  }, [shipment]);

  const onGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product || !form.origin || !form.destination || !form.batchNumber || !form.expiryDate) {
      toast.error("Please fill all required fields");
      return;
    }
    const s: GeneratedShipment = {
      shipmentId: generateShipmentId(),
      product: form.product,
      category: form.category,
      batchNumber: form.batchNumber,
      origin: form.origin,
      destination: form.destination,
      expiryDate: form.expiryDate,
      status: "Safe",
      createdAt: new Date().toISOString(),
      riskSummary: generateRiskSummary(form.category, form.product),
    };
    await shipmentStore.save(s);
    setShipment(s);
    toast.success(`Shipment ${s.shipmentId} created`);
  };

  const onDownload = () => {
    if (!qrDataUrl || !shipment) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${shipment.shipmentId}.png`;
    a.click();
  };

  const onPrint = () => {
    if (!shipment || !qrDataUrl) return;
    const w = window.open("", "_blank", "width=480,height=640");
    if (!w) return;
    w.document.write(`<html><head><title>${shipment.shipmentId}</title>
      <style>body{font-family:system-ui;margin:0;padding:24px;color:#0f172a}
      .lbl{border:2px solid #0f172a;border-radius:8px;padding:16px;width:340px}
      .id{font-family:monospace;font-weight:700}
      .row{display:flex;justify-content:space-between;font-size:12px;margin-top:4px}
      img{width:140px;height:140px}</style></head><body>
      <div class="lbl">
        <div style="display:flex;justify-content:space-between;border-bottom:1px solid #0f172a;padding-bottom:8px">
          <strong>FrostGuard</strong><small>COLD-CHAIN LABEL</small>
        </div>
        <div style="display:flex;gap:12px;margin-top:12px">
          <img src="${qrDataUrl}" />
          <div style="font-size:12px">
            <div class="id">${shipment.shipmentId}</div>
            <div>Product: ${shipment.product}</div>
            <div>Category: ${shipment.category}</div>
            <div>Batch: ${shipment.batchNumber}</div>
            <div>Expiry: ${shipment.expiryDate}</div>
          </div>
        </div>
        <div style="border-top:1px solid #0f172a;margin-top:12px;padding-top:8px">
          <div class="row"><span>From</span><strong>${shipment.origin}</strong></div>
          <div class="row"><span>To</span><strong>${shipment.destination}</strong></div>
        </div>
      </div>
      <script>window.onload=()=>{window.print();}</script>
      </body></html>`);
    w.document.close();
  };

  const onReset = () => {
    setShipment(null);
    setForm(empty);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Create shipment</h1>
        <p className="text-sm text-muted-foreground">
          Generate a unique digital identity and QR label for a temperature-sensitive shipment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-primary/15 p-6">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={onGenerate}>
            <div className="sm:col-span-2">
              <Label>Product name *</Label>
              <Input
                className="mt-1.5"
                placeholder="e.g. Covaxin"
                value={form.product}
                onChange={(e) => update("product", e.target.value)}
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Batch number *</Label>
              <Input
                className="mt-1.5 font-mono"
                placeholder="CVX-4587"
                value={form.batchNumber}
                onChange={(e) => update("batchNumber", e.target.value)}
              />
            </div>
            <div>
              <Label>Origin location *</Label>
              <Input
                className="mt-1.5"
                placeholder="Chennai"
                value={form.origin}
                onChange={(e) => update("origin", e.target.value)}
              />
            </div>
            <div>
              <Label>Destination location *</Label>
              <Input
                className="mt-1.5"
                placeholder="Madurai"
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Expiry date *</Label>
              <Input
                type="date"
                className="mt-1.5"
                value={form.expiryDate}
                onChange={(e) => update("expiryDate", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 pt-2">
              <p className="text-xs text-muted-foreground">
                A unique <span className="font-mono">FG-{new Date().getFullYear()}-XXXXXXXX</span> ID
                will be assigned automatically.
              </p>
              <div className="flex gap-2">
                {shipment && (
                  <Button type="button" variant="outline" onClick={onReset}>
                    <Plus className="mr-1 h-4 w-4" /> New shipment
                  </Button>
                )}
                <Button type="submit" className="bg-gradient-primary shadow-elegant">
                  <QrCode className="mr-1 h-4 w-4" /> Generate shipment
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <Card className="border-primary/15 p-6">
          {shipment ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Shipment generated
                </div>
                <Badge className="border-success/30 bg-success/15 text-success">
                  {shipment.status}
                </Badge>
              </div>
              <ShipmentLabel ref={labelRef} shipment={shipment} qrDataUrl={qrDataUrl} />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={onDownload} disabled={!qrDataUrl}>
                  <Download className="mr-1 h-4 w-4" /> Download QR
                </Button>
                <Button variant="outline" onClick={onPrint} disabled={!qrDataUrl}>
                  <Printer className="mr-1 h-4 w-4" /> Print label
                </Button>
              </div>
              {shipment.riskSummary && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
                  <div className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> AI risk summary
                  </div>
                  <p className="text-foreground/80">{shipment.riskSummary}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[340px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <p className="mt-3 text-sm font-medium">QR will appear here</p>
              <p className="mt-1 max-w-[240px] text-xs text-muted-foreground">
                Fill in the shipment details and click Generate to create a unique cold-chain QR
                label.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

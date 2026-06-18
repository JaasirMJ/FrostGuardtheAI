import { forwardRef } from "react";
import type { GeneratedShipment } from "@/lib/shipment-store";

interface Props {
  shipment: GeneratedShipment;
  qrDataUrl: string;
}

export const ShipmentLabel = forwardRef<HTMLDivElement, Props>(function ShipmentLabel(
  { shipment, qrDataUrl },
  ref,
) {
  return (
    <div
      ref={ref}
      className="mx-auto w-[360px] rounded-lg border-2 border-foreground bg-background p-4 text-foreground"
    >
      <div className="flex items-center justify-between border-b border-foreground/40 pb-2">
        <div className="font-display text-lg font-bold tracking-tight">FrostGuard</div>
        <div className="text-[10px] uppercase tracking-widest">Cold-chain label</div>
      </div>
      <div className="mt-3 flex gap-3">
        {qrDataUrl ? (
          <img src={qrDataUrl} alt="Shipment QR" className="h-32 w-32" />
        ) : (
          <div className="h-32 w-32 animate-pulse bg-muted" />
        )}
        <div className="flex-1 space-y-1 text-xs">
          <div className="font-mono text-[11px] font-bold">{shipment.shipmentId}</div>
          <div><span className="opacity-60">Product:</span> {shipment.product}</div>
          <div><span className="opacity-60">Category:</span> {shipment.category}</div>
          <div><span className="opacity-60">Batch:</span> {shipment.batchNumber}</div>
          <div><span className="opacity-60">Expiry:</span> {shipment.expiryDate}</div>
        </div>
      </div>
      <div className="mt-3 border-t border-foreground/40 pt-2 text-xs">
        <div className="flex justify-between"><span className="opacity-60">From</span><span className="font-medium">{shipment.origin}</span></div>
        <div className="flex justify-between"><span className="opacity-60">To</span><span className="font-medium">{shipment.destination}</span></div>
        <div className="mt-2 text-center text-[10px] uppercase tracking-widest opacity-60">
          Scan to verify cold-chain integrity
        </div>
      </div>
    </div>
  );
});

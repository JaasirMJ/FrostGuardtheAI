// Shipment storage abstraction. LocalStorage now; swap with Supabase/PostgreSQL later
// by re-implementing the same ShipmentStore interface.

export type GeneratedShipmentStatus = "Safe" | "Warning" | "Compromised";

export interface GeneratedShipment {
  shipmentId: string;
  product: string;
  category: string;
  batchNumber: string;
  origin: string;
  destination: string;
  expiryDate: string;
  status: GeneratedShipmentStatus;
  createdAt: string;
  riskSummary?: string;
}

export interface ShipmentStore {
  list(): Promise<GeneratedShipment[]>;
  get(id: string): Promise<GeneratedShipment | null>;
  save(s: GeneratedShipment): Promise<void>;
}

const KEY = "frostguard.shipments.v1";

function read(): GeneratedShipment[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: GeneratedShipment[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
}

export const localShipmentStore: ShipmentStore = {
  async list() {
    return read();
  },
  async get(id) {
    return read().find((s) => s.shipmentId === id) ?? null;
  },
  async save(s) {
    const items = read();
    const idx = items.findIndex((x) => x.shipmentId === s.shipmentId);
    if (idx >= 0) items[idx] = s;
    else items.unshift(s);
    write(items);
  },
};

// Default exported store — swap implementation here when migrating to Supabase.
export const shipmentStore: ShipmentStore = localShipmentStore;

export function generateShipmentId(): string {
  const year = new Date().getFullYear();
  const rand = Array.from({ length: 8 }, () =>
    "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"[Math.floor(Math.random() * 34)],
  ).join("");
  return `FG-${year}-${rand}`;
}

const tempRules: Record<string, { range: string; priority: string }> = {
  Vaccine: { range: "below 8°C", priority: "High" },
  Insulin: { range: "between 2–8°C", priority: "High" },
  "Blood Sample": { range: "between 0–4°C", priority: "Critical" },
  Dairy: { range: "between 2–6°C", priority: "Medium" },
  Seafood: { range: "between -1–2°C", priority: "High" },
  Other: { range: "within recommended cold-chain range", priority: "Standard" },
};

export function generateRiskSummary(category: string, product: string): string {
  const rule = tempRules[category] ?? tempRules.Other;
  return `This shipment contains ${product.toLowerCase()} (${category.toLowerCase()}) and should remain ${rule.range}. ${rule.priority} priority shipment. Monitor carefully.`;
}

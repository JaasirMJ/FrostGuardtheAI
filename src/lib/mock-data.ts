export type ShipmentStatus = "safe" | "warning" | "compromised" | "in_transit";
export type ProductType = "Vaccine" | "Insulin" | "Blood Sample" | "Dairy Product" | "Seafood" | "Other";

export interface Shipment {
  uid: string;
  product: ProductType;
  category: string;
  origin: string;
  destination: string;
  dispatch: string;
  eta: string;
  quantity: number;
  status: ShipmentStatus;
  health: number;
  risk: "Low" | "Medium" | "High";
  confidence: number;
  indicator: "white" | "light_blue" | "medium_blue" | "dark_blue";
  dealer?: string;
  tempClass?: string;
  notes?: string;
  scans: { time: string; location: string; user: string; risk: string }[];
}

export const productCodes: Record<ProductType, string> = {
  Vaccine: "VAC", Insulin: "INS", "Blood Sample": "BLD",
  "Dairy Product": "DRY", Seafood: "SFD", Other: "OTH",
};

export const cityCodes: Record<string, string> = {
  Chennai: "CHN", Bengaluru: "BLR", Hyderabad: "HYD", Delhi: "DEL",
  Mumbai: "MUM", Pune: "PUN", Coimbatore: "CBE", Madurai: "MDU",
  Trichy: "TRY", Salem: "SLM", Kochi: "COK", Kolkata: "KOL",
  Ahmedabad: "AMD", Jaipur: "JAI", Lucknow: "LKO", Bhubaneswar: "BBI", Guwahati: "GAU",
};

export function generateUid(product: ProductType, city: string): string {
  const p = productCodes[product] ?? "OTH";
  const c = cityCodes[city] ?? city.slice(0, 3).toUpperCase();
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `FG-${p}-${c}-${date}-${rand}`;
}

export const shipments: Shipment[] = [
  {
    uid: "FG-VAC-CHN-20260612-X9A7K", product: "Vaccine", category: "Pediatric MMR",
    origin: "Chennai", destination: "Villupuram", dispatch: "2026-06-02", eta: "2026-06-03",
    quantity: 240, status: "safe", health: 96, risk: "Low", confidence: 94, indicator: "white",
    dealer: "DLR-CHN-2045", tempClass: "2–8°C",
    scans: [
      { time: "2026-06-02 08:14", location: "Chennai Hub", user: "R. Selvam", risk: "Low" },
      { time: "2026-06-02 14:31", location: "Kanchipuram Relay", user: "A. Devi", risk: "Low" },
      { time: "2026-06-03 09:02", location: "Villupuram PHC", user: "K. Murugan", risk: "Low" },
    ],
  },
  {
    uid: "FG-INS-BLR-20260611-L3P8Q", product: "Insulin", category: "Cold-pack carton",
    origin: "Bengaluru", destination: "Hassan", dispatch: "2026-06-01", eta: "2026-06-02",
    quantity: 120, status: "warning", health: 78, risk: "Medium", confidence: 88, indicator: "light_blue",
    dealer: "DLR-BLR-1810", tempClass: "2–8°C",
    scans: [
      { time: "2026-06-01 06:40", location: "Bengaluru DC", user: "M. Iyer", risk: "Low" },
      { time: "2026-06-02 13:55", location: "Hassan Distrib.", user: "P. Nair", risk: "Medium" },
    ],
  },
  {
    uid: "FG-BLD-MUM-20260613-Q7T2W", product: "Blood Sample", category: "Diagnostic batch",
    origin: "Mumbai", destination: "Pune", dispatch: "2026-06-03", eta: "2026-06-03",
    quantity: 60, status: "compromised", health: 42, risk: "High", confidence: 91, indicator: "dark_blue",
    dealer: "DLR-MUM-3320", tempClass: "0–4°C",
    scans: [
      { time: "2026-06-03 11:20", location: "Mumbai Lab", user: "S. Khan", risk: "Low" },
      { time: "2026-06-03 17:48", location: "Pune Receiving", user: "V. Joshi", risk: "High" },
    ],
  },
  {
    uid: "FG-DRY-AMD-20260614-H1J9R", product: "Dairy Product", category: "Yoghurt pallet",
    origin: "Ahmedabad", destination: "Surat", dispatch: "2026-06-04", eta: "2026-06-04",
    quantity: 900, status: "safe", health: 92, risk: "Low", confidence: 90, indicator: "white",
    dealer: "DLR-AMD-5520", tempClass: "2–6°C",
    scans: [{ time: "2026-06-04 05:10", location: "Anand Plant", user: "H. Patel", risk: "Low" }],
  },
  {
    uid: "FG-VAC-HYD-20260613-B4K6M", product: "Vaccine", category: "BCG vials",
    origin: "Hyderabad", destination: "Warangal", dispatch: "2026-06-03", eta: "2026-06-04",
    quantity: 320, status: "warning", health: 74, risk: "Medium", confidence: 85, indicator: "medium_blue",
    dealer: "DLR-HYD-9120", tempClass: "2–8°C",
    scans: [
      { time: "2026-06-03 07:55", location: "Hyderabad CWH", user: "L. Rao", risk: "Low" },
      { time: "2026-06-04 12:10", location: "Warangal PHC", user: "N. Reddy", risk: "Medium" },
    ],
  },
  {
    uid: "FG-SFD-COK-20260614-Z2Y8E", product: "Seafood", category: "Shrimp box",
    origin: "Kochi", destination: "Coimbatore", dispatch: "2026-06-04", eta: "2026-06-05",
    quantity: 150, status: "in_transit", health: 88, risk: "Low", confidence: 82, indicator: "white",
    dealer: "DLR-COK-7710", tempClass: "-1–2°C",
    scans: [{ time: "2026-06-04 04:00", location: "Kochi Port", user: "T. Thomas", risk: "Low" }],
  },
];

export const statusMeta: Record<ShipmentStatus, { label: string; tone: string }> = {
  safe: { label: "Safe", tone: "bg-success/15 text-success border-success/30" },
  warning: { label: "Warning", tone: "bg-warning/15 text-warning border-warning/30" },
  compromised: { label: "Compromised", tone: "bg-destructive/15 text-destructive border-destructive/30" },
  in_transit: { label: "In transit", tone: "bg-primary/10 text-primary border-primary/30" },
};

export const insights = [
  { title: "Afternoon dispatches at risk", body: "Shipments leaving after 13:00 show 2.4× higher warning rate this week.", tone: "warning" as const },
  { title: "Chennai → Villupuram elevated", body: "3 of last 8 vaccine batches on this route hit medium risk. Investigate relay temperature.", tone: "destructive" as const },
  { title: "Insulin cold-pack performance strong", body: "Reusable cartons maintain <5°C exposure across 94% of trips.", tone: "success" as const },
];

export const kpis = {
  total: 1284,
  active: 142,
  delivered: 1091,
  safe: 1109,
  warning: 124,
  compromised: 51,
  delayed: 38,
  aiAlerts: 17,
};

export const trend = [
  { day: "Mon", safe: 168, warning: 14, compromised: 5 },
  { day: "Tue", safe: 152, warning: 22, compromised: 8 },
  { day: "Wed", safe: 181, warning: 12, compromised: 6 },
  { day: "Thu", safe: 174, warning: 18, compromised: 9 },
  { day: "Fri", safe: 159, warning: 20, compromised: 11 },
  { day: "Sat", safe: 142, warning: 19, compromised: 7 },
  { day: "Sun", safe: 133, warning: 19, compromised: 5 },
];

export const categoryRisk = [
  { name: "Vaccine", risk: 12 },
  { name: "Insulin", risk: 9 },
  { name: "Blood", risk: 18 },
  { name: "Dairy", risk: 6 },
  { name: "Seafood", risk: 14 },
];

export const recentActivity = [
  { time: "09:40 AM", text: "Shipment FG-VAC-CHN-20260612-X9A7K scanned in Chennai", tone: "primary" as const },
  { time: "09:52 AM", text: "Warning detected in Madurai relay (FG-INS-MDU-20260612-L3P8Q)", tone: "warning" as const },
  { time: "10:10 AM", text: "Compromised shipment flagged — FG-BLD-MUM-20260613-Q7T2W", tone: "destructive" as const },
  { time: "10:32 AM", text: "Batch #A129 — 5 shipments show similar anomalies", tone: "warning" as const },
  { time: "10:58 AM", text: "Dealer DLR-COK-7710 registered new shipment", tone: "primary" as const },
  { time: "11:14 AM", text: "AI predicted 3h delay on Bengaluru → Hassan route", tone: "warning" as const },
];

export type CityRisk = { name: string; x: number; y: number; level: "safe" | "warning" | "high"; count: number };

// Approximate coords on a stylized India bounding box (0..100 each)
export const cityHeat: CityRisk[] = [
  { name: "Chennai", x: 64, y: 78, level: "safe", count: 412 },
  { name: "Bengaluru", x: 55, y: 76, level: "warning", count: 268 },
  { name: "Hyderabad", x: 56, y: 65, level: "warning", count: 221 },
  { name: "Delhi", x: 48, y: 23, level: "safe", count: 358 },
  { name: "Mumbai", x: 38, y: 58, level: "high", count: 311 },
  { name: "Pune", x: 42, y: 60, level: "high", count: 187 },
  { name: "Coimbatore", x: 56, y: 82, level: "safe", count: 142 },
  { name: "Madurai", x: 60, y: 86, level: "warning", count: 121 },
  { name: "Trichy", x: 62, y: 82, level: "warning", count: 96 },
  { name: "Salem", x: 60, y: 80, level: "safe", count: 88 },
  { name: "Kochi", x: 51, y: 86, level: "safe", count: 134 },
  { name: "Kolkata", x: 78, y: 46, level: "warning", count: 226 },
  { name: "Ahmedabad", x: 36, y: 45, level: "safe", count: 198 },
  { name: "Jaipur", x: 44, y: 33, level: "safe", count: 152 },
  { name: "Lucknow", x: 58, y: 32, level: "warning", count: 174 },
  { name: "Bhubaneswar", x: 74, y: 55, level: "safe", count: 91 },
  { name: "Guwahati", x: 85, y: 36, level: "high", count: 67 },
];

export const heatColor: Record<CityRisk["level"], string> = {
  safe: "#16a34a",
  warning: "#f59e0b",
  high: "#dc2626",
};

export const notifications = [
  { tone: "destructive" as const, text: "Shipment FG-VAC-CHN-20260612-X9A7K flagged compromised on Trichy relay." },
  { tone: "warning" as const, text: "Route Chennai → Madurai showing elevated risk this week (+32%)." },
  { tone: "warning" as const, text: "High temperature event detected at Hassan distributor at 13:55." },
  { tone: "primary" as const, text: "Batch #A129 anomaly cluster — 5 shipments need review." },
];

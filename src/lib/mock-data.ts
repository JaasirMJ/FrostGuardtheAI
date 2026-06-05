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
  notes?: string;
  scans: { time: string; location: string; user: string; risk: string }[];
}

export const shipments: Shipment[] = [
  {
    uid: "FG-2026-00184", product: "Vaccine", category: "Pediatric MMR",
    origin: "Chennai", destination: "Villupuram", dispatch: "2026-06-02", eta: "2026-06-03",
    quantity: 240, status: "safe", health: 96, risk: "Low", confidence: 94, indicator: "white",
    scans: [
      { time: "2026-06-02 08:14", location: "Chennai Hub", user: "R. Selvam", risk: "Low" },
      { time: "2026-06-02 14:31", location: "Kanchipuram Relay", user: "A. Devi", risk: "Low" },
      { time: "2026-06-03 09:02", location: "Villupuram PHC", user: "K. Murugan", risk: "Low" },
    ],
  },
  {
    uid: "FG-2026-00185", product: "Insulin", category: "Cold-pack carton",
    origin: "Bengaluru", destination: "Hassan", dispatch: "2026-06-01", eta: "2026-06-02",
    quantity: 120, status: "warning", health: 78, risk: "Medium", confidence: 88, indicator: "light_blue",
    scans: [
      { time: "2026-06-01 06:40", location: "Bengaluru DC", user: "M. Iyer", risk: "Low" },
      { time: "2026-06-02 13:55", location: "Hassan Distrib.", user: "P. Nair", risk: "Medium" },
    ],
  },
  {
    uid: "FG-2026-00186", product: "Blood Sample", category: "Diagnostic batch",
    origin: "Mumbai", destination: "Pune", dispatch: "2026-06-03", eta: "2026-06-03",
    quantity: 60, status: "compromised", health: 42, risk: "High", confidence: 91, indicator: "dark_blue",
    scans: [
      { time: "2026-06-03 11:20", location: "Mumbai Lab", user: "S. Khan", risk: "Low" },
      { time: "2026-06-03 17:48", location: "Pune Receiving", user: "V. Joshi", risk: "High" },
    ],
  },
  {
    uid: "FG-2026-00187", product: "Dairy Product", category: "Yoghurt pallet",
    origin: "Anand", destination: "Surat", dispatch: "2026-06-04", eta: "2026-06-04",
    quantity: 900, status: "safe", health: 92, risk: "Low", confidence: 90, indicator: "white",
    scans: [{ time: "2026-06-04 05:10", location: "Anand Plant", user: "H. Patel", risk: "Low" }],
  },
  {
    uid: "FG-2026-00188", product: "Vaccine", category: "BCG vials",
    origin: "Hyderabad", destination: "Warangal", dispatch: "2026-06-03", eta: "2026-06-04",
    quantity: 320, status: "warning", health: 74, risk: "Medium", confidence: 85, indicator: "medium_blue",
    scans: [
      { time: "2026-06-03 07:55", location: "Hyderabad CWH", user: "L. Rao", risk: "Low" },
      { time: "2026-06-04 12:10", location: "Warangal PHC", user: "N. Reddy", risk: "Medium" },
    ],
  },
  {
    uid: "FG-2026-00189", product: "Seafood", category: "Shrimp box",
    origin: "Kochi", destination: "Coimbatore", dispatch: "2026-06-04", eta: "2026-06-05",
    quantity: 150, status: "in_transit", health: 88, risk: "Low", confidence: 82, indicator: "white",
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
  safe: 1109,
  warning: 124,
  compromised: 51,
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

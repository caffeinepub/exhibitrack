export type BoothStatus = "Available" | "Reserved" | "Occupied";
export type VendorStatus = "Pending" | "Verified" | "Rejected";

export interface Booth {
  id: string;
  row: number;
  col: number;
  zone: "A" | "B" | "C";
  category: "Premium" | "Standard";
  dimensions: string;
  price: number;
  status: BoothStatus;
  vendorId?: string;
}

export interface Vendor {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  description: string;
  licenseNumber: string;
  status: VendorStatus;
  boothId?: string;
  registeredAt: string;
}

export interface VisitorLog {
  id: string;
  type: "Entry" | "Exit";
  timestamp: string;
  gate: string;
}

export interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
}

export const initialVendors: Vendor[] = [
  {
    id: "V001",
    companyName: "Akshay Designs Co.",
    email: "akshay@designs.com",
    phone: "+91 98765 43210",
    description: "Premium interior design & décor solutions for modern spaces.",
    licenseNumber: "TL-2024-MH-00421",
    status: "Verified",
    boothId: "A-101",
    registeredAt: "2026-03-01",
  },
  {
    id: "V002",
    companyName: "TechNova Exhibits",
    email: "info@technovaexhibits.com",
    phone: "+91 87654 32109",
    description: "Cutting-edge technology products and interactive demos.",
    licenseNumber: "TL-2024-KA-00872",
    status: "Verified",
    boothId: "B-201",
    registeredAt: "2026-03-03",
  },
  {
    id: "V003",
    companyName: "Green Earth Organics",
    email: "sales@greenearthorganics.in",
    phone: "+91 76543 21098",
    description:
      "Certified organic products, sustainable packaging, and eco-friendly goods.",
    licenseNumber: "TL-2024-TN-01134",
    status: "Verified",
    boothId: "A-103",
    registeredAt: "2026-03-05",
  },
  {
    id: "V004",
    companyName: "Luxora Fashion House",
    email: "contact@luxorafashion.com",
    phone: "+91 65432 10987",
    description: "High-end ethnic and fusion wear for contemporary lifestyles.",
    licenseNumber: "TL-2024-RJ-00553",
    status: "Pending",
    registeredAt: "2026-03-18",
  },
  {
    id: "V005",
    companyName: "SwiftLogix Solutions",
    email: "ops@swiftlogix.io",
    phone: "+91 54321 09876",
    description: "B2B logistics software and supply chain management tools.",
    licenseNumber: "TL-2024-DL-00789",
    status: "Pending",
    registeredAt: "2026-03-19",
  },
  {
    id: "V006",
    companyName: "Horizon Pharma Ltd.",
    email: "legal@horizonpharma.co",
    phone: "+91 43210 98765",
    description:
      "Generic pharmaceutical products and OTC wellness supplements.",
    licenseNumber: "TL-2024-GJ-00201",
    status: "Rejected",
    registeredAt: "2026-03-10",
  },
];

const statuses: BoothStatus[] = [
  "Occupied",
  "Available",
  "Occupied",
  "Reserved",
  "Occupied",
  "Available",
  "Reserved",
  "Occupied",
  "Available",
  "Occupied",
  "Reserved",
  "Occupied",
  "Available",
  "Occupied",
  "Reserved",
  "Occupied",
  "Available",
  "Occupied",
  "Reserved",
  "Available",
  "Occupied",
  "Available",
  "Reserved",
  "Occupied",
];

const vendorIds: (string | undefined)[] = [
  "V001",
  undefined,
  "V002",
  undefined,
  "V003",
  undefined,
  undefined,
  "V001",
  undefined,
  "V002",
  undefined,
  "V003",
  undefined,
  "V001",
  undefined,
  "V002",
  undefined,
  "V003",
  undefined,
  undefined,
  "V002",
  undefined,
  undefined,
  "V003",
];

export const initialBooths: Booth[] = Array.from({ length: 24 }, (_, i) => {
  const row = Math.floor(i / 6) + 1;
  const col = (i % 6) + 1;
  const zone: "A" | "B" | "C" = row <= 2 ? "A" : row === 3 ? "B" : "C";
  const status = statuses[i];
  return {
    id: `${zone}-${String(i + 101).padStart(3, "0")}`,
    row,
    col,
    zone,
    category: i % 3 === 0 ? "Premium" : "Standard",
    dimensions: i % 3 === 0 ? "6m × 4m" : "4m × 3m",
    price: i % 3 === 0 ? 2500 : 1500,
    status,
    vendorId: status !== "Available" ? vendorIds[i] : undefined,
  };
});

export const initialVisitorLogs: VisitorLog[] = [
  { id: "L001", type: "Entry", timestamp: "2026-03-24 09:02", gate: "Gate A" },
  { id: "L002", type: "Entry", timestamp: "2026-03-24 09:15", gate: "Gate B" },
  { id: "L003", type: "Exit", timestamp: "2026-03-24 09:47", gate: "Gate A" },
  { id: "L004", type: "Entry", timestamp: "2026-03-24 10:05", gate: "Gate C" },
  { id: "L005", type: "Entry", timestamp: "2026-03-24 10:22", gate: "Gate B" },
  { id: "L006", type: "Exit", timestamp: "2026-03-24 10:35", gate: "Gate A" },
  { id: "L007", type: "Entry", timestamp: "2026-03-24 10:48", gate: "Gate C" },
  { id: "L008", type: "Exit", timestamp: "2026-03-24 11:03", gate: "Gate B" },
];

export const notifications: Notification[] = [
  {
    id: "N001",
    message: "Luxora Fashion House submitted registration — awaiting review.",
    type: "info",
    time: "2m ago",
  },
  {
    id: "N002",
    message: "SwiftLogix Solutions verification documents uploaded.",
    type: "info",
    time: "18m ago",
  },
  {
    id: "N003",
    message: "Booth A-106 status changed to Reserved.",
    type: "success",
    time: "1h ago",
  },
  {
    id: "N004",
    message: "Visitor count approaching 80% venue capacity.",
    type: "warning",
    time: "2h ago",
  },
  {
    id: "N005",
    message: "Payment confirmed for TechNova Exhibits — Booth B-201.",
    type: "success",
    time: "3h ago",
  },
];

export const analyticsData = {
  totalRevenue: 47500,
  totalVisitors: 1892,
  occupancyRate: 68,
  dailyVisitors: [
    { day: "Mon", count: 210 },
    { day: "Tue", count: 285 },
    { day: "Wed", count: 320 },
    { day: "Thu", count: 295 },
    { day: "Fri", count: 410 },
    { day: "Sat", count: 372 },
  ],
  revenueByZone: [
    { zone: "Zone A", revenue: 22500 },
    { zone: "Zone B", revenue: 15000 },
    { zone: "Zone C", revenue: 10000 },
  ],
  popularSections: [
    { rank: 1, section: "Zone A — Premium Row", visitors: 642, percentage: 34 },
    { rank: 2, section: "Zone B — Tech Corner", visitors: 481, percentage: 25 },
    {
      rank: 3,
      section: "Zone A — Standard Row",
      visitors: 380,
      percentage: 20,
    },
    { rank: 4, section: "Zone C — East Wing", visitors: 251, percentage: 13 },
    { rank: 5, section: "Zone C — West Wing", visitors: 138, percentage: 8 },
  ],
};

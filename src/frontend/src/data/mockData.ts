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

// --- Document Verification ---
export type DocStatus = "Pending" | "Verified" | "Rejected";
export type DocType =
  | "Trade License"
  | "ID Proof"
  | "Health & Safety Cert"
  | "Insurance";

export interface VendorDocument {
  id: string;
  vendorId: string;
  vendorName: string;
  docType: DocType;
  fileName: string;
  uploadedAt: string;
  status: DocStatus;
  notes?: string;
}

// --- Payments ---
export type PaymentStatus = "Paid" | "Pending" | "Overdue";
export type PaymentMethod = "Cash" | "Card" | "Bank Transfer";

export interface Payment {
  id: string;
  vendorId: string;
  vendorName: string;
  boothId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  status: PaymentStatus;
  invoiceNo: string;
}

// --- Service Providers ---
export type ServiceCategory =
  | "AV & Tech"
  | "Catering"
  | "Security"
  | "Cleaning"
  | "Logistics"
  | "Electrical";
export type ContractStatus = "Contracted" | "Pending" | "Cancelled";

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  contactPerson: string;
  email: string;
  phone: string;
  contractStatus: ContractStatus;
  fee: number;
  startDate: string;
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

export const initialDocuments: VendorDocument[] = [
  {
    id: "D001",
    vendorId: "V001",
    vendorName: "Akshay Designs Co.",
    docType: "Trade License",
    fileName: "akshay_trade_license_2024.pdf",
    uploadedAt: "2026-03-01",
    status: "Verified",
  },
  {
    id: "D002",
    vendorId: "V001",
    vendorName: "Akshay Designs Co.",
    docType: "ID Proof",
    fileName: "akshay_id_proof.jpg",
    uploadedAt: "2026-03-01",
    status: "Verified",
  },
  {
    id: "D003",
    vendorId: "V002",
    vendorName: "TechNova Exhibits",
    docType: "Trade License",
    fileName: "technova_license.pdf",
    uploadedAt: "2026-03-03",
    status: "Verified",
  },
  {
    id: "D004",
    vendorId: "V002",
    vendorName: "TechNova Exhibits",
    docType: "Insurance",
    fileName: "technova_insurance_cert.pdf",
    uploadedAt: "2026-03-04",
    status: "Verified",
  },
  {
    id: "D005",
    vendorId: "V004",
    vendorName: "Luxora Fashion House",
    docType: "Trade License",
    fileName: "luxora_trade_license.pdf",
    uploadedAt: "2026-03-18",
    status: "Pending",
    notes: "Awaiting physical verification",
  },
  {
    id: "D006",
    vendorId: "V004",
    vendorName: "Luxora Fashion House",
    docType: "Health & Safety Cert",
    fileName: "luxora_health_safety.pdf",
    uploadedAt: "2026-03-18",
    status: "Pending",
  },
  {
    id: "D007",
    vendorId: "V005",
    vendorName: "SwiftLogix Solutions",
    docType: "ID Proof",
    fileName: "swiftlogix_director_id.pdf",
    uploadedAt: "2026-03-19",
    status: "Pending",
  },
  {
    id: "D008",
    vendorId: "V006",
    vendorName: "Horizon Pharma Ltd.",
    docType: "Trade License",
    fileName: "horizon_license_expired.pdf",
    uploadedAt: "2026-03-10",
    status: "Rejected",
    notes: "License expired — renewal required",
  },
];

export const initialPayments: Payment[] = [
  {
    id: "P001",
    vendorId: "V001",
    vendorName: "Akshay Designs Co.",
    boothId: "A-101",
    amount: 2500,
    method: "Bank Transfer",
    date: "2026-03-05",
    status: "Paid",
    invoiceNo: "INV-2026-001",
  },
  {
    id: "P002",
    vendorId: "V002",
    vendorName: "TechNova Exhibits",
    boothId: "B-201",
    amount: 1500,
    method: "Card",
    date: "2026-03-06",
    status: "Paid",
    invoiceNo: "INV-2026-002",
  },
  {
    id: "P003",
    vendorId: "V003",
    vendorName: "Green Earth Organics",
    boothId: "A-103",
    amount: 1500,
    method: "Cash",
    date: "2026-03-08",
    status: "Paid",
    invoiceNo: "INV-2026-003",
  },
  {
    id: "P004",
    vendorId: "V004",
    vendorName: "Luxora Fashion House",
    boothId: "C-301",
    amount: 2500,
    method: "Bank Transfer",
    date: "2026-03-20",
    status: "Pending",
    invoiceNo: "INV-2026-004",
  },
  {
    id: "P005",
    vendorId: "V005",
    vendorName: "SwiftLogix Solutions",
    boothId: "B-205",
    amount: 1500,
    method: "Card",
    date: "2026-03-22",
    status: "Pending",
    invoiceNo: "INV-2026-005",
  },
  {
    id: "P006",
    vendorId: "V003",
    vendorName: "Green Earth Organics",
    boothId: "A-106",
    amount: 1500,
    method: "Cash",
    date: "2026-03-01",
    status: "Overdue",
    invoiceNo: "INV-2026-006",
  },
  {
    id: "P007",
    vendorId: "V001",
    vendorName: "Akshay Designs Co.",
    boothId: "A-109",
    amount: 2500,
    method: "Bank Transfer",
    date: "2026-03-07",
    status: "Paid",
    invoiceNo: "INV-2026-007",
  },
  {
    id: "P008",
    vendorId: "V006",
    vendorName: "Horizon Pharma Ltd.",
    boothId: "C-304",
    amount: 1500,
    method: "Cash",
    date: "2026-03-10",
    status: "Overdue",
    invoiceNo: "INV-2026-008",
  },
  {
    id: "P009",
    vendorId: "V002",
    vendorName: "TechNova Exhibits",
    boothId: "B-208",
    amount: 2500,
    method: "Card",
    date: "2026-03-09",
    status: "Paid",
    invoiceNo: "INV-2026-009",
  },
  {
    id: "P010",
    vendorId: "V004",
    vendorName: "Luxora Fashion House",
    boothId: "C-307",
    amount: 1500,
    method: "Bank Transfer",
    date: "2026-03-21",
    status: "Pending",
    invoiceNo: "INV-2026-010",
  },
];

export const initialServiceProviders: ServiceProvider[] = [
  {
    id: "SP001",
    name: "SoundWave AV Solutions",
    category: "AV & Tech",
    contactPerson: "Ravi Sharma",
    email: "ravi@soundwaveav.com",
    phone: "+91 98111 22333",
    contractStatus: "Contracted",
    fee: 85000,
    startDate: "2026-03-20",
  },
  {
    id: "SP002",
    name: "Prestige Catering Services",
    category: "Catering",
    contactPerson: "Meena Patel",
    email: "meena@prestigecatering.in",
    phone: "+91 97222 33444",
    contractStatus: "Contracted",
    fee: 120000,
    startDate: "2026-03-22",
  },
  {
    id: "SP003",
    name: "ShieldForce Security",
    category: "Security",
    contactPerson: "Arjun Nair",
    email: "arjun@shieldforce.co",
    phone: "+91 96333 44555",
    contractStatus: "Contracted",
    fee: 60000,
    startDate: "2026-03-24",
  },
  {
    id: "SP004",
    name: "CleanSweep Facility Mgmt",
    category: "Cleaning",
    contactPerson: "Sunita Rao",
    email: "sunita@cleansweep.in",
    phone: "+91 95444 55666",
    contractStatus: "Contracted",
    fee: 35000,
    startDate: "2026-03-24",
  },
  {
    id: "SP005",
    name: "FastMove Logistics",
    category: "Logistics",
    contactPerson: "Kiran Desai",
    email: "kiran@fastmove.io",
    phone: "+91 94555 66777",
    contractStatus: "Pending",
    fee: 45000,
    startDate: "2026-03-23",
  },
  {
    id: "SP006",
    name: "BrightVolt Electricals",
    category: "Electrical",
    contactPerson: "Deepak Kumar",
    email: "deepak@brightvolt.in",
    phone: "+91 93666 77888",
    contractStatus: "Contracted",
    fee: 55000,
    startDate: "2026-03-21",
  },
  {
    id: "SP007",
    name: "TasteBuds Food Court",
    category: "Catering",
    contactPerson: "Priya Singh",
    email: "priya@tastebuds.co",
    phone: "+91 92777 88999",
    contractStatus: "Cancelled",
    fee: 75000,
    startDate: "2026-03-20",
  },
  {
    id: "SP008",
    name: "NetConnect IT Services",
    category: "AV & Tech",
    contactPerson: "Vijay Mehta",
    email: "vijay@netconnect.in",
    phone: "+91 91888 99000",
    contractStatus: "Pending",
    fee: 40000,
    startDate: "2026-03-22",
  },
];

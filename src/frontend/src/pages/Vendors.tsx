import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  type Vendor,
  type VendorStatus,
  initialVendors,
} from "@/data/mockData";
import {
  CheckCircle,
  Clock,
  Plus,
  Search,
  Upload,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const statusBadge: Record<VendorStatus, string> = {
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Verified:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Rejected:
    "bg-status-rejected/20 text-status-rejected border-status-rejected/30",
};

const statusIcon: Record<VendorStatus, typeof CheckCircle> = {
  Verified: CheckCircle,
  Pending: Clock,
  Rejected: XCircle,
};

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    description: "",
    licenseNumber: "",
  });

  function approve(id: string) {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: "Verified" as VendorStatus } : v,
      ),
    );
  }

  function reject(id: string) {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: "Rejected" as VendorStatus } : v,
      ),
    );
  }

  function handleRegister() {
    if (!form.companyName || !form.email || !form.licenseNumber) return;
    const newVendor: Vendor = {
      id: `V${String(vendors.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Pending",
      registeredAt: new Date().toISOString().split("T")[0],
    };
    setVendors((prev) => [...prev, newVendor]);
    setForm({
      companyName: "",
      email: "",
      phone: "",
      description: "",
      licenseNumber: "",
    });
    setOpen(false);
  }

  const filtered = vendors.filter(
    (v) =>
      v.companyName.toLowerCase().includes(search.toLowerCase()) ||
      v.licenseNumber.toLowerCase().includes(search.toLowerCase()),
  );

  const pending = vendors.filter((v) => v.status === "Pending").length;
  const verified = vendors.filter((v) => v.status === "Verified").length;

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Vendors",
            value: vendors.length,
            color: "text-foreground",
          },
          { label: "Verified", value: verified, color: "text-status-verified" },
          {
            label: "Pending Review",
            value: pending,
            color: "text-status-pending",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: "inherit" }}
            >
              <span className={s.color}>{s.value}</span>
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-card rounded-xl border border-border shadow-card">
        <div className="px-5 py-4 border-b border-border flex items-center gap-4">
          <h2 className="text-sm font-semibold flex-1">Registered Vendors</h2>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search vendors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 w-56 text-sm"
              data-ocid="vendors.search_input"
            />
          </div>
          <Button
            size="sm"
            className="bg-teal text-background hover:bg-teal-bright"
            onClick={() => setOpen(true)}
            data-ocid="vendors.register.open_modal_button"
          >
            <Plus size={14} className="mr-1" /> Register Vendor
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs">
                Company
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                License #
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Contact
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Registered
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v, idx) => {
              const Icon = statusIcon[v.status];
              return (
                <TableRow
                  key={v.id}
                  className="border-border hover:bg-secondary/30 transition-colors"
                  data-ocid={`vendors.vendor.item.${idx + 1}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-teal-dim border border-teal/20 flex items-center justify-center text-teal text-xs font-bold">
                        {v.companyName[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {v.companyName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {v.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {v.licenseNumber}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {v.phone}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {v.registeredAt}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadge[v.status]}`}
                    >
                      <Icon size={10} />
                      {v.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {v.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-status-verified/20 text-status-verified hover:bg-status-verified/30 border border-status-verified/30"
                          variant="outline"
                          onClick={() => approve(v.id)}
                          data-ocid={`vendors.approve.button.${idx + 1}`}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-status-rejected/20 text-status-rejected hover:bg-status-rejected/30 border border-status-rejected/30"
                          variant="outline"
                          onClick={() => reject(v.id)}
                          data-ocid={`vendors.reject.button.${idx + 1}`}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {v.status !== "Pending" && (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground text-sm"
                  data-ocid="vendors.vendor.empty_state"
                >
                  No vendors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Register modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" data-ocid="vendors.register.dialog">
          <DialogHeader>
            <DialogTitle>Register New Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, companyName: e.target.value }))
                }
                placeholder="e.g. Akshay Designs Co."
                data-ocid="vendors.company_name.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="vendor@email.com"
                  data-ocid="vendors.email.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+91 …"
                  data-ocid="vendors.phone.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Brief description of your business…"
                data-ocid="vendors.description.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="licenseNumber">Trade License Number *</Label>
              <Input
                id="licenseNumber"
                value={form.licenseNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, licenseNumber: e.target.value }))
                }
                placeholder="TL-2024-XX-00000"
                data-ocid="vendors.license_number.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Trade License File</Label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-teal/50 transition-colors"
                data-ocid="vendors.license_file.dropzone"
              >
                <Upload
                  size={20}
                  className="mx-auto text-muted-foreground mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  Click or drag to upload license
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG up to 10MB
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="vendors.register.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-teal text-background hover:bg-teal-bright"
              onClick={handleRegister}
              data-ocid="vendors.register.submit_button"
            >
              Register Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

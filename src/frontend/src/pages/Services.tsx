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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ContractStatus,
  type ServiceCategory,
  type ServiceProvider,
  initialServiceProviders,
} from "@/data/mockData";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Plug,
  Plus,
  Shield,
  Sparkles,
  Truck,
  Utensils,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const contractBadge: Record<ContractStatus, string> = {
  Contracted:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Cancelled:
    "bg-status-rejected/20 text-status-rejected border-status-rejected/30",
};

const contractIcon: Record<ContractStatus, typeof CheckCircle> = {
  Contracted: CheckCircle,
  Pending: Clock,
  Cancelled: XCircle,
};

const categoryIcon: Record<ServiceCategory, typeof Briefcase> = {
  "AV & Tech": Sparkles,
  Catering: Utensils,
  Security: Shield,
  Cleaning: Sparkles,
  Logistics: Truck,
  Electrical: Plug,
};

const categoryColor: Record<ServiceCategory, string> = {
  "AV & Tech": "text-chart-2 bg-chart-2/10",
  Catering: "text-chart-4 bg-chart-4/10",
  Security: "text-chart-5 bg-chart-5/10",
  Cleaning: "text-teal bg-teal-dim",
  Logistics: "text-chart-3 bg-chart-3/10",
  Electrical: "text-chart-1 bg-chart-1/10",
};

const SERVICE_CATEGORIES: ServiceCategory[] = [
  "AV & Tech",
  "Catering",
  "Security",
  "Cleaning",
  "Logistics",
  "Electrical",
];

export default function Services() {
  const [providers, setProviders] = useState<ServiceProvider[]>(
    initialServiceProviders,
  );
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "" as ServiceCategory | "",
    contactPerson: "",
    email: "",
    phone: "",
    fee: "",
    startDate: "",
  });

  function handleAdd() {
    if (!form.name || !form.category || !form.contactPerson || !form.email)
      return;
    const newProvider: ServiceProvider = {
      id: `SP${String(providers.length + 1).padStart(3, "0")}`,
      name: form.name,
      category: form.category as ServiceCategory,
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      contractStatus: "Pending",
      fee: Number(form.fee) || 0,
      startDate: form.startDate || new Date().toISOString().split("T")[0],
    };
    setProviders((prev) => [...prev, newProvider]);
    setForm({
      name: "",
      category: "",
      contactPerson: "",
      email: "",
      phone: "",
      fee: "",
      startDate: "",
    });
    setOpen(false);
  }

  const contracted = providers.filter(
    (p) => p.contractStatus === "Contracted",
  ).length;
  const pending = providers.filter(
    (p) => p.contractStatus === "Pending",
  ).length;
  const totalFees = providers
    .filter((p) => p.contractStatus === "Contracted")
    .reduce((sum, p) => sum + p.fee, 0);

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Providers",
            value: providers.length,
            color: "text-foreground",
          },
          {
            label: "Contracted",
            value: contracted,
            color: "text-status-verified",
          },
          {
            label: "Pending",
            value: pending,
            color: "text-status-pending",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-xl border border-border p-4 shadow-card"
          >
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              {s.label}
            </div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Total contracted fees banner */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-teal-dim border border-teal/20 rounded-xl px-5 py-3 flex items-center gap-3"
      >
        <Briefcase size={16} className="text-teal flex-shrink-0" />
        <span className="text-sm font-medium text-foreground">
          Total Contracted Service Fees:{" "}
          <span className="text-teal font-bold">
            ${totalFees.toLocaleString()}
          </span>
        </span>
      </motion.div>

      {/* Header with Add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Service Provider Directory
        </h2>
        <Button
          size="sm"
          className="bg-teal text-background hover:bg-teal-bright"
          onClick={() => setOpen(true)}
          data-ocid="services.add.open_modal_button"
        >
          <Plus size={14} className="mr-1" /> Add Provider
        </Button>
      </div>

      {/* Provider cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {providers.map((sp, idx) => {
          const CatIcon = categoryIcon[sp.category];
          const ContractIcon = contractIcon[sp.contractStatus];
          return (
            <motion.div
              key={sp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="bg-card rounded-xl border border-border shadow-card p-5 space-y-4"
              data-ocid={`services.item.${idx + 1}`}
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${categoryColor[sp.category]}`}
                >
                  <CatIcon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">
                    {sp.name}
                  </div>
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${categoryColor[sp.category]}`}
                  >
                    {sp.category}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${contractBadge[sp.contractStatus]}`}
                >
                  <ContractIcon size={10} />
                  {sp.contractStatus}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-20 flex-shrink-0">
                    Contact
                  </span>
                  <span className="font-medium truncate">
                    {sp.contactPerson}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-20 flex-shrink-0">
                    Email
                  </span>
                  <span className="text-muted-foreground truncate">
                    {sp.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-20 flex-shrink-0">
                    Phone
                  </span>
                  <span className="text-muted-foreground">{sp.phone}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Starts{" "}
                  <span className="text-foreground font-medium">
                    {sp.startDate}
                  </span>
                </div>
                <div className="text-sm font-bold text-teal">
                  ${sp.fee.toLocaleString()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Provider modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" data-ocid="services.add.dialog">
          <DialogHeader>
            <DialogTitle>Add Service Provider</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="spName">Provider Name *</Label>
                <Input
                  id="spName"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. SoundWave AV Solutions"
                  data-ocid="services.provider_name.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, category: v as ServiceCategory }))
                  }
                >
                  <SelectTrigger data-ocid="services.category.select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={form.contactPerson}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contactPerson: e.target.value }))
                  }
                  placeholder="Full name"
                  data-ocid="services.contact_person.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spEmail">Email *</Label>
                <Input
                  id="spEmail"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="email@domain.com"
                  data-ocid="services.email.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spPhone">Phone</Label>
                <Input
                  id="spPhone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+91 …"
                  data-ocid="services.phone.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spFee">Service Fee (₹)</Label>
                <Input
                  id="spFee"
                  type="number"
                  value={form.fee}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fee: e.target.value }))
                  }
                  placeholder="e.g. 50000"
                  data-ocid="services.fee.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spStartDate">Start Date</Label>
                <Input
                  id="spStartDate"
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                  data-ocid="services.start_date.input"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="services.add.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-teal text-background hover:bg-teal-bright"
              onClick={handleAdd}
              data-ocid="services.add.submit_button"
            >
              Add Provider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

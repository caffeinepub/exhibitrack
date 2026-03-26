import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, PlusCircle, Wrench, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ServiceStatus = "Pending" | "Approved" | "Rejected";

interface ServiceRequest {
  id: string;
  type: string;
  details: string;
  submittedAt: string;
  status: ServiceStatus;
}

const statusStyle: Record<ServiceStatus, string> = {
  Approved:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Rejected: "bg-destructive/20 text-destructive border-destructive/30",
};

const StatusIcon = ({ status }: { status: ServiceStatus }) => {
  if (status === "Approved")
    return <CheckCircle2 className="w-3.5 h-3.5 text-status-verified" />;
  if (status === "Rejected")
    return <XCircle className="w-3.5 h-3.5 text-destructive" />;
  return <Clock className="w-3.5 h-3.5 text-status-pending" />;
};

const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: "SR-001",
    type: "Electricity",
    details: "3 power outlets, 15A each",
    submittedAt: "Mar 12, 2026",
    status: "Approved",
  },
  {
    id: "SR-002",
    type: "WiFi",
    details: "Dedicated high-speed connection",
    submittedAt: "Mar 14, 2026",
    status: "Pending",
  },
];

export default function UserServices() {
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [form, setForm] = useState({ type: "", details: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.type || !form.details.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setRequests((prev) => [
        ...prev,
        {
          id: `SR-00${prev.length + 1}`,
          type: form.type,
          details: form.details,
          submittedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          status: "Pending",
        },
      ]);
      setForm({ type: "", details: "" });
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 700);
  }

  return (
    <div className="space-y-6" data-ocid="user_services.page">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Request form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-dim border border-teal/30 flex items-center justify-center">
              <PlusCircle className="w-4 h-4 text-teal" />
            </div>
            <h2 className="text-sm font-semibold">New Service Request</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label>Service Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
              >
                <SelectTrigger data-ocid="user_services.service_type.select">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Stall Setup">Stall Setup</SelectItem>
                  <SelectItem value="Equipment Rental">
                    Equipment Rental
                  </SelectItem>
                  <SelectItem value="WiFi">WiFi</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="service-details">Quantity / Details *</Label>
              <Textarea
                id="service-details"
                placeholder="Describe your requirements..."
                rows={4}
                value={form.details}
                onChange={(e) =>
                  setForm((f) => ({ ...f, details: e.target.value }))
                }
                data-ocid="user_services.details.textarea"
              />
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg bg-status-verified/10 border border-status-verified/20 px-4 py-3 flex items-center gap-2"
                  data-ocid="user_services.success_state"
                >
                  <CheckCircle2 className="w-4 h-4 text-status-verified flex-shrink-0" />
                  <span className="text-xs text-status-verified">
                    Request submitted successfully!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full bg-teal text-background hover:bg-teal-bright font-semibold"
              disabled={isLoading || !form.type || !form.details.trim()}
              data-ocid="user_services.submit_button"
            >
              {isLoading ? "Submitting…" : "Submit Request"}
            </Button>
          </form>
        </motion.div>

        {/* Submitted requests */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="lg:col-span-3 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-dim border border-teal/30 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-teal" />
              </div>
              <h2 className="text-sm font-semibold">My Service Requests</h2>
            </div>
            <Badge
              variant="outline"
              className="border-teal/30 text-teal bg-teal-dim"
            >
              {requests.length} total
            </Badge>
          </div>
          <div
            className="divide-y divide-border"
            data-ocid="user_services.list"
          >
            <AnimatePresence initial={false}>
              {requests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="px-5 py-4 flex items-start gap-3"
                  data-ocid={`user_services.item.${i + 1}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{req.type}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {req.id}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {req.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {req.submittedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={req.status} />
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium border ${statusStyle[req.status]}`}
                    >
                      {req.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

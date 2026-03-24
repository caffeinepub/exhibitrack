import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Payment,
  type PaymentStatus,
  initialPayments,
} from "@/data/mockData";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const statusBadge: Record<PaymentStatus, string> = {
  Paid: "bg-status-verified/20 text-status-verified border-status-verified/30",
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Overdue:
    "bg-status-rejected/20 text-status-rejected border-status-rejected/30",
};

const statusIcon: Record<PaymentStatus, typeof CheckCircle> = {
  Paid: CheckCircle,
  Pending: Clock,
  Overdue: AlertCircle,
};

const METHOD_ICON: Record<string, string> = {
  Cash: "💵",
  Card: "💳",
  "Bank Transfer": "🏦",
};

export default function Payments() {
  const [payments] = useState<Payment[]>(initialPayments);
  const [tab, setTab] = useState<"All" | PaymentStatus>("All");

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments
    .filter((p) => p.status === "Overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const filtered =
    tab === "All" ? payments : payments.filter((p) => p.status === tab);

  const statCards = [
    {
      label: "Total Invoiced",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-foreground",
    },
    {
      label: "Amount Paid",
      value: `$${totalPaid.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-status-verified",
    },
    {
      label: "Pending",
      value: `$${totalPending.toLocaleString()}`,
      icon: Clock,
      color: "text-status-pending",
    },
    {
      label: "Overdue",
      value: `$${totalOverdue.toLocaleString()}`,
      icon: AlertCircle,
      color: "text-status-rejected",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card rounded-xl border border-border p-4 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {s.label}
                </span>
                <Icon size={15} className={s.color} />
              </div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Table card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-4">
          <CreditCard size={16} className="text-teal" />
          <h2 className="text-sm font-semibold flex-1">Payment Records</h2>
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as "All" | PaymentStatus)}
          >
            <TabsList className="h-8">
              {(["All", "Paid", "Pending", "Overdue"] as const).map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="text-xs px-3"
                  data-ocid={`payments.${t.toLowerCase()}.tab`}
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs">
                Invoice #
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Vendor
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Booth
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Amount
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Method
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p, idx) => {
              const Icon = statusIcon[p.status];
              return (
                <TableRow
                  key={p.id}
                  className="border-border hover:bg-secondary/30 transition-colors"
                  data-ocid={`payments.item.${idx + 1}`}
                >
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {p.invoiceNo}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-dim border border-teal/20 flex items-center justify-center text-teal text-[10px] font-bold flex-shrink-0">
                        {p.vendorName[0]}
                      </div>
                      <span className="text-sm font-medium">
                        {p.vendorName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {p.boothId}
                  </TableCell>
                  <TableCell className="text-sm font-semibold">
                    ${p.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span>{METHOD_ICON[p.method]}</span>
                      {p.method}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {p.date}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadge[p.status]}`}
                    >
                      <Icon size={10} />
                      {p.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground text-sm"
                  data-ocid="payments.empty_state"
                >
                  No payment records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}

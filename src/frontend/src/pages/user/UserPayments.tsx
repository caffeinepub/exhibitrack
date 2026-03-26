import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download } from "lucide-react";
import { motion } from "motion/react";

type PayStatus = "Paid" | "Pending" | "Failed";

const payStatusStyle: Record<PayStatus, string> = {
  Paid: "bg-status-verified/20 text-status-verified border-status-verified/30",
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Failed: "bg-destructive/20 text-destructive border-destructive/30",
};

const paymentHistory = [
  {
    id: "INV-001",
    date: "Mar 10, 2026",
    desc: "Booth Registration Fee",
    amount: "$800",
    status: "Paid" as PayStatus,
  },
  {
    id: "INV-002",
    date: "Mar 15, 2026",
    desc: "Electricity & Power Setup",
    amount: "$250",
    status: "Paid" as PayStatus,
  },
  {
    id: "INV-003",
    date: "Mar 20, 2026",
    desc: "Stall Equipment Rental",
    amount: "$150",
    status: "Pending" as PayStatus,
  },
];

export default function UserPayments() {
  return (
    <div className="space-y-6" data-ocid="user_payments.page">
      {/* Summary card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Due",
            value: "$1,200",
            sub: "Across all invoices",
            color: "text-status-pending",
          },
          {
            label: "Amount Paid",
            value: "$1,050",
            sub: "2 invoices settled",
            color: "text-status-verified",
          },
          {
            label: "Remaining Balance",
            value: "$150",
            sub: "1 invoice pending",
            color: "text-destructive",
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border shadow-card p-5"
            data-ocid={`user_payments.summary.item.${i + 1}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {card.label}
              </span>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Pay now card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="bg-card rounded-xl border border-teal/20 shadow-card p-5 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-teal-dim border border-teal/30 flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-5 h-5 text-teal" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">Outstanding Balance</h3>
          <p className="text-xs text-muted-foreground">
            Invoice INV-003 — Stall Equipment Rental — Due Mar 25, 2026
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-status-pending">$150</p>
          <Button
            size="sm"
            className="mt-1 bg-teal text-background hover:bg-teal-bright text-xs"
            data-ocid="user_payments.pay_now.primary_button"
          >
            Pay Now
          </Button>
        </div>
      </motion.div>

      {/* History table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold">Payment History</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1.5 text-muted-foreground"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
        <Table data-ocid="user_payments.table">
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((row, i) => (
              <TableRow key={row.id} data-ocid={`user_payments.row.${i + 1}`}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {row.id}
                </TableCell>
                <TableCell className="text-sm">{row.date}</TableCell>
                <TableCell className="text-sm">{row.desc}</TableCell>
                <TableCell className="text-sm font-semibold">
                  {row.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium border ${payStatusStyle[row.status]}`}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}

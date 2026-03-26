import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Wrench,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const statusColors: Record<string, string> = {
  Approved:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Rejected: "bg-destructive/20 text-destructive border-destructive/30",
  Verified:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Paid: "bg-status-verified/20 text-status-verified border-status-verified/30",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Approved" || status === "Verified" || status === "Paid")
    return <CheckCircle2 className="w-4 h-4 text-status-verified" />;
  if (status === "Rejected")
    return <XCircle className="w-4 h-4 text-destructive" />;
  return <Clock className="w-4 h-4 text-status-pending" />;
};

const quickActions = [
  {
    label: "Apply for Booth",
    icon: MapPin,
    path: "/booth-apply",
    ocid: "user_dashboard.booth_apply.button",
  },
  {
    label: "Upload Documents",
    icon: FileText,
    path: "/documents",
    ocid: "user_dashboard.documents.button",
  },
  {
    label: "View Payments",
    icon: CreditCard,
    path: "/payments",
    ocid: "user_dashboard.payments.button",
  },
  {
    label: "Request Services",
    icon: Wrench,
    path: "/services",
    ocid: "user_dashboard.services.button",
  },
];

const activityItems = [
  { msg: "Account created successfully", time: "2 days ago", type: "success" },
  {
    msg: "Booth application submitted \u2014 awaiting review",
    time: "1 day ago",
    type: "info",
  },
  {
    msg: "Document upload reminder sent",
    time: "12 hours ago",
    type: "warning",
  },
];

export default function UserDashboard() {
  const statusCards = [
    {
      label: "Booth Application",
      status: "Pending",
      detail: "Under review by admin",
    },
    { label: "Payment Status", status: "Pending", detail: "$1,200 due" },
    {
      label: "Document Verification",
      status: "Pending",
      detail: "2 of 3 uploaded",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="user_dashboard.page">
      {/* Welcome card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-card rounded-2xl border border-border shadow-card overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 100% 50%, oklch(0.75 0.12 185 / 0.1), transparent)",
          }}
        />
        <div className="relative px-6 py-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              ExhibiTrack Vendor Portal
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Manage your booth application, track your documents, payments, and
              service requests \u2014 all in one place.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-dim border border-teal/30 shadow-glow flex-shrink-0">
            <MapPin className="w-9 h-9 text-teal" />
          </div>
        </div>
      </motion.div>

      {/* Status overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-card rounded-xl border border-border shadow-card p-5"
            data-ocid={`user_dashboard.status.item.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {card.label}
              </span>
              <StatusIcon status={card.status} />
            </div>
            <Badge
              variant="outline"
              className={`text-xs font-semibold border ${statusColors[card.status]}`}
            >
              {card.status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">{card.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Quick Actions</h2>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(({ label, icon: Icon, path, ocid }) => (
            <Link key={path} to={path}>
              <Button
                variant="outline"
                className="w-full h-auto flex-col gap-2 py-4 border-border hover:border-teal/40 hover:bg-teal-dim hover:text-teal transition-all"
                data-ocid={ocid}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Activity feed */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y divide-border">
          {activityItems.map((item) => (
            <div key={item.msg} className="px-5 py-3 flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === "success"
                    ? "bg-status-verified"
                    : item.type === "warning"
                      ? "bg-status-pending"
                      : "bg-chart-2"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm text-foreground">{item.msg}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

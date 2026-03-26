import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  CreditCard,
  Database,
  Eye,
  FileSearch,
  MapPin,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const roles = [
  {
    icon: ShieldCheck,
    title: "Login & Access Control",
    description:
      "Admin securely logs in through a dedicated portal and gets full system access to manage all modules and operations.",
    color: "text-teal-400",
    bg: "bg-teal-400/10 border-teal-400/20",
  },
  {
    icon: Users,
    title: "Vendor Management",
    description:
      "View all vendor registrations in real time. Approve or reject vendor applications to control who participates in the event.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: FileSearch,
    title: "Document Verification",
    description:
      "Review uploaded documents (ID proof, license, certificates, etc.). Approve valid submissions and reject incomplete or fraudulent ones.",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
  {
    icon: MapPin,
    title: "Booth Allocation",
    description:
      "Check available booths, assign them to approved vendors, and update booth status from Available → Reserved → Occupied.",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: CreditCard,
    title: "Payment Monitoring",
    description:
      "Track all vendor payments end-to-end. Verify payment status (Paid / Pending) and reconcile revenue for the event.",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    icon: Wrench,
    title: "Service Management",
    description:
      "Manage vendor-requested additional services such as electricity connections, stall setup, and equipment provision.",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
  },
  {
    icon: Eye,
    title: "Crowd Monitoring",
    description:
      "Track live visitor count across the venue. Monitor entry and exit flows to maintain safety and prevent overcrowding.",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
  },
  {
    icon: Database,
    title: "Data Management",
    description:
      "Centrally manage all system data — vendor records, booth assignments, payment history, and verified documents — securely stored.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
  },
  {
    icon: BarChart2,
    title: "Report Generation",
    description:
      "Generate comprehensive reports including total vendors, occupied booths, payment summaries, and event analytics.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10 border-indigo-400/20",
  },
];

const flowSteps = [
  "Register",
  "Login",
  "Apply",
  "Verify",
  "Allocate Booth",
  "Payment",
  "Monitor",
  "Report",
];

export default function AdminRole() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-400/10 via-card to-blue-400/10 p-8"
        data-ocid="admin_role.section"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-teal-400/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-400/5 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-400/15 border border-teal-400/30">
              <ShieldCheck className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Admin Control Center
              </h1>
              <p className="text-sm text-muted-foreground">
                ExhibiTrack System Authority
              </p>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-5">
            Admin is the authority who manages the entire system, verifies users
            and documents, allocates booths, tracks payments, and monitors the
            event.
          </p>

          <Badge
            variant="secondary"
            className="border border-teal-400/25 bg-teal-400/10 text-teal-300 text-sm px-4 py-1.5 font-medium"
          >
            "Admin system manage cheyyum, vendors verify cheyyum, booths
            allocate cheyyum, payments track cheyyum, and overall event control
            cheyyum."
          </Badge>
        </div>
      </motion.div>

      {/* Role Cards Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Admin Responsibilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              data-ocid={`admin_role.item.${index + 1}`}
            >
              <Card className="h-full border-border/60 hover:border-border transition-all duration-200 hover:shadow-lg hover:shadow-black/20 group">
                <CardHeader className="pb-3">
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border ${role.bg} mb-3`}
                  >
                    <role.icon className={`w-5 h-5 ${role.color}`} />
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground group-hover:text-teal-400 transition-colors">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simple Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-2xl border border-border/60 bg-card p-6"
        data-ocid="admin_role.panel"
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-teal-400" />
          <h2 className="text-base font-semibold text-foreground">
            Simple Flow
          </h2>
        </div>
        <Separator className="mb-5" />
        <div className="flex flex-wrap items-center gap-2">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/60 text-sm font-medium text-foreground hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-300 transition-all duration-200">
                <span className="text-xs text-muted-foreground font-mono">
                  {i + 1}
                </span>
                {step}
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

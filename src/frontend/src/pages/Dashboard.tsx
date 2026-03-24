import {
  analyticsData,
  initialBooths,
  initialVendors,
  notifications,
} from "@/data/mockData";
import {
  Activity,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const nColor: Record<string, string> = {
  info: "border-l-chart-2",
  success: "border-l-chart-3",
  warning: "border-l-chart-4",
  error: "border-l-chart-5",
};

interface KPI {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  color: string;
}

function KPIIcon({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return <Icon className={`w-4 h-4 ${color}`} />;
}

export default function Dashboard() {
  const [liveVisitors] = useState(342);
  const available = initialBooths.filter(
    (b) => b.status === "Available",
  ).length;
  const occupied = initialBooths.filter((b) => b.status === "Occupied").length;
  const reserved = initialBooths.filter((b) => b.status === "Reserved").length;

  const kpis: KPI[] = [
    {
      label: "Active Exhibitors",
      value: "3",
      sub: "3 Verified",
      icon: Users,
      color: "text-chart-2",
    },
    {
      label: "Total Visitors (Live)",
      value: liveVisitors.toString(),
      sub: "↑ 12% vs yesterday",
      icon: Activity,
      color: "text-teal",
    },
    {
      label: "Venue Occupancy",
      value: `${analyticsData.occupancyRate}%`,
      sub: `${occupied}/${initialBooths.length} booths`,
      icon: TrendingUp,
      color: "text-chart-4",
    },
    {
      label: "Real-time Revenue",
      value: `$${analyticsData.totalRevenue.toLocaleString()}`,
      sub: "This event",
      icon: DollarSign,
      color: "text-chart-3",
    },
  ];

  const maxDay = Math.max(...analyticsData.dailyVisitors.map((d) => d.count));

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </span>
              <KPIIcon icon={kpi.icon} color={kpi.color} />
            </div>
            <div className={`text-3xl font-bold mb-1 ${kpi.color}`}>
              {kpi.value}
            </div>
            <div className="text-xs text-muted-foreground">{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Booth Overview + Active Vendors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Booth Layout Overview</h2>
          </div>
          <div className="p-5">
            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
            >
              {initialBooths.map((booth) => (
                <div
                  key={booth.id}
                  title={`${booth.id} — ${booth.status}`}
                  className={`h-10 rounded-md flex items-center justify-center text-[10px] font-semibold text-white cursor-default ${
                    booth.status === "Available"
                      ? "bg-status-available/80"
                      : booth.status === "Reserved"
                        ? "bg-status-reserved/80"
                        : "bg-status-occupied/80"
                  }`}
                >
                  {booth.id.split("-")[1]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-status-available inline-block" />
                {available} Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-status-reserved inline-block" />
                {reserved} Reserved
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-status-occupied inline-block" />
                {occupied} Occupied
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Active Vendors</h2>
          </div>
          <div className="divide-y divide-border">
            {initialVendors
              .filter((v) => v.status === "Verified")
              .map((v) => (
                <div key={v.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-dim border border-teal/20 flex items-center justify-center text-teal text-xs font-bold flex-shrink-0">
                    {v.companyName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {v.companyName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {v.boothId ?? "—"}
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-status-verified ml-auto flex-shrink-0" />
                </div>
              ))}
            {initialVendors
              .filter((v) => v.status === "Pending")
              .map((v) => (
                <div key={v.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground text-xs font-bold flex-shrink-0">
                    {v.companyName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {v.companyName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Awaiting review
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-status-pending ml-auto flex-shrink-0" />
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Analytics mini + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">
              Visitor Footfall (This Week)
            </h2>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-3 h-32">
              {analyticsData.dailyVisitors.map((d) => (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full rounded-t-sm bg-teal/60 transition-all duration-500"
                    style={{
                      height: `${(d.count / maxDay) * 100}%`,
                      minHeight: 4,
                    }}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {d.day}
                  </span>
                  <span className="text-[11px] font-medium">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">System Notifications</h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/20 text-destructive font-semibold">
              3 new
            </span>
          </div>
          <div className="divide-y divide-border">
            {notifications.slice(0, 4).map((n) => (
              <div
                key={n.id}
                className={`px-4 py-3 border-l-2 ${nColor[n.type]}`}
              >
                <p className="text-xs text-foreground leading-relaxed">
                  {n.message}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {n.time}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

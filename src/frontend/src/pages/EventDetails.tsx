import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  initialBooths,
  initialPayments,
  initialVendors,
} from "@/data/mockData";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  ExternalLink,
  Mail,
  MapPin,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const eventInfo = {
  eventName: "TradeFair Expo 2026",
  venueName: "Bombay Exhibition Centre",
  venueCapacity: 500,
  eventStartDate: "2026-03-24",
  eventEndDate: "2026-03-27",
  description:
    "India's premier annual trade exhibition connecting exhibitors, vendors, and visitors across 24+ booth sections. Featuring cutting-edge products, networking opportunities, and live demonstrations from top industry players.",
  adminName: "Rajesh Kumar",
  adminEmail: "rajesh@exhibitrack.com",
};

function daysBetween(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function timelineProgress(start: string, end: string) {
  const now = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (now < s) return 0;
  if (now > e) return 100;
  return Math.round(
    ((now.getTime() - s.getTime()) / (e.getTime() - s.getTime())) * 100,
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetails() {
  const totalVendors = initialVendors.length;
  const occupiedBooths = initialBooths.filter(
    (b) => b.status === "Occupied",
  ).length;
  const registeredVisitors = 1892;
  const totalRevenue = initialPayments
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const duration = daysBetween(
    eventInfo.eventStartDate,
    eventInfo.eventEndDate,
  );
  const progress = timelineProgress(
    eventInfo.eventStartDate,
    eventInfo.eventEndDate,
  );

  const now = new Date();
  const startDate = new Date(eventInfo.eventStartDate);
  const endDate = new Date(eventInfo.eventEndDate);
  const isLive = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;

  const stats = [
    {
      label: "Total Vendors",
      value: totalVendors,
      icon: Users,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      label: "Occupied Booths",
      value: occupiedBooths,
      icon: Building2,
      color: "text-teal",
      bg: "bg-teal-dim",
    },
    {
      label: "Registered Visitors",
      value: registeredVisitors.toLocaleString(),
      icon: Users,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-chart-4",
      bg: "bg-chart-4/10",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden border border-border bg-card"
        data-ocid="event_details.section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.75 0.12 185), transparent)",
          }}
        />
        <div className="relative px-8 py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  className={`text-xs font-bold px-3 py-1 ${
                    isLive
                      ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                      : isUpcoming
                        ? "bg-chart-2/20 text-chart-2 border border-chart-2/30"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isLive ? "● LIVE" : isUpcoming ? "UPCOMING" : "COMPLETED"}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {eventInfo.eventName}
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {eventInfo.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {s.label}
              </span>
              <div
                className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center`}
              >
                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Date/Schedule + Venue cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays className="w-4 h-4 text-teal" />
            <h2 className="text-sm font-semibold">Date & Schedule</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Start Date
                </div>
                <div className="text-sm font-medium">
                  {formatDate(eventInfo.eventStartDate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  End Date
                </div>
                <div className="text-sm font-medium">
                  {formatDate(eventInfo.eventEndDate)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Duration:{" "}
                <span className="font-semibold text-foreground">
                  {duration} days
                </span>
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Event Timeline</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>{eventInfo.eventStartDate}</span>
                <span>{eventInfo.eventEndDate}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-teal" />
            <h2 className="text-sm font-semibold">Venue Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Venue Name
              </div>
              <div className="text-base font-semibold">
                {eventInfo.venueName}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Max Capacity
              </div>
              <div className="text-sm font-medium">
                {eventInfo.venueCapacity.toLocaleString()} visitors
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Visitor Load</span>
                <span>
                  {Math.round(
                    (registeredVisitors / eventInfo.venueCapacity) * 100,
                  )}
                  %
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  Math.round(
                    (registeredVisitors / eventInfo.venueCapacity) * 100,
                  ),
                )}
                className="h-2"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Mumbai, Maharashtra, India
            </div>
          </div>
        </motion.div>
      </div>

      {/* Organizer card + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-teal" />
            <h2 className="text-sm font-semibold">Organizer</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-dim border border-teal/30 flex items-center justify-center text-teal text-lg font-bold flex-shrink-0">
              {eventInfo.adminName[0]}
            </div>
            <div>
              <div className="text-base font-semibold">
                {eventInfo.adminName}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {eventInfo.adminEmail}
                </span>
              </div>
              <Badge className="mt-2 text-[10px] px-2 py-0 bg-teal-dim text-teal border border-teal/20">
                Event Administrator
              </Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.57 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <ExternalLink className="w-4 h-4 text-teal" />
            <h2 className="text-sm font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link to="/settings">
              <Button
                className="w-full justify-start gap-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                variant="outline"
                data-ocid="event_details.edit_settings.button"
              >
                <Settings className="w-4 h-4 text-teal" />
                Edit Event Settings
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                className="w-full justify-start gap-3 bg-teal text-background hover:bg-teal-bright"
                data-ocid="event_details.view_analytics.button"
              >
                <ExternalLink className="w-4 h-4" />
                View Analytics
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

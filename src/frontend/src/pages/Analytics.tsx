import { analyticsData } from "@/data/mockData";
import type { LucideIcon } from "lucide-react";
import { Award, DollarSign, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

function KPIIcon({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return <Icon className={`w-4 h-4 ${color}`} />;
}

export default function Analytics() {
  const maxDaily = Math.max(...analyticsData.dailyVisitors.map((d) => d.count));
  const maxRevenue = Math.max(
    ...analyticsData.revenueByZone.map((z) => z.revenue),
  );

  const kpis: {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
  }[] = [
    {
      label: "Total Revenue",
      value: `$${analyticsData.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-chart-3",
    },
    {
      label: "Total Visitors",
      value: analyticsData.totalVisitors.toLocaleString(),
      icon: Users,
      color: "text-teal",
    },
    {
      label: "Occupancy Rate",
      value: `${analyticsData.occupancyRate}%`,
      icon: TrendingUp,
      color: "text-chart-4",
    },
    {
      label: "Top Section",
      value: "Zone A",
      icon: Award,
      color: "text-chart-2",
    },
  ];

  // SVG line chart
  const w = 500;
  const h = 120;
  const pad = 20;
  const points = analyticsData.dailyVisitors.map((d, i) => {
    const x =
      pad + (i / (analyticsData.dailyVisitors.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.count - 200) / (maxDaily - 200)) * (h - pad * 2);
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  const areaPath = `M ${points[0]} L ${points.join(" L ")} L ${pad + (w - pad * 2)},${h - pad} L ${pad},${h - pad} Z`;

  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {k.label}
              </span>
              <KPIIcon icon={k.icon} color={k.color} />
            </div>
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Line chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Visitor Trend (Daily)</h2>
          </div>
          <div className="p-5">
            <svg
              width="100%"
              viewBox={`0 0 ${w} ${h + 20}`}
              className="overflow-visible"
              aria-label="Visitor trend line chart"
              role="img"
            >
              <title>Visitor Trend (Daily)</title>
              {[200, 260, 320, 380].map((v) => {
                const y =
                  h - pad - ((v - 200) / (maxDaily - 200)) * (h - pad * 2);
                return (
                  <g key={v}>
                    <line
                      x1={pad}
                      y1={y}
                      x2={w - pad}
                      y2={y}
                      stroke="oklch(0.21 0.007 240)"
                      strokeDasharray="4"
                    />
                    <text
                      x={pad - 5}
                      y={y + 4}
                      textAnchor="end"
                      fill="oklch(0.6 0.012 240)"
                      fontSize={10}
                    >
                      {v}
                    </text>
                  </g>
                );
              })}
              <path d={areaPath} fill="oklch(0.75 0.12 185 / 0.1)" />
              <polyline
                points={polyline}
                fill="none"
                stroke="oklch(0.75 0.12 185)"
                strokeWidth={2}
                strokeLinejoin="round"
              />
              {analyticsData.dailyVisitors.map((d, i) => {
                const x =
                  pad +
                  (i / (analyticsData.dailyVisitors.length - 1)) *
                    (w - pad * 2);
                const y =
                  h -
                  pad -
                  ((d.count - 200) / (maxDaily - 200)) * (h - pad * 2);
                return (
                  <g key={d.day}>
                    <circle cx={x} cy={y} r={4} fill="oklch(0.75 0.12 185)" />
                    <text
                      x={x}
                      y={h + 10}
                      textAnchor="middle"
                      fill="oklch(0.6 0.012 240)"
                      fontSize={11}
                    >
                      {d.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Revenue by Zone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border shadow-card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Revenue by Zone</h2>
          </div>
          <div className="p-5 space-y-4">
            {analyticsData.revenueByZone.map((z, i) => (
              <div key={z.zone}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{z.zone}</span>
                  <span className="text-teal font-semibold">
                    ${z.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="h-7 bg-secondary rounded-md overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(z.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-md"
                    style={{
                      background:
                        i === 0
                          ? "oklch(0.75 0.12 185)"
                          : i === 1
                            ? "oklch(0.6 0.2 240)"
                            : "oklch(0.75 0.18 65)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Popular sections */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Top 5 Most Popular Sections</h2>
        </div>
        <div className="divide-y divide-border">
          {analyticsData.popularSections.map((s, idx) => (
            <div
              key={s.rank}
              className="px-5 py-3.5 flex items-center gap-4"
              data-ocid={`analytics.popular_sections.item.${idx + 1}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  s.rank === 1
                    ? "bg-chart-4/20 text-chart-4"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s.rank}
              </span>
              <span className="flex-1 text-sm">{s.section}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal rounded-full"
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold w-10 text-right">
                  {s.visitors}
                </span>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {s.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

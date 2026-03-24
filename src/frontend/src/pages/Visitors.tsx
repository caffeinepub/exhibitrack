import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type VisitorLog, initialVisitorLogs } from "@/data/mockData";
import {
  ArrowDown,
  ArrowUp,
  LogIn,
  LogOut,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const VENUE_CAPACITY = 500;

const hourlyData = [
  { hour: "8am", count: 45 },
  { hour: "9am", count: 112 },
  { hour: "10am", count: 187 },
  { hour: "11am", count: 243 },
  { hour: "12pm", count: 298 },
  { hour: "1pm", count: 342 },
];

export default function Visitors() {
  const [liveCount, setLiveCount] = useState(342);
  const [logs, setLogs] = useState<VisitorLog[]>(initialVisitorLogs);
  const [totalEntries, setTotalEntries] = useState(1892);

  function logEntry() {
    setLiveCount((c) => Math.min(c + 1, VENUE_CAPACITY));
    setTotalEntries((t) => t + 1);
    const newLog: VisitorLog = {
      id: `L${String(logs.length + 1).padStart(3, "0")}`,
      type: "Entry",
      timestamp: new Date().toLocaleString(),
      gate: ["Gate A", "Gate B", "Gate C"][Math.floor(Math.random() * 3)],
    };
    setLogs((prev) => [newLog, ...prev]);
  }

  function logExit() {
    setLiveCount((c) => Math.max(c - 1, 0));
    const newLog: VisitorLog = {
      id: `L${String(logs.length + 1).padStart(3, "0")}`,
      type: "Exit",
      timestamp: new Date().toLocaleString(),
      gate: ["Gate A", "Gate B", "Gate C"][Math.floor(Math.random() * 3)],
    };
    setLogs((prev) => [newLog, ...prev]);
  }

  const occupancyPct = Math.round((liveCount / VENUE_CAPACITY) * 100);
  const maxHour = Math.max(...hourlyData.map((h) => h.count));

  return (
    <div className="space-y-5">
      {/* Live counter + controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Big counter */}
        <motion.div
          className="lg:col-span-1 bg-card rounded-xl border border-border shadow-card p-8 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-status-verified animate-pulse-dot" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Live Inside
            </span>
          </div>
          <div
            className="text-6xl font-bold text-teal mb-2 animate-count-up"
            data-ocid="visitors.live_count.panel"
          >
            {liveCount}
          </div>
          <div className="text-sm text-muted-foreground mb-1">
            of {VENUE_CAPACITY} capacity
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-3">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                occupancyPct > 80
                  ? "bg-status-occupied"
                  : occupancyPct > 60
                    ? "bg-status-reserved"
                    : "bg-teal"
              }`}
              style={{ width: `${occupancyPct}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {occupancyPct}% occupancy
          </div>
        </motion.div>

        {/* Controls + stats */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="h-20 text-base font-semibold bg-status-verified/20 hover:bg-status-verified/30 text-status-verified border border-status-verified/30 flex-col gap-2"
              variant="outline"
              onClick={logEntry}
              data-ocid="visitors.log_entry.button"
            >
              <LogIn size={24} />
              Log Entry
            </Button>
            <Button
              className="h-20 text-base font-semibold bg-status-occupied/20 hover:bg-status-occupied/30 text-status-occupied border border-status-occupied/30 flex-col gap-2"
              variant="outline"
              onClick={logExit}
              data-ocid="visitors.log_exit.button"
            >
              <LogOut size={24} />
              Log Exit
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Users size={12} /> Total Visitors Today
              </div>
              <div className="text-2xl font-bold">
                {totalEntries.toLocaleString()}
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <TrendingUp size={12} /> Peak Hour
              </div>
              <div className="text-2xl font-bold text-teal">12 – 1pm</div>
              <div className="text-xs text-muted-foreground">342 visitors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly footfall chart */}
      <div className="bg-card rounded-xl border border-border shadow-card">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Hourly Footfall</h2>
        </div>
        <div className="p-5">
          <div className="flex items-end gap-3 h-40">
            {hourlyData.map((h) => (
              <div
                key={h.hour}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-xs font-semibold text-teal">
                  {h.count}
                </span>
                <div
                  className="w-full rounded-t bg-teal/50 hover:bg-teal/70 transition-colors"
                  style={{
                    height: `${(h.count / maxHour) * 80}%`,
                    minHeight: 4,
                  }}
                />
                <span className="text-[11px] text-muted-foreground">
                  {h.hour}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log table */}
      <div className="bg-card rounded-xl border border-border shadow-card">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Recent Entry / Exit Log</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs">#</TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Type
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Timestamp
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Gate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.slice(0, 12).map((log, idx) => (
              <TableRow
                key={log.id}
                className="border-border hover:bg-secondary/30"
                data-ocid={`visitors.log.item.${idx + 1}`}
              >
                <TableCell className="text-xs text-muted-foreground">
                  {log.id}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      log.type === "Entry"
                        ? "text-status-verified"
                        : "text-status-occupied"
                    }`}
                  >
                    {log.type === "Entry" ? (
                      <ArrowUp size={11} />
                    ) : (
                      <ArrowDown size={11} />
                    )}
                    {log.type}
                  </span>
                </TableCell>
                <TableCell className="text-xs">{log.timestamp}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {log.gate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

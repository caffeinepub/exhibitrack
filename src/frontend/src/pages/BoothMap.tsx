import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Booth,
  type BoothStatus,
  initialBooths,
  initialVendors,
} from "@/data/mockData";
import { Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type FilterStatus = "All" | BoothStatus;

export default function BoothMap() {
  const [booths, setBooths] = useState(initialBooths);
  const [selected, setSelected] = useState<Booth | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("All");

  const available = booths.filter((b) => b.status === "Available").length;
  const reserved = booths.filter((b) => b.status === "Reserved").length;
  const occupied = booths.filter((b) => b.status === "Occupied").length;

  function changeStatus(boothId: string, newStatus: BoothStatus) {
    setBooths((prev) =>
      prev.map((b) => (b.id === boothId ? { ...b, status: newStatus } : b)),
    );
    setSelected((prev) =>
      prev && prev.id === boothId ? { ...prev, status: newStatus } : prev,
    );
  }

  function assignVendor(boothId: string, vendorId: string | null) {
    const newStatus: BoothStatus = vendorId ? "Occupied" : "Available";
    setBooths((prev) =>
      prev.map((b) =>
        b.id === boothId
          ? { ...b, vendorId: vendorId ?? undefined, status: newStatus }
          : b,
      ),
    );
    setSelected((prev) =>
      prev && prev.id === boothId
        ? { ...prev, vendorId: vendorId ?? undefined, status: newStatus }
        : prev,
    );
  }

  function getBoothClass(booth: Booth) {
    const base =
      "rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 transition-all duration-200";
    if (booth.status === "Available")
      return `${base} bg-status-available/20 border-status-available text-status-available`;
    if (booth.status === "Reserved")
      return `${base} bg-status-reserved/20 border-status-reserved text-status-reserved`;
    return `${base} bg-status-occupied/20 border-status-occupied text-status-occupied`;
  }

  const selectedVendor = selected?.vendorId
    ? initialVendors.find((v) => v.id === selected.vendorId)
    : null;

  const rows = [1, 2, 3, 4];

  return (
    <div className="space-y-5">
      {/* Header controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-status-available inline-block" />
            <span className="text-muted-foreground">{available} Available</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-status-reserved inline-block" />
            <span className="text-muted-foreground">{reserved} Reserved</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-status-occupied inline-block" />
            <span className="text-muted-foreground">{occupied} Occupied</span>
          </span>
        </div>
        <div className="ml-auto">
          <Select
            value={filter}
            onValueChange={(v) => setFilter(v as FilterStatus)}
          >
            <SelectTrigger className="w-36" data-ocid="booth_map.filter.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Booths</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map */}
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row}>
              <div className="text-xs text-muted-foreground mb-2 font-medium">
                Zone {row <= 2 ? "A" : row === 3 ? "B" : "C"} — Row {row}
              </div>
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
              >
                {booths
                  .filter((b) => b.row === row)
                  .filter((b) => filter === "All" || b.status === filter)
                  .map((booth) => (
                    <motion.div
                      key={booth.id}
                      layoutId={booth.id}
                      onClick={() => setSelected(booth)}
                      className={getBoothClass(booth)}
                      style={{ height: 72 }}
                      data-ocid="booth_map.booth.card"
                      whileHover={{ scale: 1.04 }}
                    >
                      <span className="text-xs font-bold">{booth.id}</span>
                      <span className="text-[10px] opacity-70">
                        {booth.category[0]}
                      </span>
                      {booth.status === "Occupied" && booth.vendorId && (
                        <span className="text-[9px] opacity-60">●</span>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 w-80 bg-card border border-border rounded-xl shadow-card p-5 z-50"
            data-ocid="booth_map.detail.panel"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Info size={14} className="text-teal" />
                  {selected.id}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selected.zone} Zone · {selected.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="booth_map.detail.close_button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions</span>
                <span className="font-medium">{selected.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">
                  ${selected.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    selected.status === "Available"
                      ? "bg-status-available/20 text-status-available"
                      : selected.status === "Reserved"
                        ? "bg-status-reserved/20 text-status-reserved"
                        : "bg-status-occupied/20 text-status-occupied"
                  }`}
                >
                  {selected.status}
                </span>
              </div>
              {selectedVendor && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vendor</span>
                  <span className="font-medium text-teal">
                    {selectedVendor.companyName}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-3">
              <p className="text-xs text-muted-foreground font-medium">
                Change Status
              </p>
              <div className="flex gap-2">
                {(["Available", "Reserved", "Occupied"] as BoothStatus[]).map(
                  (s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selected.status === s ? "default" : "outline"}
                      className={`flex-1 text-[11px] ${
                        selected.status === s ? "bg-teal text-background" : ""
                      }`}
                      onClick={() => changeStatus(selected.id, s)}
                      data-ocid={`booth_map.status_${s.toLowerCase()}.button`}
                    >
                      {s}
                    </Button>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Assign Vendor
              </p>
              <Select
                value={selected.vendorId ?? "__unassign__"}
                onValueChange={(val) =>
                  assignVendor(selected.id, val === "__unassign__" ? null : val)
                }
              >
                <SelectTrigger
                  className="w-full text-xs"
                  data-ocid="booth_map.assign_vendor.select"
                >
                  <SelectValue placeholder="-- Select Vendor --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__unassign__">-- Unassign --</SelectItem>
                  {initialVendors.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

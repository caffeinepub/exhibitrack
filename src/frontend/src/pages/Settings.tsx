import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Building, Calendar, Save, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    adminName: "Rajesh Kumar",
    adminEmail: "rajesh@exhibitrack.com",
    eventName: "TradeFair Expo 2026",
    venueName: "Bombay Exhibition Centre",
    venueCapacity: "500",
    eventStartDate: "2026-03-24",
    eventEndDate: "2026-03-27",
    description:
      "India's premier annual trade exhibition connecting exhibitors, vendors, and visitors across 24+ booth sections.",
    enableNotifications: true,
    enableLiveTracking: true,
    enableAutoReports: false,
  });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Admin Profile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Users size={14} className="text-teal" />
          <h2 className="text-sm font-semibold">Admin Profile</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-dim border-2 border-teal/30 flex items-center justify-center text-teal text-xl font-bold">
              {settings.adminName[0]}
            </div>
            <div>
              <p className="text-sm font-semibold">{settings.adminName}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="adminName">Full Name</Label>
              <Input
                id="adminName"
                value={settings.adminName}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, adminName: e.target.value }))
                }
                data-ocid="settings.admin_name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, adminEmail: e.target.value }))
                }
                data-ocid="settings.admin_email.input"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Event Details */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Calendar size={14} className="text-teal" />
          <h2 className="text-sm font-semibold">Event Details</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              value={settings.eventName}
              onChange={(e) =>
                setSettings((s) => ({ ...s, eventName: e.target.value }))
              }
              data-ocid="settings.event_name.input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={settings.eventStartDate}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, eventStartDate: e.target.value }))
                }
                data-ocid="settings.start_date.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={settings.eventEndDate}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, eventEndDate: e.target.value }))
                }
                data-ocid="settings.end_date.input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={settings.description}
              onChange={(e) =>
                setSettings((s) => ({ ...s, description: e.target.value }))
              }
              data-ocid="settings.description.textarea"
            />
          </div>
        </div>
      </motion.div>

      {/* Venue Settings */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Building size={14} className="text-teal" />
          <h2 className="text-sm font-semibold">Venue Configuration</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="venueName">Venue Name</Label>
              <Input
                id="venueName"
                value={settings.venueName}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, venueName: e.target.value }))
                }
                data-ocid="settings.venue_name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="venueCapacity">Max Capacity</Label>
              <Input
                id="venueCapacity"
                type="number"
                value={settings.venueCapacity}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, venueCapacity: e.target.value }))
                }
                data-ocid="settings.venue_capacity.input"
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Feature Toggles
            </p>
            {(
              [
                {
                  key: "enableNotifications",
                  label: "Push Notifications",
                  desc: "Notify on vendor registration and booth changes",
                },
                {
                  key: "enableLiveTracking",
                  label: "Live Visitor Tracking",
                  desc: "Real-time crowd monitoring",
                },
                {
                  key: "enableAutoReports",
                  label: "Auto-generate Reports",
                  desc: "Daily analytics digest at midnight",
                },
              ] as const
            ).map((item) => (
              <div
                key={item.key}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={settings[item.key]}
                  onCheckedChange={(v) =>
                    setSettings((s) => ({ ...s, [item.key]: v }))
                  }
                  data-ocid={`settings.${item.key}.switch`}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <Button
        className={`w-full ${saved ? "bg-status-verified text-white" : "bg-teal text-background hover:bg-teal-bright"}`}
        onClick={handleSave}
        data-ocid="settings.save.submit_button"
      >
        <Save size={15} className="mr-2" />
        {saved ? "Saved Successfully!" : "Save Settings"}
      </Button>
    </div>
  );
}

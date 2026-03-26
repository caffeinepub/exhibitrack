import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { CheckCircle2, Edit2, Loader2, Save, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileForm {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  company: string;
}

export default function UserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const storedAuth = (() => {
    try {
      return JSON.parse(localStorage.getItem("exhibitrack_auth") ?? "{}");
    } catch {
      return {};
    }
  })();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    fullName: storedAuth.name ?? "Priya Sharma",
    email: storedAuth.name?.includes("@")
      ? storedAuth.name
      : "priya.sharma@example.com",
    phone: "+91 98765 43210",
    bio: "Retail vendor specializing in handicrafts and handmade goods. Exhibiting at trade fairs for 5+ years.",
    company: "Artisan Craft Co.",
  });
  const [draft, setDraft] = useState<ProfileForm>({ ...form });

  function handleEdit() {
    setDraft({ ...form });
    setEditing(true);
  }

  async function handleSave() {
    if (!actor) {
      toast.error("Not connected. Please wait and try again.");
      return;
    }
    setIsSaving(true);
    try {
      await actor.saveCallerUserProfile({
        name: draft.fullName,
        businessName: draft.company,
        email: draft.email || undefined,
        phone: draft.phone || undefined,
        description: draft.bio || undefined,
        image: undefined,
      });
      setForm({ ...draft });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      toast.success("Profile saved successfully!");
    } catch (_err) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setDraft({ ...form });
    setEditing(false);
  }

  const initials = form.fullName
    .split(" ")
    .map((s) => s[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

  const current = editing ? draft : form;

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-ocid="user_profile.page">
      {/* Profile header card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-2xl border border-border shadow-card p-6 flex items-center gap-5"
      >
        <Avatar className="w-20 h-20 border-2 border-teal/30 shadow-glow">
          <AvatarFallback className="bg-teal-dim text-teal text-2xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground truncate">
            {form.fullName}
          </h2>
          <p className="text-sm text-muted-foreground truncate">{form.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="outline"
              className="border-teal/30 text-teal bg-teal-dim text-xs"
            >
              Vendor
            </Badge>
            <Badge
              variant="outline"
              className="border-status-pending/30 text-status-pending bg-status-pending/10 text-xs"
            >
              Pending Approval
            </Badge>
          </div>
        </div>
        <div>
          {!editing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="gap-1.5 hover:border-teal/40 hover:bg-teal-dim hover:text-teal"
              data-ocid="user_profile.edit_button"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
                data-ocid="user_profile.cancel_button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-teal text-background hover:bg-teal-bright gap-1.5"
                onClick={handleSave}
                disabled={isSaving || actorFetching}
                data-ocid="user_profile.save_button"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {isSaving ? "Saving…" : "Save"}
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl bg-status-verified/10 border border-status-verified/20 px-5 py-3 flex items-center gap-3"
            data-ocid="user_profile.success_state"
          >
            <CheckCircle2 className="w-4 h-4 text-status-verified" />
            <span className="text-sm text-status-verified">
              Profile updated successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-dim border border-teal/30 flex items-center justify-center">
            <User className="w-4 h-4 text-teal" />
          </div>
          <h3 className="text-sm font-semibold">Personal Information</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                value={current.fullName}
                onChange={(e) =>
                  setDraft((f) => ({ ...f, fullName: e.target.value }))
                }
                disabled={!editing}
                data-ocid="user_profile.full_name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={current.company}
                onChange={(e) =>
                  setDraft((f) => ({ ...f, company: e.target.value }))
                }
                disabled={!editing}
                data-ocid="user_profile.company.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={current.email}
                onChange={(e) =>
                  setDraft((f) => ({ ...f, email: e.target.value }))
                }
                disabled={!editing}
                data-ocid="user_profile.email.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={current.phone}
                onChange={(e) =>
                  setDraft((f) => ({ ...f, phone: e.target.value }))
                }
                disabled={!editing}
                data-ocid="user_profile.phone.input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              value={current.bio}
              onChange={(e) => setDraft((f) => ({ ...f, bio: e.target.value }))}
              disabled={!editing}
              data-ocid="user_profile.bio.textarea"
            />
          </div>
        </div>
      </motion.div>

      {/* Account info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">Account Status</h3>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: "Account Type", value: "Vendor", type: "neutral" },
            {
              label: "Registration Status",
              value: "Pending Admin Approval",
              type: "warning",
            },
            { label: "Member Since", value: "March 2026", type: "neutral" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span
                className={`text-sm font-medium ${
                  item.type === "warning"
                    ? "text-status-pending"
                    : "text-foreground"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

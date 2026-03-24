import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { CheckCircle, Loader2, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ProfileType = "Visitor" | "Vendor" | "Organizer";

export default function UserRegister() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileType: "" as ProfileType | "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!formData.profileType) {
      setError("Please select a profile type.");
      return;
    }
    if (!actor) {
      setError("Not connected. Please wait and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await actor.saveCallerUserProfile({
        name: formData.name.trim(),
        businessName: "",
        image: undefined,
        email: formData.email ? formData.email.trim() : undefined,
        phone: formData.phone ? formData.phone.trim() : undefined,
        description: formData.description
          ? formData.description.trim()
          : undefined,
      });
      await actor.requestApproval();
      setSubmitted(true);
    } catch (_err) {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            data-ocid="register.success_state"
          >
            <Card className="border-teal/30 shadow-glow bg-card">
              <CardContent className="flex flex-col items-center gap-5 py-16 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-dim border border-teal/30">
                  <CheckCircle className="w-8 h-8 text-teal" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Registration Submitted!
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    Your account is pending approval. You will be notified once
                    an administrator reviews your application.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-teal/30 text-teal hover:bg-teal-dim mt-2"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      profileType: "",
                      description: "",
                    });
                  }}
                  data-ocid="register.secondary_button"
                >
                  Submit Another Registration
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Card className="border-border shadow-card bg-card">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-dim border border-teal/30">
                    <UserPlus className="w-4 h-4 text-teal" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    User Registration
                  </CardTitle>
                </div>
                <CardDescription>
                  Register as a visitor, vendor, or organizer for ExhibiTrack
                  events. Your account will be reviewed and approved by an
                  administrator.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="register.modal"
                >
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Jane Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="register.input"
                      required
                    />
                  </div>

                  {/* Email & Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        data-ocid="register.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 555 000 0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        data-ocid="register.input"
                      />
                    </div>
                  </div>

                  {/* Profile Type */}
                  <div className="space-y-1.5">
                    <Label htmlFor="profile-type">
                      Profile Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.profileType}
                      onValueChange={(v) =>
                        setFormData((p) => ({
                          ...p,
                          profileType: v as ProfileType,
                        }))
                      }
                    >
                      <SelectTrigger
                        id="profile-type"
                        data-ocid="register.select"
                      >
                        <SelectValue placeholder="Select your role…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Visitor">Visitor</SelectItem>
                        <SelectItem value="Vendor">Vendor</SelectItem>
                        <SelectItem value="Organizer">Organizer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <Label htmlFor="description">
                      Description / Bio{" "}
                      <span className="text-muted-foreground text-xs">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us a bit about yourself or your business…"
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      data-ocid="register.textarea"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register.error_state"
                    >
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:brightness-110"
                    data-ocid="register.submit_button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Submitting…
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" /> Submit
                        Registration
                      </>
                    )}
                  </Button>

                  {isSubmitting && (
                    <p
                      className="text-xs text-center text-muted-foreground"
                      data-ocid="register.loading_state"
                    >
                      Saving your profile and requesting approval…
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

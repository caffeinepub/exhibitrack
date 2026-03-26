import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { CheckCircle2, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface BoothForm {
  businessName: string;
  boothType: string;
  preferredSize: string;
  preferredLocation: string;
  description: string;
}

export default function UserBoothApply() {
  const [form, setForm] = useState<BoothForm>({
    businessName: "",
    boothType: "",
    preferredSize: "",
    preferredLocation: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 800);
  }

  function handleReset() {
    setForm({
      businessName: "",
      boothType: "",
      preferredSize: "",
      preferredLocation: "",
      description: "",
    });
    setSubmitted(false);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-ocid="booth_apply.page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-2xl border border-border shadow-card"
      >
        <div className="px-6 py-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-dim border border-teal/30 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-teal" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Apply for a Booth</h2>
            <p className="text-xs text-muted-foreground">
              Submit your booth request for admin review
            </p>
          </div>
          <Badge
            variant="outline"
            className="ml-auto border-status-pending/40 text-status-pending bg-status-pending/10"
          >
            Open
          </Badge>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center justify-center py-12 text-center"
                data-ocid="booth_apply.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-status-verified/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-status-verified" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Application Submitted!
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  Your booth application is under review. You'll be notified
                  once the admin approves or rejects it.
                </p>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  data-ocid="booth_apply.new_application.button"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input
                    id="business-name"
                    placeholder="e.g. Sunrise Electronics"
                    value={form.businessName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, businessName: e.target.value }))
                    }
                    required
                    data-ocid="booth_apply.business_name.input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Booth Type *</Label>
                    <Select
                      value={form.boothType}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, boothType: v }))
                      }
                      required
                    >
                      <SelectTrigger data-ocid="booth_apply.booth_type.select">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Preferred Size *</Label>
                    <Select
                      value={form.preferredSize}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, preferredSize: v }))
                      }
                      required
                    >
                      <SelectTrigger data-ocid="booth_apply.preferred_size.select">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (3×3m)</SelectItem>
                        <SelectItem value="medium">Medium (6×3m)</SelectItem>
                        <SelectItem value="large">Large (9×6m)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="preferred-location">Preferred Location</Label>
                  <Input
                    id="preferred-location"
                    placeholder="e.g. Hall A, near entrance"
                    value={form.preferredLocation}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        preferredLocation: e.target.value,
                      }))
                    }
                    data-ocid="booth_apply.location.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your business, products, or services..."
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    data-ocid="booth_apply.description.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal text-background hover:bg-teal-bright font-semibold"
                  disabled={
                    isLoading ||
                    !form.businessName ||
                    !form.boothType ||
                    !form.preferredSize
                  }
                  data-ocid="booth_apply.submit_button"
                >
                  {isLoading ? "Submitting…" : "Submit Application"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

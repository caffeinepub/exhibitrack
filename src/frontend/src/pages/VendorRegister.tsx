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
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const initialForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  category: "",
  description: "",
  tradeLicense: "",
};

export default function VendorRegister() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(
      "Registration submitted successfully! We'll review your application shortly.",
    );
    setForm(initialForm);
    setSubmitting(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Vendor Registration
        </h2>
        <p className="text-muted-foreground mt-1">
          Fill in your details below to apply for exhibition participation. Our
          team will review your application within 2–3 business days.
        </p>
      </div>

      <Card data-ocid="vendor_register.card">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Provide accurate details to speed up your approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="vendor_register.panel"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyName">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companyName"
                  data-ocid="vendor_register.input"
                  placeholder="Acme Corp"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contactPerson">
                  Contact Person <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactPerson"
                  data-ocid="vendor_register.input"
                  placeholder="Jane Doe"
                  value={form.contactPerson}
                  onChange={(e) =>
                    handleChange("contactPerson", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="vendor_register.input"
                  placeholder="jane@acmecorp.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  data-ocid="vendor_register.input"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">
                Business Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => handleChange("category", v)}
                required
              >
                <SelectTrigger id="category" data-ocid="vendor_register.select">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food_beverage">Food & Beverage</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="arts_crafts">Arts & Crafts</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                data-ocid="vendor_register.textarea"
                placeholder="Tell us about your business, products, and what you plan to exhibit..."
                rows={4}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tradeLicense">
                Trade License Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tradeLicense"
                data-ocid="vendor_register.input"
                placeholder="TL-2024-XXXXXX"
                value={form.tradeLicense}
                onChange={(e) => handleChange("tradeLicense", e.target.value)}
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                data-ocid="vendor_register.submit_button"
                className="min-w-36"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

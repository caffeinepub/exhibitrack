import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, IdCard, ScrollText, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

type DocStatus = "Pending" | "Verified" | "Rejected";

interface DocCard {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  filename: string | null;
  status: DocStatus;
}

const statusStyle: Record<DocStatus, string> = {
  Verified:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Rejected: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function UserDocuments() {
  const [docs, setDocs] = useState<DocCard[]>([
    {
      id: "id-proof",
      label: "ID Proof",
      description: "Government-issued ID (Passport, Driver's License, Aadhaar)",
      icon: IdCard,
      filename: null,
      status: "Pending",
    },
    {
      id: "business-license",
      label: "Business License",
      description: "Valid business registration or trade license",
      icon: ScrollText,
      filename: "business_license_2024.pdf",
      status: "Verified",
    },
    {
      id: "certificate",
      label: "Certificate",
      description: "Any relevant certification (ISO, FSSAI, etc.)",
      icon: FileText,
      filename: null,
      status: "Pending",
    },
  ]);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleUpload(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocs((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, filename: file.name, status: "Pending" }
          : doc,
      ),
    );
  }

  return (
    <div className="space-y-6" data-ocid="user_documents.page">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-base font-semibold">Document Verification</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Upload required documents for admin review
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-teal/30 text-teal bg-teal-dim"
        >
          {docs.filter((d) => d.status === "Verified").length} / {docs.length}{" "}
          Verified
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {docs.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border shadow-card flex flex-col"
            data-ocid={`user_documents.item.${i + 1}`}
          >
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-dim border border-teal/30 flex items-center justify-center">
                  <doc.icon className="w-5 h-5 text-teal" />
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold border ${statusStyle[doc.status]}`}
                >
                  {doc.status}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold mb-1">{doc.label}</h3>
              <p className="text-xs text-muted-foreground">{doc.description}</p>

              {doc.filename && (
                <div className="mt-3 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                  <FileText className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                  <span className="text-xs text-foreground truncate">
                    {doc.filename}
                  </span>
                </div>
              )}
            </div>

            <div className="px-5 pb-5">
              <input
                ref={(el) => {
                  inputRefs.current[doc.id] = el;
                }}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleUpload(doc.id, e)}
              />
              <Button
                variant="outline"
                className="w-full text-xs gap-1.5 hover:border-teal/40 hover:bg-teal-dim hover:text-teal"
                onClick={() => inputRefs.current[doc.id]?.click()}
                data-ocid={`user_documents.upload_button.${i + 1}`}
              >
                <Upload className="w-3.5 h-3.5" />
                {doc.filename ? "Replace" : "Upload"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card rounded-xl border border-teal/20 shadow-card p-5"
      >
        <h3 className="text-sm font-semibold text-teal mb-2">
          Document Requirements
        </h3>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>Accepted formats: PDF, JPG, PNG (max 5MB)</li>
          <li>Documents must be clear, legible, and not expired</li>
          <li>Verification typically takes 1–2 business days</li>
          <li>You'll be notified once all documents are verified</li>
        </ul>
      </motion.div>
    </div>
  );
}

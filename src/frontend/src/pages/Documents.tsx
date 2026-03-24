import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type DocStatus,
  type DocType,
  type VendorDocument,
  initialDocuments,
} from "@/data/mockData";
import {
  CheckCircle,
  Clock,
  FileCheck,
  FileText,
  FileX,
  Plus,
  Search,
  Upload,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const statusBadge: Record<DocStatus, string> = {
  Pending: "bg-status-pending/20 text-status-pending border-status-pending/30",
  Verified:
    "bg-status-verified/20 text-status-verified border-status-verified/30",
  Rejected:
    "bg-status-rejected/20 text-status-rejected border-status-rejected/30",
};

const statusIcon: Record<DocStatus, typeof CheckCircle> = {
  Verified: CheckCircle,
  Pending: Clock,
  Rejected: XCircle,
};

const DOC_TYPES: DocType[] = [
  "Trade License",
  "ID Proof",
  "Health & Safety Cert",
  "Insurance",
];

const statCards = [
  {
    key: "total",
    label: "Total Documents",
    icon: FileText,
    color: "text-foreground",
  },
  {
    key: "verified",
    label: "Verified",
    icon: FileCheck,
    color: "text-status-verified",
  },
  {
    key: "pending",
    label: "Pending Review",
    icon: Clock,
    color: "text-status-pending",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: FileX,
    color: "text-status-rejected",
  },
];

export default function Documents() {
  const [docs, setDocs] = useState<VendorDocument[]>(initialDocuments);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    vendorName: "",
    docType: "" as DocType | "",
    fileName: "",
  });

  function verify(id: string) {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Verified" as DocStatus } : d,
      ),
    );
  }

  function reject(id: string) {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Rejected" as DocStatus } : d,
      ),
    );
  }

  function handleUpload() {
    if (!form.vendorName || !form.docType || !form.fileName) return;
    const newDoc: VendorDocument = {
      id: `D${String(docs.length + 1).padStart(3, "0")}`,
      vendorId: `V${String(docs.length + 1).padStart(3, "0")}`,
      vendorName: form.vendorName,
      docType: form.docType as DocType,
      fileName: form.fileName,
      uploadedAt: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    setDocs((prev) => [...prev, newDoc]);
    setForm({ vendorName: "", docType: "", fileName: "" });
    setOpen(false);
  }

  const filtered = docs.filter(
    (d) =>
      d.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      d.docType.toLowerCase().includes(search.toLowerCase()),
  );

  const counts = {
    total: docs.length,
    verified: docs.filter((d) => d.status === "Verified").length,
    pending: docs.filter((d) => d.status === "Pending").length,
    rejected: docs.filter((d) => d.status === "Rejected").length,
  };

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card rounded-xl border border-border p-4 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {s.label}
                </span>
                <Icon size={15} className={s.color} />
              </div>
              <div className={`text-3xl font-bold ${s.color}`}>
                {counts[s.key as keyof typeof counts]}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Table card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border shadow-card"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-4">
          <h2 className="text-sm font-semibold flex-1">Document Registry</h2>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search vendor or doc type…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 w-60 text-sm"
              data-ocid="documents.search_input"
            />
          </div>
          <Button
            size="sm"
            className="bg-teal text-background hover:bg-teal-bright"
            onClick={() => setOpen(true)}
            data-ocid="documents.upload.open_modal_button"
          >
            <Plus size={14} className="mr-1" /> Upload Document
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs">
                Vendor
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Doc Type
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                File Name
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Uploaded
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((d, idx) => {
              const Icon = statusIcon[d.status];
              return (
                <TableRow
                  key={d.id}
                  className="border-border hover:bg-secondary/30 transition-colors"
                  data-ocid={`documents.item.${idx + 1}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-dim border border-teal/20 flex items-center justify-center text-teal text-xs font-bold flex-shrink-0">
                        {d.vendorName[0]}
                      </div>
                      <span className="text-sm font-medium">
                        {d.vendorName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-secondary border border-border font-medium">
                      {d.docType}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono max-w-[180px] truncate">
                    {d.fileName}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {d.uploadedAt}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadge[d.status]}`}
                    >
                      <Icon size={10} />
                      {d.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {d.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-status-verified/20 text-status-verified hover:bg-status-verified/30 border border-status-verified/30"
                          variant="outline"
                          onClick={() => verify(d.id)}
                          data-ocid={`documents.verify.button.${idx + 1}`}
                        >
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-status-rejected/20 text-status-rejected hover:bg-status-rejected/30 border border-status-rejected/30"
                          variant="outline"
                          onClick={() => reject(d.id)}
                          data-ocid={`documents.reject.button.${idx + 1}`}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {d.status !== "Pending" && (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground text-sm"
                  data-ocid="documents.empty_state"
                >
                  No documents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Upload modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" data-ocid="documents.upload.dialog">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="vendorName">Vendor Name *</Label>
              <Input
                id="vendorName"
                value={form.vendorName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, vendorName: e.target.value }))
                }
                placeholder="e.g. Akshay Designs Co."
                data-ocid="documents.vendor_name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Document Type *</Label>
              <Select
                value={form.docType}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, docType: v as DocType }))
                }
              >
                <SelectTrigger data-ocid="documents.doc_type.select">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fileName">File Name *</Label>
              <Input
                id="fileName"
                value={form.fileName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fileName: e.target.value }))
                }
                placeholder="e.g. trade_license_2024.pdf"
                data-ocid="documents.file_name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Upload File</Label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-teal/50 transition-colors"
                data-ocid="documents.upload.dropzone"
              >
                <Upload
                  size={20}
                  className="mx-auto text-muted-foreground mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  Click or drag to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG up to 10MB
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="documents.upload.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-teal text-background hover:bg-teal-bright"
              onClick={handleUpload}
              data-ocid="documents.upload.submit_button"
            >
              Upload Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

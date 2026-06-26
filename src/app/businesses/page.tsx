"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Globe,
  Phone,
  MapPin,
  Tag,
  TrendingUp,
  Star,
  ExternalLink,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/tables/DataTable";
import { mockBusinesses } from "@/data/mockBusinesses";
import { Business, GmbStatus } from "@/lib/types";
import { cn, scoreToColor, scoreToLabel } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
const addBusinessSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  domain: z.string().min(3, "Domain is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  phone: z.string().min(7, "Phone number is required"),
  category: z.string().min(2, "Category is required"),
});
type AddBusinessForm = z.infer<typeof addBusinessSchema>;

// ─── Status Config ─────────────────────────────────────────────────────────────
const statusConfig: Record<GmbStatus, { label: string; icon: typeof CheckCircle2; color: string }> = {
  connected: { label: "Connected", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  disconnected: { label: "Disconnected", icon: XCircle, color: "text-error bg-error-container" },
  pending: { label: "Pending", icon: Clock, color: "text-amber-500 bg-amber-50" },
};

// ─── Add Business Modal ────────────────────────────────────────────────────────
let bizIdCounter = 0;
const getUniqueBizId = () => `biz-${Date.now()}-${++bizIdCounter}`;

function AddBusinessModal({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (b: Business) => void;
}) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddBusinessForm>({
    resolver: zodResolver(addBusinessSchema),
  });

  const inputClass =
    "w-full px-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
  const labelClass = "block text-sm font-semibold text-on-surface mb-1.5";
  const errorClass = "text-xs text-error mt-1";

  const onSubmit = useCallback(async (data: AddBusinessForm) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    const newBusiness: Business = {
      id: getUniqueBizId(),
      ...data,
      gmbStatus: "pending",
      seoScore: 0,
      reviewCount: 0,
      avgRating: 0,
      createdAt: new Date().toISOString(),
    };
    onAdd(newBusiness);
    setSaving(false);
    reset();
    onClose();
  }, [onAdd, reset, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary/10 rounded-xl">
              <Plus className="w-5 h-5 text-primary" />
            </span>
            <div>
              <h3 className="font-bold text-on-surface text-lg">Add New Business</h3>
              <p className="text-xs text-on-surface-variant">Connect a Google Business Profile location</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Business Name</label>
              <input {...register("name")} className={inputClass} placeholder="e.g. Rivera's Plumbing" />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Website Domain</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register("domain")}
                  className={cn(inputClass, "pl-9")}
                  placeholder="example.com"
                />
              </div>
              {errors.domain && <p className={errorClass}>{errors.domain.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register("phone")}
                  className={cn(inputClass, "pl-9")}
                  placeholder="(312) 555-0000"
                />
              </div>
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register("category")}
                  className={cn(inputClass, "pl-9")}
                  placeholder="e.g. Plumber"
                />
              </div>
              {errors.category && <p className={errorClass}>{errors.category.message}</p>}
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Street Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register("address")}
                  className={cn(inputClass, "pl-9")}
                  placeholder="1204 N Milwaukee Ave"
                />
              </div>
              {errors.address && <p className={errorClass}>{errors.address.message}</p>}
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input {...register("city")} className={inputClass} placeholder="Chicago" />
              {errors.city && <p className={errorClass}>{errors.city.message}</p>}
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input {...register("state")} className={inputClass} placeholder="IL" />
              {errors.state && <p className={errorClass}>{errors.state.message}</p>}
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-4 text-xs text-on-surface-variant border border-primary/10">
            <p className="font-semibold text-primary mb-1">Next Steps After Adding</p>
            <p>You&apos;ll be prompted to connect your Google Business Profile via OAuth to complete the setup.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all",
                saving ? "bg-primary/60 cursor-not-allowed" : "bg-primary hover:opacity-90 active:scale-95 shadow-lg"
              )}
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Business
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Manage Business Slide-Over ───────────────────────────────────────────────
export function ManageSlideOver({ business, onClose, onRemove }: {
  business: Business | null;
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  const router = useRouter();
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnected, setReconnected] = useState(false);

  if (!business) return null;

  const { label, icon: StatusIcon, color } = statusConfig[business.gmbStatus];

  const handleReconnect = async () => {
    setReconnecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setReconnecting(false);
    setReconnected(true);
    setTimeout(() => setReconnected(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-outline-variant">
          <div>
            <h3 className="font-bold text-on-surface text-lg">{business.name}</h3>
            <a
              href={`https://${business.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary hover:underline flex items-center gap-1 mt-0.5"
            >
              {business.domain}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status */}
          <div className="bg-surface-container-low rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">GMB Connection</p>
            <div className="flex items-center justify-between">
              <span className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold", color)}>
                <StatusIcon className="w-3.5 h-3.5" />
                {label}
              </span>
              <button
                onClick={handleReconnect}
                disabled={reconnecting}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  reconnected
                    ? "bg-emerald-500 text-white"
                    : "bg-primary text-white hover:opacity-90 active:scale-95"
                )}
              >
                {reconnecting ? (
                  <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Reconnecting...</>
                ) : reconnected ? (
                  <><CheckCircle2 className="w-3.5 h-3.5" /> Connected!</>
                ) : (
                  <><RefreshCw className="w-3.5 h-3.5" /> Reconnect GMB</>
                )}
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Business Details</p>
            {[
              { icon: MapPin, label: "Address", value: `${business.address}, ${business.city}, ${business.state}` },
              { icon: Phone, label: "Phone", value: business.phone },
              { icon: Tag, label: "Category", value: business.category },
              { icon: Globe, label: "Domain", value: business.domain },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 py-2.5 border-b border-outline-variant last:border-0">
                <Icon className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-on-surface-variant">{label}</p>
                  <p className="text-sm font-semibold text-on-surface truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Performance</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container-low rounded-xl p-3 text-center">
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className={cn("text-xl font-bold", scoreToColor(business.seoScore))}>{business.seoScore}</p>
                <p className="text-xs text-on-surface-variant">SEO Score</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 text-center">
                <Star className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                <p className="text-xl font-bold text-amber-500">{business.avgRating || "—"}</p>
                <p className="text-xs text-on-surface-variant">Avg Rating</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 text-center">
                <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <p className="text-xl font-bold text-on-surface">{business.reviewCount}</p>
                <p className="text-xs text-on-surface-variant">Reviews</p>
              </div>
            </div>
          </div>

          {/* Score Label */}
          {business.seoScore > 0 && (
            <div className="bg-surface-container-low rounded-xl p-4">
              <p className="text-xs text-on-surface-variant mb-1">SEO Health</p>
              <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    business.seoScore >= 80 ? "bg-emerald-500" : business.seoScore >= 60 ? "bg-amber-400" : "bg-error"
                  )}
                  style={{ width: `${business.seoScore}%` }}
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-1">{scoreToLabel(business.seoScore)}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline-variant space-y-2">
          <button
              onClick={() => { router.push("/website-analyzer"); onClose(); }}
              className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
            >
              View Full Report
            </button>
          <button
              onClick={() => onClose()}
              className="w-full py-2.5 border border-outline-variant text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Edit Business Info
            </button>
          <button
            onClick={() => {
              onRemove(business.id);
              onClose();
            }}
            className="w-full py-2.5 flex items-center justify-center gap-2 border border-error/30 text-error rounded-xl text-sm font-semibold hover:bg-error-container transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove Business
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [manageBusiness, setManageBusiness] = useState<Business | null>(null);

  const columns: ColumnDef<Business, unknown>[] = [
    {
      accessorKey: "name",
      header: "Business",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-on-surface">{row.original.name}</p>
          <p className="text-xs text-on-surface-variant">{row.original.domain}</p>
        </div>
      ),
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-on-surface">
          {row.original.city}, {row.original.state}
        </span>
      ),
    },
    {
      accessorKey: "gmbStatus",
      header: "GMB Status",
      cell: ({ getValue }) => {
        const status = getValue() as GmbStatus;
        const { label, icon: Icon, color } = statusConfig[status];
        return (
          <span className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit text-xs font-bold", color)}>
            <Icon className="w-3.5 h-3.5" />
            {label}
          </span>
        );
      },
    },
    {
      accessorKey: "seoScore",
      header: "SEO Score",
      cell: ({ getValue }) => {
        const score = getValue() as number;
        return score > 0 ? (
          <div className="flex items-center gap-2">
            <span className={cn("font-bold", scoreToColor(score))}>{score}</span>
            <span className="text-xs text-on-surface-variant">{scoreToLabel(score)}</span>
          </div>
        ) : (
          <span className="text-xs text-on-surface-variant italic">Not scanned</span>
        );
      },
    },
    {
      accessorKey: "avgRating",
      header: "Avg Rating",
      cell: ({ getValue, row }) => {
        const val = getValue() as number;
        return val > 0 ? (
          <div>
            <span className="font-semibold text-on-surface">⭐ {val}</span>
            <span className="text-xs text-on-surface-variant ml-1">
              ({row.original.reviewCount})
            </span>
          </div>
        ) : (
          <span className="text-xs text-on-surface-variant italic">No reviews</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => setManageBusiness(row.original)}
          className="text-secondary text-sm font-semibold hover:underline"
        >
          Manage →
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Businesses</h2>
          <p className="text-on-surface-variant mt-1">
            Manage all your connected Google Business Profile locations.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Business
        </button>
      </div>

      <DataTable
        data={businesses}
        columns={columns}
        searchPlaceholder="Search businesses..."
      />

      <AddBusinessModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(b) => setBusinesses((prev) => [...prev, b])}
      />

      <ManageSlideOver
        business={manageBusiness}
        onClose={() => setManageBusiness(null)}
        onRemove={(id) => setBusinesses((prev) => prev.filter((b) => b.id !== id))}
      />
    </div>
  );
}

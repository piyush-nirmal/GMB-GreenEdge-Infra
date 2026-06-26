"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Globe, Phone, MapPin, Tag, X, RefreshCw } from "lucide-react";
import { Business } from "@/lib/types";
import { cn } from "@/lib/utils";

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

let idCounter = 0;
const getUniqueBizId = () => `biz-${Date.now()}-${++idCounter}`;

export function AddBusinessModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (b: Business) => void;
}) {
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBusinessForm>({ resolver: zodResolver(addBusinessSchema) });

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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in overflow-hidden">
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
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant">
            <X className="w-5 h-5" />
          </button>
        </div>

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
                <input {...register("domain")} className={cn(inputClass, "pl-9")} placeholder="example.com" />
              </div>
              {errors.domain && <p className={errorClass}>{errors.domain.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input {...register("phone")} className={cn(inputClass, "pl-9")} placeholder="(312) 555-0000" />
              </div>
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input {...register("category")} className={cn(inputClass, "pl-9")} placeholder="e.g. Plumber" />
              </div>
              {errors.category && <p className={errorClass}>{errors.category.message}</p>}
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Street Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input {...register("address")} className={cn(inputClass, "pl-9")} placeholder="1204 N Milwaukee Ave" />
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
                <><RefreshCw className="w-4 h-4 animate-spin" /> Adding...</>
              ) : (
                <><Plus className="w-4 h-4" /> Add Business</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

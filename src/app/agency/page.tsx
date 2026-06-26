"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus, MapPin, Globe, TrendingUp, Star, Search } from "lucide-react";
import { mockBusinesses } from "@/data/mockBusinesses";
import { cn, scoreToColor } from "@/lib/utils";
import { AddBusinessModal } from "@/components/businesses/AddBusinessModal";
import { Business } from "@/lib/types";

export default function AgencyPage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

  const totalSeoAvg = Math.round(
    businesses.reduce((s, b) => s + b.seoScore, 0) / businesses.length
  );

  const filtered = businesses.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Agency Dashboard</h2>
          <p className="text-on-surface-variant mt-1">
            Manage multiple client locations from one central hub.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="pl-9 pr-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 w-52"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Locations", value: businesses.length, icon: Building2, color: "text-primary bg-primary/10" },
          { label: "Avg SEO Score", value: totalSeoAvg, icon: TrendingUp, color: "text-secondary bg-secondary/10" },
          { label: "Total Reviews", value: businesses.reduce((s, b) => s + b.reviewCount, 0), icon: Star, color: "text-amber-500 bg-amber-50" },
          { label: "Connected GMB", value: businesses.filter((b) => b.gmbStatus === "connected").length, icon: Globe, color: "text-emerald-600 bg-emerald-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-outline-variant p-5 flex items-center gap-4 animate-fade-in">
            <span className={cn("p-3 rounded-xl", color)}>
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-on-surface">{value}</p>
              <p className="text-sm text-on-surface-variant">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Client Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant p-12 text-center text-on-surface-variant">
          <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No clients match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((business) => (
            <div key={business.id} className="bg-white rounded-xl border border-outline-variant p-6 animate-fade-in hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-on-surface">{business.name}</h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {business.address}, {business.city}, {business.state}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase",
                    business.gmbStatus === "connected"
                      ? "bg-emerald-50 text-emerald-700"
                      : business.gmbStatus === "pending"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-error-container text-on-error-container"
                  )}
                >
                  {business.gmbStatus}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2.5 bg-surface-container-low rounded-lg">
                  <p className={cn("text-lg font-bold", scoreToColor(business.seoScore))}>
                    {business.seoScore}
                  </p>
                  <p className="text-xs text-on-surface-variant">SEO Score</p>
                </div>
                <div className="text-center p-2.5 bg-surface-container-low rounded-lg">
                  <p className="text-lg font-bold text-amber-500">⭐ {business.avgRating}</p>
                  <p className="text-xs text-on-surface-variant">Rating</p>
                </div>
                <div className="text-center p-2.5 bg-surface-container-low rounded-lg">
                  <p className="text-lg font-bold text-on-surface">{business.reviewCount}</p>
                  <p className="text-xs text-on-surface-variant">Reviews</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/businesses")}
                  className="flex-1 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Manage
                </button>
                <button
                  onClick={() => router.push("/website-analyzer")}
                  className="flex-1 py-2 border border-outline-variant text-on-surface-variant text-sm font-semibold rounded-xl hover:bg-surface-container transition-colors"
                >
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddBusinessModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(b: Business) => setBusinesses((prev) => [...prev, b])}
      />
    </div>
  );
}

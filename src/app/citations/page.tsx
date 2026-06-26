"use client";

import { useState } from "react";
import { BookMarked, Plus, CheckCircle2, AlertCircle, ExternalLink, RefreshCw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Citation {
  id: string;
  directory: string;
  url: string;
  status: "consistent" | "inconsistent" | "missing";
  businessName?: string;
  phone?: string;
  address?: string;
}

const mockCitations: Citation[] = [
  { id: "1", directory: "Google Business Profile", url: "g.co/business", status: "consistent", businessName: "Rivera's Plumbing", phone: "(312) 555-0192", address: "1204 N Milwaukee Ave, Chicago" },
  { id: "2", directory: "Yelp", url: "yelp.com", status: "consistent", businessName: "Rivera's Plumbing", phone: "(312) 555-0192", address: "1204 N Milwaukee Ave, Chicago" },
  { id: "3", directory: "Apple Maps", url: "maps.apple.com", status: "inconsistent", businessName: "Riveras Plumbing", phone: "(312) 555-0192", address: "1204 Milwaukee Ave, Chicago, IL" },
  { id: "4", directory: "Bing Places", url: "bingplaces.com", status: "missing", businessName: "", phone: "", address: "" },
  { id: "5", directory: "Yellow Pages", url: "yellowpages.com", status: "inconsistent", businessName: "Rivera's Plumbing Co", phone: "(312) 555-019", address: "1204 N Milwaukee Ave" },
  { id: "6", directory: "Foursquare", url: "foursquare.com", status: "missing", businessName: "", phone: "", address: "" },
  { id: "7", directory: "BBB", url: "bbb.org", status: "consistent", businessName: "Rivera's Plumbing", phone: "(312) 555-0192", address: "1204 N Milwaukee Ave, Chicago, IL" },
  { id: "8", directory: "Angi", url: "angi.com", status: "inconsistent", businessName: "Rivera's Plumbing", phone: "(312) 555-0193", address: "1204 N Milwaukee Ave, Chicago" },
];

const statusConfig = {
  consistent: { color: "bg-emerald-50 text-emerald-700", icon: CheckCircle2, iconColor: "text-emerald-500" },
  inconsistent: { color: "bg-amber-50 text-amber-700", icon: AlertCircle, iconColor: "text-amber-500" },
  missing: { color: "bg-error-container text-on-error-container", icon: AlertCircle, iconColor: "text-error" },
};

export default function CitationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "consistent" | "inconsistent" | "missing">("all");

  const filtered = mockCitations.filter((c) => {
    const matchSearch = c.directory.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Citation Manager</h2>
          <p className="text-on-surface-variant mt-1">
            Monitor and fix NAP consistency across directories.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg">
          <Plus className="w-4 h-4" /> Add Citation
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Directories", value: mockCitations.length, color: "text-primary" },
          { label: "Consistent", value: mockCitations.filter((c) => c.status === "consistent").length, color: "text-emerald-600" },
          { label: "Inconsistent", value: mockCitations.filter((c) => c.status === "inconsistent").length, color: "text-amber-500" },
          { label: "Missing", value: mockCitations.filter((c) => c.status === "missing").length, color: "text-error" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-outline-variant p-4 text-center">
            <p className={cn("text-2xl font-bold", color)}>{value}</p>
            <p className="text-xs text-on-surface-variant mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* NAP Reference */}
      <div className="bg-primary/5 border border-primary/15 rounded-xl p-5">
        <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <BookMarked className="w-4 h-4" />
          Master NAP (Name · Address · Phone)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div><span className="font-semibold text-on-surface-variant">Name: </span><span className="text-on-surface font-bold">Rivera&apos;s Plumbing</span></div>
          <div><span className="font-semibold text-on-surface-variant">Address: </span><span className="text-on-surface font-bold">1204 N Milwaukee Ave, Chicago, IL</span></div>
          <div><span className="font-semibold text-on-surface-variant">Phone: </span><span className="text-on-surface font-bold">(312) 555-0192</span></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 pr-3 py-2 border border-outline-variant rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 w-48" placeholder="Search directories..." />
        </div>
        {(["all", "consistent", "inconsistent", "missing"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold border transition-colors capitalize",
            filter === f ? "bg-primary text-white border-primary" : "bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container"
          )}>{f === "all" ? "All" : f}</button>
        ))}
      </div>

      {/* Citation List */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
        <div className="divide-y divide-outline-variant">
          {filtered.map((c) => {
            const cfg = statusConfig[c.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={c.id} className="flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors">
                <StatusIcon className={cn("w-5 h-5 shrink-0", cfg.iconColor)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-on-surface text-sm">{c.directory}</p>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold capitalize", cfg.color)}>{c.status}</span>
                  </div>
                  {c.status !== "missing" && (
                    <p className="text-xs text-on-surface-variant mt-0.5 truncate">
                      {c.businessName} · {c.phone} · {c.address}
                    </p>
                  )}
                  {c.status === "missing" && (
                    <p className="text-xs text-error mt-0.5">Not listed in this directory</p>
                  )}
                </div>
                <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-secondary hover:underline shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" /> Visit
                </a>
                {c.status !== "consistent" && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity active:scale-95 shrink-0">
                    <RefreshCw className="w-3 h-3" /> {c.status === "missing" ? "Add Listing" : "Fix Now"}
                  </button>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="p-12 text-center text-on-surface-variant">
              <p className="font-semibold">No citations match your filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

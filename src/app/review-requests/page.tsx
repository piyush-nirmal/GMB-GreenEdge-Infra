"use client";

import { useState } from "react";
import { Send, Plus, Mail, MessageCircle, Smartphone, X, CheckCircle2, RefreshCw, Trash2 } from "lucide-react";
import { mockBusinesses } from "@/data/mockBusinesses";
import { cn } from "@/lib/utils";

type Channel = "email" | "sms" | "whatsapp";

interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  businessName: string;
  status: "active" | "paused" | "completed";
  sentCount: number;
  reviewsGenerated: number;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  { id: "1", name: "Post-Visit Email Follow-up", channel: "email", businessName: "Rivera's Plumbing", status: "active", sentCount: 142, reviewsGenerated: 28, createdAt: "2024-05-01" },
  { id: "2", name: "WhatsApp Review Blast", channel: "whatsapp", businessName: "Windy City Drainage", status: "active", sentCount: 67, reviewsGenerated: 19, createdAt: "2024-05-15" },
  { id: "3", name: "SMS Satisfaction Check", channel: "sms", businessName: "GreenEdge Landscaping", status: "paused", sentCount: 34, reviewsGenerated: 5, createdAt: "2024-04-10" },
];

const channelConfig: Record<Channel, { icon: typeof Mail; color: string; label: string }> = {
  email: { icon: Mail, color: "bg-primary/10 text-primary", label: "Email" },
  sms: { icon: Smartphone, color: "bg-amber-50 text-amber-600", label: "SMS" },
  whatsapp: { icon: MessageCircle, color: "bg-emerald-50 text-emerald-700", label: "WhatsApp" },
};

export default function ReviewRequestsPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", channel: "email" as Channel, business: mockBusinesses[0].name });
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setCampaigns((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: form.name || "New Campaign",
        channel: form.channel,
        businessName: form.business,
        status: "active",
        sentCount: 0,
        reviewsGenerated: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ]);
    setSaving(false);
    setShowCreate(false);
    setForm({ name: "", channel: "email", business: mockBusinesses[0].name });
  };

  const toggleStatus = (id: string) =>
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c))
    );

  const deleteCampaign = (id: string) => setCampaigns((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Review Requests</h2>
          <p className="text-on-surface-variant mt-1">
            Automate review request campaigns via Email, SMS, and WhatsApp.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: campaigns.filter((c) => c.status === "active").length, color: "text-primary" },
          { label: "Total Sent", value: campaigns.reduce((s, c) => s + c.sentCount, 0), color: "text-secondary" },
          { label: "Reviews Generated", value: campaigns.reduce((s, c) => s + c.reviewsGenerated, 0), color: "text-emerald-600" },
          { label: "Avg Conversion", value: `${Math.round((campaigns.reduce((s, c) => s + c.reviewsGenerated, 0) / Math.max(1, campaigns.reduce((s, c) => s + c.sentCount, 0))) * 100)}%`, color: "text-amber-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-outline-variant p-4 text-center">
            <p className={cn("text-2xl font-bold", color)}>{value}</p>
            <p className="text-xs text-on-surface-variant mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Campaigns */}
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const ch = channelConfig[campaign.channel];
          const ChIcon = ch.icon;
          const convRate = campaign.sentCount > 0 ? ((campaign.reviewsGenerated / campaign.sentCount) * 100).toFixed(1) : "0.0";
          return (
            <div key={campaign.id} className="bg-white rounded-xl border border-outline-variant p-6 flex flex-wrap items-center gap-4 hover:shadow-md transition-shadow animate-fade-in">
              <span className={cn("p-2.5 rounded-xl shrink-0", ch.color)}>
                <ChIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-on-surface">{campaign.name}</h3>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", ch.color)}>{ch.label}</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold",
                    campaign.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  )}>{campaign.status}</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">{campaign.businessName}</p>
              </div>
              <div className="flex items-center gap-6 text-sm shrink-0">
                <div className="text-center">
                  <p className="font-bold text-on-surface">{campaign.sentCount}</p>
                  <p className="text-xs text-on-surface-variant">Sent</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-emerald-600">{campaign.reviewsGenerated}</p>
                  <p className="text-xs text-on-surface-variant">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-amber-500">{convRate}%</p>
                  <p className="text-xs text-on-surface-variant">Conv. Rate</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleStatus(campaign.id)} className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors",
                  campaign.status === "active" ? "border-amber-400 text-amber-600 hover:bg-amber-50" : "border-emerald-400 text-emerald-600 hover:bg-emerald-50"
                )}>
                  {campaign.status === "active" ? "Pause" : "Resume"}
                </button>
                <button onClick={() => deleteCampaign(campaign.id)} className="p-1.5 rounded-xl border border-outline-variant text-on-surface-variant hover:text-error hover:bg-error-container transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-primary/10 rounded-xl"><Send className="w-5 h-5 text-primary" /></span>
                <h3 className="font-bold text-on-surface text-lg">Create Campaign</h3>
              </div>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Campaign Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. Post-Visit Follow-up" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Channel</label>
                <select value={form.channel} onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value as Channel }))} className="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Business</label>
                <select value={form.business} onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))} className="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {mockBusinesses.map((b) => <option key={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">Cancel</button>
                <button onClick={handleCreate} disabled={saving} className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all", saving ? "bg-primary/50" : "bg-primary hover:opacity-90 active:scale-95 shadow-lg")}>
                  {saving ? <><RefreshCw className="w-4 h-4 animate-spin" /> Creating...</> : <><CheckCircle2 className="w-4 h-4" /> Create Campaign</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

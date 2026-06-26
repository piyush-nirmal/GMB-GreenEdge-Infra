import type { Metadata } from "next";
import { FileBarChart2, Download, Eye, Building2, TrendingUp, Star, Globe } from "lucide-react";
import { mockBusinesses } from "@/data/mockBusinesses";
import { mockAnalytics } from "@/data/mockAnalytics";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Reports" };

const reportTemplates = [
  { id: "seo", label: "SEO Performance Report", description: "Comprehensive SEO score, issues, and recommendations.", badge: "Popular", badgeColor: "bg-primary/10 text-primary" },
  { id: "reviews", label: "Review Summary Report", description: "Review counts, sentiment, average rating, and reply rate.", badge: "New", badgeColor: "bg-emerald-50 text-emerald-700" },
  { id: "competitor", label: "Competitor Analysis Report", description: "Benchmarking against local competitors with keyword gaps.", badge: null, badgeColor: "" },
  { id: "analytics", label: "Traffic & Clicks Report", description: "Monthly organic traffic, impressions, and CTR breakdown.", badge: null, badgeColor: "" },
];

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Reports</h2>
          <p className="text-on-surface-variant mt-1">
            Generate white-label reports for your clients.
          </p>
        </div>
      </div>

      {/* Report Templates */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-outline-variant p-6 hover:shadow-md transition-shadow animate-fade-in">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-primary/10 rounded-xl">
                    <FileBarChart2 className="w-5 h-5 text-primary" />
                  </span>
                  <h4 className="font-semibold text-on-surface">{t.label}</h4>
                </div>
                {t.badge && (
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0", t.badgeColor)}>{t.badge}</span>
                )}
              </div>
              <p className="text-sm text-on-surface-variant mb-4">{t.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95">
                  <Download className="w-3.5 h-3.5" /> Generate PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-outline-variant text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-surface-container transition-colors">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Report Preview */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface">Client Report Preview</h3>
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
          {/* Report Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm font-semibold uppercase tracking-wide mb-1">Monthly Report</p>
                <h2 className="text-3xl font-black">{mockBusinesses[0].name}</h2>
                <p className="text-white/70 mt-1">{mockBusinesses[0].address}, {mockBusinesses[0].city}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Prepared by</p>
                <p className="font-bold">GMB SEO Autopilot</p>
                <p className="text-white/60 text-sm mt-1">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-outline-variant">
            {[
              { label: "SEO Score", value: mockBusinesses[0].seoScore, icon: TrendingUp, color: "text-primary" },
              { label: "Avg Rating", value: `⭐ ${mockBusinesses[0].avgRating}`, icon: Star, color: "text-amber-500" },
              { label: "Reviews", value: mockBusinesses[0].reviewCount, icon: Globe, color: "text-secondary" },
              { label: "Monthly Traffic", value: mockAnalytics.totalTraffic.toLocaleString(), icon: Building2, color: "text-emerald-600" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center p-4 bg-surface-container-low rounded-xl">
                <Icon className={cn("w-5 h-5 mx-auto mb-2", color)} />
                <p className={cn("text-2xl font-black", color)}>{value}</p>
                <p className="text-xs text-on-surface-variant mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="p-6 text-center text-on-surface-variant">
            <p className="text-sm">Full report includes SEO analysis, competitor comparison, review insights, and action plan.</p>
            <button className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95 shadow-lg">
              <Download className="w-4 h-4" /> Download Full Report (PDF)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { RefreshCw, SearchCheck, Smartphone, FileText, MapPin, ChevronDown, Globe, CheckCircle2 } from "lucide-react";
import { SeoGauge } from "@/components/charts/SeoGauge";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChecklistTabs } from "@/components/seo/ChecklistTabs";
import { mockSeoScore } from "@/data/mockSeoScore";
import { mockCompetitors } from "@/data/mockCompetitors";
import { mockBusinesses } from "@/data/mockBusinesses";
import { SeoScore } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Per-domain mock SEO data (different scores per business) ─────────────────
const seoDataByBusinessId: Record<string, SeoScore> = {
  "biz-001": mockSeoScore, // Rivera's Plumbing — score 82
  "biz-002": {
    ...mockSeoScore,
    id: "seo-002",
    businessId: "biz-002",
    overallScore: 67,
    indexability: 78,
    mobilePassed: true,
    lcpSeconds: 2.6,
    clsScore: 0.12,
    onPageScore: 61,
    localCitations: 84,
    inconsistentNapCount: 21,
    issues: [
      {
        id: "i2-001", title: "Missing title tags on 5 pages",
        description: "Pages without title tags won't rank well. Add unique, keyword-rich titles.",
        severity: "critical", category: "on-page", actionLabel: "Fix Now",
      },
      {
        id: "i2-002", title: "Slow LCP (2.6s)",
        description: "Largest Contentful Paint exceeds 2.5s threshold. Optimize hero images.",
        severity: "high", category: "performance", actionLabel: "Optimize",
      },
      {
        id: "i2-003", title: "GMB address inconsistency",
        description: "Address on website does not match GMB listing — impacts local pack ranking.",
        severity: "critical", category: "local-seo", actionLabel: "Sync NAP",
      },
      {
        id: "i2-004", title: "No schema markup",
        description: "LocalBusiness schema is missing from all pages.",
        severity: "recommended", category: "local-seo", actionLabel: "Add Schema",
      },
      {
        id: "i2-005", title: "Mobile Core Web Vitals passing",
        description: "LCP: 2.6s, CLS: 0.12 — CLS is within threshold.",
        severity: "passed", category: "mobile", actionLabel: "View",
      },
    ],
  },
  "biz-003": {
    ...mockSeoScore,
    id: "seo-003",
    businessId: "biz-003",
    overallScore: 54,
    indexability: 62,
    mobilePassed: false,
    lcpSeconds: 3.4,
    clsScore: 0.31,
    onPageScore: 48,
    localCitations: 42,
    inconsistentNapCount: 35,
    issues: [
      {
        id: "i3-001", title: "Website not indexed by Google",
        description: "Noindex tag found on homepage. Remove it to allow Google to crawl your site.",
        severity: "critical", category: "indexability", actionLabel: "Fix Now",
      },
      {
        id: "i3-002", title: "CLS score failing (0.31)",
        description: "High Cumulative Layout Shift causes poor mobile experience.",
        severity: "critical", category: "mobile", actionLabel: "Fix Layouts",
      },
      {
        id: "i3-003", title: "Very slow LCP (3.4s)",
        description: "Page load is significantly above threshold. Images are unoptimized.",
        severity: "high", category: "performance", actionLabel: "Optimize",
      },
      {
        id: "i3-004", title: "Add meta descriptions",
        description: "No meta descriptions found on any page.",
        severity: "recommended", category: "on-page", actionLabel: "Add Descriptions",
      },
      {
        id: "i3-005", title: "HTTPS configured correctly",
        description: "All pages served over HTTPS with valid SSL.",
        severity: "passed", category: "performance", actionLabel: "View",
      },
    ],
  },
  "biz-004": {
    ...mockSeoScore,
    id: "seo-004",
    businessId: "biz-004",
    overallScore: 41,
    indexability: 55,
    mobilePassed: false,
    lcpSeconds: 4.1,
    clsScore: 0.42,
    onPageScore: 35,
    localCitations: 18,
    inconsistentNapCount: 47,
    issues: [
      {
        id: "i4-001", title: "GMB profile disconnected",
        description: "Your Google Business Profile is not connected. Reconnect to restore local ranking.",
        severity: "critical", category: "local-seo", actionLabel: "Reconnect GMB",
      },
      {
        id: "i4-002", title: "Site returns 500 errors on mobile",
        description: "Multiple service pages fail on mobile devices.",
        severity: "critical", category: "mobile", actionLabel: "Fix Errors",
      },
      {
        id: "i4-003", title: "No sitemap detected",
        description: "Sitemap.xml not found. Submit one to Google Search Console.",
        severity: "critical", category: "indexability", actionLabel: "Create Sitemap",
      },
      {
        id: "i4-004", title: "Extremely slow LCP (4.1s)",
        description: "Page speed is critically slow. Full image and code audit needed.",
        severity: "high", category: "performance", actionLabel: "Audit Site",
      },
      {
        id: "i4-005", title: "Very few local citations (18)",
        description: "Low citation count compared to competitors. Build more directory listings.",
        severity: "recommended", category: "local-seo", actionLabel: "Build Citations",
      },
    ],
  },
};

function BacklinkBar({ strength }: { strength: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-4 h-1.5 rounded-full",
            i < strength ? "bg-secondary" : "bg-surface-container"
          )}
        />
      ))}
    </div>
  );
}

// ─── Domain Switcher Dropdown ─────────────────────────────────────────────────
function DomainSwitcher({
  selectedId,
  onChange,
}: {
  selectedId: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = mockBusinesses.find((b) => b.id === selectedId)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors shadow-sm"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="max-w-[200px] truncate">{selected.domain}</span>
        <ChevronDown className={cn("w-4 h-4 text-on-surface-variant transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 w-72 bg-white border border-outline-variant rounded-xl shadow-xl overflow-hidden animate-fade-in">
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Select Domain to Analyze
              </p>
            </div>
            {mockBusinesses.map((biz) => (
              <button
                key={biz.id}
                onClick={() => { onChange(biz.id); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-container transition-colors",
                  biz.id === selectedId && "bg-primary/5"
                )}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  biz.id === selectedId ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant"
                )}>
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-semibold truncate", biz.id === selectedId ? "text-primary" : "text-on-surface")}>
                    {biz.name}
                  </p>
                  <p className="text-xs text-on-surface-variant truncate">{biz.domain}</p>
                </div>
                {biz.id === selectedId && (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WebsiteAnalyzerPage() {
  const [selectedBizId, setSelectedBizId] = useState("biz-001");
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const seo = seoDataByBusinessId[selectedBizId] ?? mockSeoScore;
  const selectedBiz = mockBusinesses.find((b) => b.id === selectedBizId)!;

  const handleRunScan = async () => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setScanning(false);
    setLastScanned(new Date().toLocaleTimeString());
  };

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Website Analyzer</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-on-surface-variant text-sm">
              Domain:{" "}
              <span className="font-bold text-on-surface">{selectedBiz.domain}</span>
            </p>
            {lastScanned && (
              <span className="text-xs text-on-surface-variant italic">
                · Last scanned at {lastScanned}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DomainSwitcher selectedId={selectedBizId} onChange={(id) => { setSelectedBizId(id); setLastScanned(null); }} />
          <button
            onClick={handleRunScan}
            disabled={scanning}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all",
              scanning
                ? "bg-primary/60 cursor-not-allowed"
                : "bg-primary hover:shadow-primary/20 hover:opacity-90 active:scale-95"
            )}
          >
            <RefreshCw className={cn("w-4 h-4", scanning && "animate-spin")} />
            {scanning ? "Scanning..." : "Run New Scan"}
          </button>
        </div>
      </div>

      {/* Hero: SEO Gauge + KPI Cards */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <SeoGauge score={seo.overallScore} change={4} size={240} />
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <KpiCard
            label="Indexability"
            value={`${seo.indexability}%`}
            icon={SearchCheck}
            iconColor="text-secondary"
            iconBg="bg-secondary/10"
            progressValue={seo.indexability}
          />
          <KpiCard
            label="Mobile Core Vitals"
            value={seo.mobilePassed ? "Pass" : "Fail"}
            subtext={`LCP: ${seo.lcpSeconds}s | CLS: ${seo.clsScore}`}
            icon={Smartphone}
            iconColor={seo.mobilePassed ? "text-emerald-600" : "text-error"}
            iconBg={seo.mobilePassed ? "bg-emerald-50" : "bg-error-container"}
          />
          <KpiCard
            label="On-Page Optimization"
            value={`${seo.onPageScore}/100`}
            subtext={`${seo.issues.filter((i) => i.category === "on-page" && i.severity !== "passed").length} issue(s) found`}
            icon={FileText}
            iconColor="text-amber-500"
            iconBg="bg-amber-50"
            progressValue={seo.onPageScore}
          />
          <KpiCard
            label="Local Citations"
            value={String(seo.localCitations)}
            subtext={`${seo.inconsistentNapCount} Inconsistent NAP profiles`}
            icon={MapPin}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
        </div>
      </section>

      {/* Actionable Checklist */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-primary">Actionable Checklist</h3>
        <ChecklistTabs issues={seo.issues} />
      </section>

      {/* Competitor Comparison */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-primary">Local Competitor Comparison</h3>
          <span className="text-sm text-on-surface-variant italic">Data updated 2 hours ago</span>
        </div>
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  {["Business Name", "SEO Score", "Keywords in Top 3", "Est. Monthly Traffic", "Backlink Strength"].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {mockCompetitors.map((comp) => (
                  <tr
                    key={comp.id}
                    className={cn("transition-colors", comp.isYou ? "bg-primary/5" : "hover:bg-surface-container-low")}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full", comp.isYou ? "bg-primary" : "bg-outline-variant")} />
                        <span className={cn("font-semibold", comp.isYou ? "text-primary" : "text-on-surface")}>
                          {comp.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface">{comp.seoScore}</td>
                    <td className={cn("px-6 py-4 font-semibold", comp.keywordsTop3 > 12 ? "text-error" : "text-on-surface")}>
                      {comp.keywordsTop3}
                    </td>
                    <td className="px-6 py-4 text-on-surface">{comp.estimatedMonthlyTraffic.toLocaleString()}</td>
                    <td className="px-6 py-4"><BacklinkBar strength={comp.backlinkStrength} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

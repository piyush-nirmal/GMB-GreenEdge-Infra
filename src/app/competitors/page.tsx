"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockCompetitors } from "@/data/mockCompetitors";
import { TrendingUp, Globe, Users2, Award, Search } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";

function BacklinkBar({ strength }: { strength: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-5 h-2 rounded-full",
            i < strength ? "bg-secondary" : "bg-surface-container"
          )}
        />
      ))}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-emerald-50 text-emerald-700"
      : score >= 60
      ? "bg-amber-50 text-amber-700"
      : "bg-error-container text-on-error-container";
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-sm font-bold", color)}>
      {score}
    </span>
  );
}

export default function CompetitorsPage() {
  const [search, setSearch] = useState("");
  const you = mockCompetitors.find((c) => c.isYou)!;
  const topCompetitor = mockCompetitors
    .filter((c) => !c.isYou)
    .sort((a, b) => b.seoScore - a.seoScore)[0];

  const filtered = mockCompetitors.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary">Competitors</h2>
        <p className="text-on-surface-variant mt-1">
          Track your local SEO performance against nearby businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Your SEO Score"
          value={String(you.seoScore)}
          changeLabel={`vs ${topCompetitor.name}: ${topCompetitor.seoScore}`}
          icon={TrendingUp}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <KpiCard
          label="Your Keywords (Top 3)"
          value={String(you.keywordsTop3)}
          changeLabel={`Competitor best: ${Math.max(...mockCompetitors.filter(c => !c.isYou).map(c => c.keywordsTop3))}`}
          icon={Award}
          iconColor="text-secondary"
          iconBg="bg-secondary/10"
        />
        <KpiCard
          label="Monthly Traffic"
          value={you.estimatedMonthlyTraffic.toLocaleString()}
          changeLabel="Estimated organic"
          icon={Globe}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <KpiCard
          label="Competitors Tracked"
          value={String(mockCompetitors.filter((c) => !c.isYou).length)}
          changeLabel="In your area"
          icon={Users2}
          iconColor="text-amber-500"
          iconBg="bg-amber-50"
        />
      </div>

      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-outline-variant flex flex-wrap justify-between items-center gap-3">
          <h3 className="font-semibold text-on-surface">Local Competitor Comparison</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search competitors..."
                className="pl-8 pr-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-44"
              />
            </div>
            <span className="text-sm text-on-surface-variant italic">Updated 2 hours ago</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                {[
                  "Business Name",
                  "SEO Score",
                  "Keywords Top 3",
                  "Est. Monthly Traffic",
                  "Backlink Strength",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filtered.map((comp) => (
                <tr
                  key={comp.id}
                  className={cn(
                    "transition-colors",
                    comp.isYou ? "bg-primary/5" : "hover:bg-surface-container-low"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full shrink-0",
                          comp.isYou ? "bg-primary" : "bg-outline-variant"
                        )}
                      />
                      <div>
                        <p
                          className={cn(
                            "font-semibold",
                            comp.isYou ? "text-primary" : "text-on-surface"
                          )}
                        >
                          {comp.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">{comp.domain}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ScoreBadge score={comp.seoScore} />
                  </td>
                  <td
                    className={cn(
                      "px-6 py-4 font-semibold",
                      comp.keywordsTop3 > (you.keywordsTop3)
                        ? "text-error"
                        : "text-emerald-600"
                    )}
                  >
                    {comp.keywordsTop3}
                  </td>
                  <td className="px-6 py-4 text-on-surface">
                    {comp.estimatedMonthlyTraffic.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <BacklinkBar strength={comp.backlinkStrength} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { BarChart3, TrendingUp, Globe, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SeoGauge } from "@/components/charts/SeoGauge";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChecklistTabs } from "@/components/seo/ChecklistTabs";
import { mockSeoScore } from "@/data/mockSeoScore";

export const metadata: Metadata = {
  title: "SEO Score",
};

export default function SeoScorePage() {
  const seo = mockSeoScore;
  const categories = [
    { label: "Indexability", score: seo.indexability, icon: Globe },
    { label: "On-Page SEO", score: seo.onPageScore, icon: BarChart3 },
    { label: "Mobile", score: seo.mobilePassed ? 95 : 45, icon: CheckCircle2 },
    { label: "Local SEO", score: 71, icon: TrendingUp },
    { label: "Performance", score: 84, icon: AlertTriangle },
  ];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary">SEO Score</h2>
        <p className="text-on-surface-variant mt-1">
          Detailed breakdown of your search engine optimization performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SeoGauge score={seo.overallScore} change={4} size={240} />

        <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-6 animate-fade-in">
          <h3 className="font-semibold text-on-surface mb-6">Score Breakdown</h3>
          <div className="space-y-5">
            {categories.map(({ label, score, icon: Icon }) => {
              const color =
                score >= 80
                  ? "bg-emerald-500"
                  : score >= 60
                  ? "bg-amber-400"
                  : "bg-error";
              return (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-on-surface-variant" />
                      <span className="text-sm font-medium text-on-surface">{label}</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface">{score}/100</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${color}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard
          label="Critical Issues"
          value={String(seo.issues.filter((i) => ["critical", "high"].includes(i.severity)).length)}
          subtext="Require immediate attention"
          icon={AlertTriangle}
          iconColor="text-error"
          iconBg="bg-error-container"
        />
        <KpiCard
          label="Recommended Fixes"
          value={String(seo.issues.filter((i) => i.severity === "recommended").length)}
          subtext="Improve your score"
          icon={BarChart3}
          iconColor="text-amber-500"
          iconBg="bg-amber-50"
        />
        <KpiCard
          label="Passed Checks"
          value={String(seo.issues.filter((i) => i.severity === "passed").length)}
          subtext="All looking good"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-primary">Issues &amp; Recommendations</h3>
        <ChecklistTabs issues={seo.issues} />
      </section>
    </div>
  );
}

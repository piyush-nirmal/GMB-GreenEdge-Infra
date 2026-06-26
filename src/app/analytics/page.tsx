"use client";

import { useState, useMemo } from "react";
import { LineChart, MousePointerClick, Eye, Percent, Award } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChartCard } from "@/components/charts/ChartCard";
import { AnalyticsChart } from "@/components/charts/AnalyticsChart";
import { mockAnalytics } from "@/data/mockAnalytics";
import { formatNumber } from "@/lib/utils";

type Period = "7d" | "30d" | "90d" | "12m";

const PERIOD_LABELS: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "12m": "Last 12 months",
};

const PERIOD_MONTHS: Record<Period, number> = {
  "7d": 1,
  "30d": 1,
  "90d": 3,
  "12m": 12,
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("12m");

  const filteredData = useMemo(() => {
    const take = PERIOD_MONTHS[period];
    return mockAnalytics.dataPoints.slice(-take);
  }, [period]);

  const totalTraffic = filteredData.reduce((s, d) => s + d.organicTraffic, 0);
  const totalClicks = filteredData.reduce((s, d) => s + d.clicks, 0);
  const totalImpressions = filteredData.reduce((s, d) => s + d.impressions, 0);
  const avgCtr = filteredData.length
    ? parseFloat(((totalClicks / totalImpressions) * 100).toFixed(1))
    : 0;

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Analytics</h2>
          <p className="text-on-surface-variant mt-1">
            Organic search performance — {PERIOD_LABELS[period]}.
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="px-4 py-2 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
        >
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <option key={p} value={p}>
              {PERIOD_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Total Traffic"
          value={formatNumber(totalTraffic)}
          change={9.4}
          changeLabel="+9.4% vs prior period"
          icon={LineChart}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <KpiCard
          label="Total Clicks"
          value={formatNumber(totalClicks)}
          change={12.1}
          changeLabel="+12.1% vs prior period"
          icon={MousePointerClick}
          iconColor="text-secondary"
          iconBg="bg-secondary/10"
        />
        <KpiCard
          label="Total Impressions"
          value={formatNumber(totalImpressions)}
          change={7.8}
          changeLabel="+7.8% vs prior period"
          icon={Eye}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <KpiCard
          label="Avg. CTR"
          value={`${avgCtr}%`}
          change={0.4}
          changeLabel="+0.4% vs prior period"
          icon={Percent}
          iconColor="text-amber-500"
          iconBg="bg-amber-50"
        />
      </div>

      <ChartCard
        title="Traffic & Clicks Trend"
        subtitle={`Monthly organic performance — ${PERIOD_LABELS[period]}`}
        action={
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-lg">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              Avg Position: #{mockAnalytics.avgPosition}
            </span>
          </div>
        }
      >
        <AnalyticsChart data={filteredData} height={320} showAll />
      </ChartCard>

      {/* Monthly breakdown table */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-outline-variant">
          <h3 className="font-semibold text-on-surface">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                {["Month", "Organic Traffic", "Clicks", "Impressions", "Conversions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {[...filteredData].reverse().map((dp) => (
                <tr key={dp.month} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-3 font-semibold text-on-surface">{dp.month}</td>
                  <td className="px-6 py-3">{dp.organicTraffic.toLocaleString()}</td>
                  <td className="px-6 py-3">{dp.clicks.toLocaleString()}</td>
                  <td className="px-6 py-3">{dp.impressions.toLocaleString()}</td>
                  <td className="px-6 py-3 text-emerald-600 font-semibold">
                    {dp.conversions}
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

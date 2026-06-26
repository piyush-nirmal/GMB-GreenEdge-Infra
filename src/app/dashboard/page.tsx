import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Star,
  CalendarClock,
  TrendingUp,
  MessageSquare,
  ScanSearch,
  AlertTriangle,
} from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChartCard } from "@/components/charts/ChartCard";
import { AnalyticsChart } from "@/components/charts/AnalyticsChart";
import { SeoGauge } from "@/components/charts/SeoGauge";
import { mockAnalytics } from "@/data/mockAnalytics";
import { mockPosts } from "@/data/mockPosts";
import { mockActivity } from "@/data/mockActivity";
import { formatRelativeTime, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

const activityIconMap = {
  post_published: { icon: Globe, color: "text-secondary bg-secondary/10" },
  review_received: { icon: Star, color: "text-amber-500 bg-amber-50" },
  seo_score_updated: { icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  scan_completed: { icon: ScanSearch, color: "text-primary bg-primary/10" },
  competitor_alert: { icon: AlertTriangle, color: "text-error bg-error-container" },
};

export default async function DashboardPage() {
  const firstName = "there";
  const upcomingPosts = mockPosts.filter((p) => p.status === "scheduled");

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Dashboard</h2>
        <p className="text-on-surface-variant mt-1">
          Welcome back, {firstName}! Here&apos;s how your businesses are performing.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Overall SEO Score"
          value="82"
          change={4}
          changeLabel="+4 pts this month"
          icon={TrendingUp}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <KpiCard
          label="Organic Traffic"
          value="1,400"
          change={9.4}
          changeLabel="+9.4% vs last month"
          icon={Globe}
          iconColor="text-secondary"
          iconBg="bg-secondary/10"
        />
        <KpiCard
          label="Avg Rating"
          value="4.7 ★"
          changeLabel="148 total reviews"
          icon={Star}
          iconColor="text-amber-500"
          iconBg="bg-amber-50"
        />
        <KpiCard
          label="Scheduled Posts"
          value={String(upcomingPosts.length)}
          changeLabel="Next 7 days"
          icon={CalendarClock}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEO Gauge */}
        <SeoGauge score={82} change={4} size={220} />

        {/* Analytics Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Organic Traffic & Clicks"
            subtitle="Last 12 months"
            action={
              <span className="text-xs text-on-surface-variant italic">
                Updated today
              </span>
            }
          >
            <AnalyticsChart data={mockAnalytics.dataPoints} height={220} />
          </ChartCard>
        </div>
      </div>

      {/* Activity + Upcoming Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-semibold text-on-surface">Recent Activity</h3>
            <Link href="/analytics" className="text-secondary text-sm font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {mockActivity.map((item) => {
              const { icon: Icon, color } =
                activityIconMap[item.type] ?? activityIconMap.scan_completed;
              return (
                <div key={item.id} className="px-6 py-4 flex items-start gap-4">
                  <span className={cn("p-2 rounded-lg shrink-0", color)}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-xs text-on-surface-variant shrink-0 ml-auto">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Posts */}
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-semibold text-on-surface">Upcoming Posts</h3>
            <Link href="/scheduled-posts" className="text-secondary text-sm font-semibold hover:underline">
              Manage posts
            </Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {upcomingPosts.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-on-surface-variant">
                No scheduled posts.
              </div>
            ) : (
              upcomingPosts.map((post) => (
                <div key={post.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-on-surface line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {formatDate(post.scheduledAt)}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-secondary-fixed text-secondary text-xs font-bold rounded uppercase shrink-0">
                    {post.type}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

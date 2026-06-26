import type { Metadata } from "next";
import { Bell, CheckCircle2, Star, TrendingUp, AlertTriangle, CalendarClock } from "lucide-react";
import { mockActivity } from "@/data/mockActivity";
import { formatRelativeTime, cn } from "@/lib/utils";
import { ActivityType } from "@/lib/types";

export const metadata: Metadata = { title: "Notifications" };

const typeConfig: Record<ActivityType, { icon: typeof Bell; color: string; bg: string }> = {
  post_published: { icon: CalendarClock, color: "text-primary", bg: "bg-primary/10" },
  review_received: { icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
  seo_score_updated: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  scan_completed: { icon: CheckCircle2, color: "text-secondary", bg: "bg-secondary/10" },
  competitor_alert: { icon: AlertTriangle, color: "text-error", bg: "bg-error-container" },
};

export default function NotificationsPage() {
  return (
    <div className="p-8 max-w-[900px] mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Notifications</h2>
          <p className="text-on-surface-variant mt-1">Recent activity and alerts across all businesses.</p>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
          {mockActivity.length} unread
        </span>
      </div>

      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
        {mockActivity.length === 0 ? (
          <div className="p-16 text-center text-on-surface-variant">
            <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {mockActivity.map((item) => {
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;
              return (
                <div key={item.id} className="flex items-start gap-4 px-6 py-5 hover:bg-surface-container-low transition-colors">
                  <span className={cn("p-2.5 rounded-xl shrink-0 mt-0.5", cfg.bg)}>
                    <Icon className={cn("w-4 h-4", cfg.color)} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-on-surface text-sm">{item.title}</p>
                    <p className="text-sm text-on-surface-variant mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-on-surface-variant/70 font-medium">{item.businessName}</span>
                      <span className="w-1 h-1 bg-on-surface-variant/30 rounded-full" />
                      <span className="text-xs text-on-surface-variant/70">{formatRelativeTime(item.timestamp)}</span>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full mt-2 shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

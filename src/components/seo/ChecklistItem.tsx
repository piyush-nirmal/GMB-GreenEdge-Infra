import { SeoIssue } from "@/lib/types";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  issue: SeoIssue;
  onAction?: (issue: SeoIssue) => void;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    iconColor: "text-error",
    badge: "bg-error-container text-on-error-container",
    badgeLabel: "Critical",
  },
  high: {
    icon: AlertCircle,
    iconColor: "text-error",
    badge: "bg-error-container text-on-error-container",
    badgeLabel: "High Impact",
  },
  recommended: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    badge: "bg-amber-50 text-amber-700",
    badgeLabel: "Recommended",
  },
  passed: {
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
    badgeLabel: "Passed",
  },
} as const;

const categoryLabels: Record<string, string> = {
  indexability: "Indexability",
  "on-page": "On-Page",
  "local-seo": "Local SEO",
  performance: "Performance",
  mobile: "Mobile",
  backlinks: "Backlinks",
};

export function ChecklistItem({ issue, onAction }: ChecklistItemProps) {
  const config = severityConfig[issue.severity];
  const Icon = config.icon;

  return (
    <div className="p-6 flex items-start gap-4 hover:bg-surface-container-low transition-colors">
      <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-on-surface">{issue.title}</h4>
        <p className="text-sm text-on-surface-variant mt-1">{issue.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide",
              config.badge
            )}
          >
            {config.badgeLabel}
          </span>
          <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wide">
            {categoryLabels[issue.category] ?? issue.category}
          </span>
        </div>
      </div>
      {issue.severity !== "passed" && (
        <button
          onClick={() => onAction?.(issue)}
          className="text-secondary text-sm font-bold hover:underline shrink-0 mt-0.5"
        >
          {issue.actionLabel}
        </button>
      )}
    </div>
  );
}

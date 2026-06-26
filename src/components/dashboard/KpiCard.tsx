import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  progressValue?: number;
  subtext?: string;
}

export function KpiCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  progressValue,
  subtext,
}: KpiCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className="bg-white rounded-xl border border-outline-variant p-6 flex flex-col justify-between hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase mb-1">
            {label}
          </p>
          <h3 className="text-3xl font-bold text-primary">{value}</h3>
        </div>
        <span className={cn("p-2.5 rounded-xl", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </span>
      </div>

      {progressValue !== undefined && (
        <div className="mt-4 bg-surface-container-low h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-700"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}

      {subtext && (
        <p className="mt-3 text-sm text-on-surface-variant">{subtext}</p>
      )}

      {change !== undefined && changeLabel && (
        <div
          className={cn(
            "mt-3 flex items-center gap-1 text-sm font-semibold",
            isPositive && "text-emerald-600",
            isNegative && "text-error",
            !isPositive && !isNegative && "text-on-surface-variant"
          )}
        >
          {isPositive && <TrendingUp className="w-4 h-4" />}
          {isNegative && <TrendingDown className="w-4 h-4" />}
          <span>{changeLabel}</span>
        </div>
      )}
    </div>
  );
}

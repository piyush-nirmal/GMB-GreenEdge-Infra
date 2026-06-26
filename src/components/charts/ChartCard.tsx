import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function ChartCard({ title, subtitle, children, action }: ChartCardProps) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant p-6 animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-base text-on-surface">{title}</h3>
          {subtitle && (
            <p className="text-sm text-on-surface-variant mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}

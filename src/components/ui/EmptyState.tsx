import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-on-surface-variant" />
      </div>
      <h3 className="text-base font-semibold text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

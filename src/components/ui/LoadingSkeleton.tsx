import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "shimmer rounded-lg bg-surface-container",
        className
      )}
    />
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-outline-variant p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-8 w-16" />
        </div>
        <SkeletonBox className="h-10 w-10 rounded-xl" />
      </div>
      <SkeletonBox className="h-1.5 w-full mt-4" />
      <SkeletonBox className="h-3 w-32 mt-3" />
    </div>
  );
}

export function TableSkeleton({ count = 5 }: LoadingSkeletonProps) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <SkeletonBox className="h-9 w-64" />
      </div>
      <div className="divide-y divide-outline-variant">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4">
            <SkeletonBox className="h-4 w-48" />
            <SkeletonBox className="h-4 w-16 ml-auto" />
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-outline-variant p-6">
      <SkeletonBox className="h-4 w-40 mb-6" />
      <SkeletonBox className="h-64 w-full rounded-xl" />
    </div>
  );
}

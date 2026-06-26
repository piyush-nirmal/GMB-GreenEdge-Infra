export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8 animate-pulse">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <div className="shimmer h-8 w-48 rounded-xl" />
        <div className="shimmer h-4 w-72 rounded-lg" />
      </div>
      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-3">
            <div className="shimmer h-10 w-10 rounded-xl" />
            <div className="shimmer h-7 w-16 rounded-lg" />
            <div className="shimmer h-4 w-28 rounded" />
          </div>
        ))}
      </div>
      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-outline-variant p-6">
          <div className="shimmer h-48 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-6">
          <div className="shimmer h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

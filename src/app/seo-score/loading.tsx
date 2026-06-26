export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-36 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-outline-variant p-6">
          <div className="shimmer h-60 w-60 rounded-full mx-auto" />
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="shimmer h-4 w-32 rounded" />
              <div className="shimmer h-2 rounded-full" style={{ width: `${60 + i * 8}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-3">
            <div className="shimmer h-10 w-10 rounded-xl" />
            <div className="shimmer h-7 w-10 rounded" />
            <div className="shimmer h-4 w-32 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

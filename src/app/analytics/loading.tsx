export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-40 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-3">
            <div className="shimmer h-10 w-10 rounded-xl" />
            <div className="shimmer h-7 w-16 rounded-lg" />
            <div className="shimmer h-4 w-28 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-outline-variant p-6">
        <div className="shimmer h-80 w-full rounded-xl" />
      </div>
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-4 px-6 py-3 border-b border-outline-variant last:border-0">
            <div className="shimmer h-4 w-24 rounded" />
            <div className="shimmer h-4 w-20 rounded" />
            <div className="shimmer h-4 w-20 rounded" />
            <div className="shimmer h-4 w-20 rounded" />
            <div className="shimmer h-4 w-16 rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

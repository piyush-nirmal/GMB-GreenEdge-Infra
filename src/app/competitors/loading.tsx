export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-44 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-3">
            <div className="shimmer h-10 w-10 rounded-xl" />
            <div className="shimmer h-7 w-16 rounded-lg" />
            <div className="shimmer h-4 w-28 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
        <div className="shimmer h-12 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-6 px-6 py-4 border-b border-outline-variant last:border-0">
            <div className="shimmer h-4 w-40 rounded" />
            <div className="shimmer h-4 w-14 rounded" />
            <div className="shimmer h-4 w-12 rounded" />
            <div className="shimmer h-4 w-24 rounded" />
            <div className="shimmer h-4 w-16 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

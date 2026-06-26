export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-36 rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-4">
            <div className="shimmer h-7 w-12 rounded mx-auto mb-1" />
            <div className="shimmer h-3 w-20 rounded mx-auto" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-3">
            <div className="flex gap-3">
              <div className="shimmer w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="shimmer h-4 w-32 rounded" />
                <div className="shimmer h-3 w-20 rounded" />
              </div>
            </div>
            <div className="shimmer h-3 w-full rounded" />
            <div className="shimmer h-3 w-4/5 rounded" />
            <div className="shimmer h-9 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

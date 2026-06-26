export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="shimmer h-8 w-44 rounded-xl" />
        <div className="shimmer h-10 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-5 flex gap-4">
            <div className="shimmer w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="shimmer h-7 w-8 rounded" />
              <div className="shimmer h-4 w-20 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-5 space-y-3">
            <div className="flex gap-2">
              <div className="shimmer h-5 w-16 rounded-full" />
              <div className="shimmer h-5 w-12 rounded-full" />
            </div>
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-3 w-4/5 rounded" />
            <div className="shimmer h-3 w-24 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

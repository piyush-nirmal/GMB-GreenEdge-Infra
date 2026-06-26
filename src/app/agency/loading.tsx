export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div className="shimmer h-8 w-48 rounded-xl" />
        <div className="shimmer h-10 w-32 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-5 flex gap-4">
            <div className="shimmer w-11 h-11 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="shimmer h-7 w-8 rounded" />
              <div className="shimmer h-4 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-4">
            <div className="shimmer h-5 w-40 rounded" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="shimmer h-16 rounded-xl" />
              ))}
            </div>
            <div className="flex gap-2">
              <div className="shimmer h-9 flex-1 rounded-xl" />
              <div className="shimmer h-9 flex-1 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-36 rounded-xl" />
      <div className="flex gap-8">
        <div className="w-56 shrink-0 space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shimmer h-10 w-full rounded-xl" />
          ))}
        </div>
        <div className="flex-1 bg-white rounded-xl border border-outline-variant p-8 space-y-4">
          <div className="shimmer h-6 w-40 rounded" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="shimmer h-4 w-20 rounded" />
                <div className="shimmer h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
          <div className="shimmer h-10 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

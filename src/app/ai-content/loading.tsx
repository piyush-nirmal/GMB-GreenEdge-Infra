export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-52 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-outline-variant p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="shimmer h-4 w-28 rounded" />
              <div className="shimmer h-11 w-full rounded-xl" />
            </div>
          ))}
          <div className="shimmer h-12 w-full rounded-xl" />
        </div>
        <div className="bg-white rounded-xl border border-outline-variant p-6">
          <div className="shimmer h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

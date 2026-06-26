export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="shimmer h-8 w-40 rounded-xl" />
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-outline-variant last:border-0">
            <div className="shimmer h-5 w-5 rounded" />
            <div className="flex-1 shimmer h-4 rounded" />
            <div className="shimmer h-4 w-20 rounded" />
            <div className="shimmer h-4 w-16 rounded" />
            <div className="shimmer h-4 w-12 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

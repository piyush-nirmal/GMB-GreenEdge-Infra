export default function Loading() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div className="shimmer h-8 w-44 rounded-xl" />
        <div className="flex gap-3">
          <div className="shimmer h-10 w-52 rounded-xl" />
          <div className="shimmer h-10 w-36 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-outline-variant p-6">
          <div className="shimmer h-60 w-60 rounded-full mx-auto" />
        </div>
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-outline-variant p-6 space-y-3">
              <div className="shimmer h-10 w-10 rounded-xl" />
              <div className="shimmer h-7 w-16 rounded" />
              <div className="shimmer h-4 w-28 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

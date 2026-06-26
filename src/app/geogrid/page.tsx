"use client";

import { useState } from "react";
import { Grid3x3, MapPin, TrendingUp, RefreshCw } from "lucide-react";
import { mockBusinesses } from "@/data/mockBusinesses";
import { cn } from "@/lib/utils";

// Generate a 5x5 grid of rank positions (simulated)
function generateGrid(centerRank: number) {
  return Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => {
      const dist = Math.abs(row - 2) + Math.abs(col - 2);
      const rank = Math.min(20, Math.max(1, centerRank + dist * 2 + Math.floor(Math.random() * 3)));
      return rank;
    })
  );
}

function getRankColor(rank: number) {
  if (rank <= 3) return "bg-emerald-500 text-white";
  if (rank <= 7) return "bg-amber-400 text-white";
  if (rank <= 10) return "bg-orange-400 text-white";
  return "bg-error text-white";
}

export default function GeoGridPage() {
  const [selectedBiz, setSelectedBiz] = useState(mockBusinesses[0]);
  const [scanning, setScanning] = useState(false);
  const [grid, setGrid] = useState<number[][] | null>(null);

  const runScan = async () => {
    setScanning(true);
    setGrid(null);
    await new Promise((r) => setTimeout(r, 1800));
    setGrid(generateGrid(selectedBiz.seoScore > 70 ? 1 : selectedBiz.seoScore > 50 ? 3 : 6));
    setScanning(false);
  };

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">GeoGrid Rank Tracker</h2>
          <p className="text-on-surface-variant mt-1">
            See your local search rank at every point on the map.
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedBiz.id}
            onChange={(e) => setSelectedBiz(mockBusinesses.find((b) => b.id === e.target.value)!)}
            className="px-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {mockBusinesses.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <button
            onClick={runScan}
            disabled={scanning}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg transition-all",
              scanning ? "bg-primary/60 cursor-not-allowed" : "bg-primary hover:opacity-90 active:scale-95"
            )}
          >
            <RefreshCw className={cn("w-4 h-4", scanning && "animate-spin")} />
            {scanning ? "Scanning..." : "Run GeoGrid Scan"}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Rank 1–3", color: "bg-emerald-500" },
          { label: "Rank 4–7", color: "bg-amber-400" },
          { label: "Rank 8–10", color: "bg-orange-400" },
          { label: "Rank 11+", color: "bg-error" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-on-surface-variant">
            <div className={cn("w-3.5 h-3.5 rounded-sm", color)} />
            {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="bg-white rounded-xl border border-outline-variant p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-on-surface">
            {selectedBiz.name} — {selectedBiz.city}, {selectedBiz.state}
          </h3>
        </div>

        {scanning && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
            <p className="text-on-surface-variant font-semibold">Scanning 25 grid points...</p>
            <div className="grid grid-cols-5 gap-2 opacity-30">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="shimmer w-14 h-14 rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {!scanning && !grid && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-on-surface-variant">
            <Grid3x3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-semibold text-on-surface">No scan data yet</p>
            <p className="text-sm mt-1">Click &quot;Run GeoGrid Scan&quot; to see your local rankings across a 5×5 grid.</p>
          </div>
        )}

        {!scanning && grid && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {grid.map((row, ri) =>
                row.map((rank, ci) => {
                  const isCenter = ri === 2 && ci === 2;
                  return (
                    <div
                      key={`${ri}-${ci}`}
                      className={cn(
                        "w-full aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold shadow-sm transition-transform hover:scale-105 cursor-default",
                        isCenter ? "ring-2 ring-primary ring-offset-2" : "",
                        getRankColor(rank)
                      )}
                    >
                      <TrendingUp className="w-3 h-3 mb-0.5 opacity-70" />
                      #{rank}
                    </div>
                  );
                })
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Best Rank", value: `#${Math.min(...grid.flat())}`, color: "text-emerald-600" },
                { label: "Center Rank", value: `#${grid[2][2]}`, color: "text-primary" },
                { label: "Avg Rank", value: `#${Math.round(grid.flat().reduce((a, b) => a + b, 0) / 25)}`, color: "text-on-surface" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-surface-container-low rounded-xl p-4 text-center">
                  <p className={cn("text-2xl font-black", color)}>{value}</p>
                  <p className="text-xs text-on-surface-variant mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

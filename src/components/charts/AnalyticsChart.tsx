"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AnalyticsDataPoint } from "@/lib/types";

interface AnalyticsChartProps {
  data: AnalyticsDataPoint[];
  height?: number;
  showAll?: boolean;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-outline-variant rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-on-surface mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-on-surface-variant capitalize">{entry.name}:</span>
          <span className="font-semibold text-on-surface">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function AnalyticsChart({ data, height = 280, showAll = false }: AnalyticsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00236f" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#00236f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#006591" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#006591" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d97706" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#444651" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#444651" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
        />
        <Area
          type="monotone"
          dataKey="organicTraffic"
          name="Organic Traffic"
          stroke="#00236f"
          strokeWidth={2.5}
          fill="url(#colorTraffic)"
          dot={false}
          activeDot={{ r: 4, fill: "#00236f" }}
        />
        <Area
          type="monotone"
          dataKey="clicks"
          name="Clicks"
          stroke="#006591"
          strokeWidth={2.5}
          fill="url(#colorClicks)"
          dot={false}
          activeDot={{ r: 4, fill: "#006591" }}
        />
        {showAll && (
          <>
            <Area
              type="monotone"
              dataKey="impressions"
              name="Impressions"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#colorImpressions)"
              dot={false}
              activeDot={{ r: 4, fill: "#059669" }}
            />
            <Area
              type="monotone"
              dataKey="conversions"
              name="Conversions"
              stroke="#d97706"
              strokeWidth={2}
              fill="url(#colorConversions)"
              dot={false}
              activeDot={{ r: 4, fill: "#d97706" }}
            />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}

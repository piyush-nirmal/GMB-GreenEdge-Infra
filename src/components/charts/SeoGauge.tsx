"use client";

import { useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeoGaugeProps {
  score: number;
  change?: number;
  label?: string;
  size?: number;
}

export function SeoGauge({
  score,
  change,
  label = "SEO Health Score",
  size = 200,
}: SeoGaugeProps) {
  const gaugeRef = useRef<SVGCircleElement>(null);
  const radius = (size / 2) - 20;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const gauge = gaugeRef.current;
    if (!gauge) return;
    gauge.style.strokeDasharray = `${circumference} ${circumference}`;
    gauge.style.strokeDashoffset = String(circumference);
    const timer = setTimeout(() => {
      const offset = circumference - (score / 100) * circumference;
      gauge.style.strokeDashoffset = String(offset);
    }, 300);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const scoreColor =
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ba1a1a";
  const strokeColor =
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ba1a1a";

  return (
    <div className="bg-white rounded-xl border border-outline-variant p-8 flex flex-col items-center justify-center text-center animate-fade-in">
      <p className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase mb-6">
        {label}
      </p>

      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5eeff"
            strokeWidth="12"
          />
          {/* Progress arc */}
          <circle
            ref={gaugeRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-extrabold leading-none"
            style={{
              fontSize: size * 0.22,
              color: scoreColor,
            }}
          >
            {score}
          </span>
          <span className="text-xs font-bold text-on-surface-variant mt-1">
            OUT OF 100
          </span>
        </div>
      </div>

      {change !== undefined && (
        <div
          className={cn(
            "mt-6 flex items-center gap-2 font-bold text-sm",
            change >= 0 ? "text-emerald-600" : "text-error"
          )}
        >
          <TrendingUp className="w-4 h-4" />
          <span>
            {change >= 0 ? "+" : ""}
            {change} points since last month
          </span>
        </div>
      )}
    </div>
  );
}

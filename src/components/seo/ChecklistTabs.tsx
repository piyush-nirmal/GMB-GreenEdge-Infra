"use client";

import { useState } from "react";
import { SeoIssue } from "@/lib/types";
import { ChecklistItem } from "./ChecklistItem";
import { cn } from "@/lib/utils";

interface ChecklistTabsProps {
  issues: SeoIssue[];
}

type Tab = "critical" | "recommended" | "passed";

export function ChecklistTabs({ issues }: ChecklistTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("critical");

  const criticalIssues = issues.filter((i) =>
    ["critical", "high"].includes(i.severity)
  );
  const recommendedIssues = issues.filter((i) => i.severity === "recommended");
  const passedIssues = issues.filter((i) => i.severity === "passed");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "critical", label: "Critical Issues", count: criticalIssues.length },
    {
      id: "recommended",
      label: "Recommended Fixes",
      count: recommendedIssues.length,
    },
    { id: "passed", label: "Passed Checks", count: passedIssues.length },
  ];

  const currentIssues =
    activeTab === "critical"
      ? criticalIssues
      : activeTab === "recommended"
      ? recommendedIssues
      : passedIssues;

  return (
    <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
      {/* Tab Header */}
      <div className="flex border-b border-outline-variant bg-surface-container-lowest overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            {tab.label}{" "}
            <span
              className={cn(
                "ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-surface-container text-on-surface-variant"
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Issue List */}
      <div className="divide-y divide-outline-variant">
        {currentIssues.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant text-sm">
            No items in this category.
          </div>
        ) : (
          currentIssues.map((issue) => (
            <ChecklistItem key={issue.id} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
}

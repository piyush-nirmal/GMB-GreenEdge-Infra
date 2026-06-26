"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Sparkles,
  Globe,
  CalendarClock,
  BarChart3,
  LineChart,
  Star,
  Users2,
  Building2,
  Settings,
  Zap,
  FileBarChart2,
  Grid3x3,
  UserCog,
  Send,
  BookMarked,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Businesses", href: "/businesses", icon: Store },
      { label: "Analytics", href: "/analytics", icon: LineChart },
    ],
  },
  {
    label: "SEO & Content",
    items: [
      { label: "Website Analyzer", href: "/website-analyzer", icon: Globe },
      { label: "SEO Score", href: "/seo-score", icon: BarChart3 },
      { label: "Competitors", href: "/competitors", icon: Users2 },
      { label: "GeoGrid", href: "/geogrid", icon: Grid3x3 },
    ],
  },
  {
    label: "Content & Posts",
    items: [
      { label: "AI Content", href: "/ai-content", icon: Sparkles },
      { label: "Scheduled Posts", href: "/scheduled-posts", icon: CalendarClock },
    ],
  },
  {
    label: "Reputation",
    items: [
      { label: "Reviews", href: "/reviews", icon: Star },
      { label: "Review Requests", href: "/review-requests", icon: Send },
      { label: "Citations", href: "/citations", icon: BookMarked },
    ],
  },
  {
    label: "Agency",
    items: [
      { label: "Agency", href: "/agency", icon: Building2 },
      { label: "Reports", href: "/reports", icon: FileBarChart2 },
      { label: "Team", href: "/team", icon: UserCog },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed h-full w-[260px] left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-4 z-50">
      {/* Logo */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-bold text-xl text-primary leading-tight">GMB SEO</h1>
        </div>
        <p className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase pl-10">
          Autopilot
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0",
                        isActive ? "text-primary" : "text-on-surface-variant"
                      )}
                    />
                    <span>{label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Upgrade CTA */}
      <div className="px-3 mt-4 pt-4 border-t border-outline-variant">
        <Link
          href="/settings"
          className="block bg-gradient-to-br from-primary to-secondary-container rounded-xl p-4 text-white hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-white/80 mb-3 leading-relaxed">
            Unlock GeoGrid, white-label reports &amp; agency billing.
          </p>
          <div className="w-full bg-white text-primary text-xs font-bold py-2 rounded-lg text-center hover:bg-white/90 transition-colors active:scale-95">
            Upgrade Now
          </div>
        </Link>
      </div>
    </aside>
  );
}

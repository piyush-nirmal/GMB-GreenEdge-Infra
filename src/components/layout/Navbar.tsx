"use client";

import { Bell, ChevronDown, Search, Building2, LogOut, Settings, CheckCircle2, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockActivity } from "@/data/mockActivity";
import { mockBusinesses } from "@/data/mockBusinesses";
import { formatRelativeTime, cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { getBusinesses } from "@/lib/firestore";

const searchItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Businesses", href: "/businesses" },
  { label: "AI Content Generator", href: "/ai-content" },
  { label: "Analytics", href: "/analytics" },
  { label: "Reviews", href: "/reviews" },
  { label: "Competitors", href: "/competitors" },
  { label: "SEO Score", href: "/seo-score" },
  { label: "Scheduled Posts", href: "/scheduled-posts" },
  { label: "Website Analyzer", href: "/website-analyzer" },
  { label: "Agency Dashboard", href: "/agency" },
  { label: "Reports", href: "/reports" },
  { label: "GeoGrid", href: "/geogrid" },
  { label: "Team", href: "/team" },
  { label: "Review Requests", href: "/review-requests" },
  { label: "Settings", href: "/settings" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [activeWorkspace, setActiveWorkspace] = useState(mockBusinesses[0]);
  const searchRef = useRef<HTMLDivElement>(null);

  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "User";
  const displayEmail = user?.email ?? "pro@gmbautopilot.local";
  const avatarUrl = user?.photoURL ?? null;
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const filteredSearch = searchQuery.length > 0
    ? searchItems.filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    if (user) {
      getBusinesses(user.uid).then((bizes) => {
        if (bizes.length > 0) {
          setBusinesses(bizes);
          setActiveWorkspace(bizes[0]);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] bg-surface/80 backdrop-blur border-b border-outline-variant flex justify-between items-center h-16 px-6 z-40">
      {/* Search */}
      <div className="relative w-80" ref={searchRef}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search pages, businesses, posts..."
          className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
        />
        {searchOpen && filteredSearch.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white border border-outline-variant rounded-2xl shadow-xl overflow-hidden animate-fade-in z-50">
            {filteredSearch.slice(0, 6).map((item) => (
              <button
                key={item.href}
                onClick={() => { router.push(item.href); setSearchOpen(false); setSearchQuery(""); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container text-left text-sm text-on-surface transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Workspace Selector */}
        <div className="relative">
          <button
            onClick={() => setWorkspaceOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors text-sm"
          >
            <Building2 className="w-4 h-4 text-on-surface-variant" />
            <span className="font-medium text-on-surface max-w-[120px] truncate">{activeWorkspace.name}</span>
            <ChevronDown className={cn("w-3 h-3 text-on-surface-variant transition-transform", workspaceOpen && "rotate-180")} />
          </button>
          {workspaceOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setWorkspaceOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-white border border-outline-variant rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Switch Business</p>
                </div>
                {businesses.map((biz) => (
                  <button
                    key={biz.id}
                    onClick={() => { setActiveWorkspace(biz); setWorkspaceOpen(false); }}
                    className={cn("w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-container transition-colors", biz.id === activeWorkspace.id && "bg-primary/5")}
                  >
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold", biz.id === activeWorkspace.id ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant")}>
                      {biz.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className={cn("text-sm font-semibold truncate", biz.id === activeWorkspace.id ? "text-primary" : "text-on-surface")}>{biz.name}</p>
                      <p className="text-xs text-on-surface-variant capitalize">{biz.gmbStatus}</p>
                    </div>
                    {biz.id === activeWorkspace.id && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
                  </button>
                ))}
                <div className="border-t border-outline-variant p-2">
                  <button onClick={() => { setWorkspaceOpen(false); router.push("/businesses"); }} className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-secondary hover:bg-surface-container rounded-xl transition-colors">
                    Manage all businesses →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-6 bg-outline-variant mx-1" />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <Bell className="w-5 h-5 text-on-surface-variant" />
            {mockActivity.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface" />
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-20 w-80 bg-white border border-outline-variant rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant">
                  <p className="text-sm font-bold text-on-surface">Notifications</p>
                  <button onClick={() => setNotifOpen(false)} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant">
                  {mockActivity.map((item) => (
                    <div key={item.id} className="px-4 py-3 hover:bg-surface-container-low transition-colors">
                      <p className="text-sm font-semibold text-on-surface">{item.title}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{item.description}</p>
                      <p className="text-xs text-on-surface-variant/60 mt-1">{formatRelativeTime(item.timestamp)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-outline-variant p-2">
                  <button onClick={() => { setNotifOpen(false); router.push("/notifications"); }} className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-secondary hover:bg-surface-container rounded-xl transition-colors">
                    View all notifications →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-surface-container transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container overflow-hidden shrink-0">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={displayName} width={32} height={32} className="w-full h-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-on-surface leading-none">{displayName.split(" ")[0]}</p>
              <p className="text-xs text-on-surface-variant leading-none mt-0.5">{displayEmail ? displayEmail.split("@")[0] : "Pro Plan"}</p>
            </div>
            <ChevronDown className={`w-3 h-3 text-on-surface-variant ml-1 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-white border border-outline-variant rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <div className="px-4 py-4 border-b border-outline-variant bg-surface-container-low">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container overflow-hidden shrink-0">
                      {avatarUrl ? (
                        <Image src={avatarUrl} alt={displayName} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-on-surface truncate">{displayName}</p>
                      <p className="text-xs text-on-surface-variant truncate">{displayEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 space-y-0.5">
                  <button
                    onClick={() => { setUserMenuOpen(false); router.push("/settings"); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout().then(() => router.push("/login")).catch(console.error);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-container hover:text-error transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

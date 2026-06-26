"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface AppShellProps {
  children: React.ReactNode;
}

// Routes that should NOT show the app shell (sidebar/navbar)
const PUBLIC_ROUTES = ["/login"];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="ml-[260px] pt-16 min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </>
  );
}

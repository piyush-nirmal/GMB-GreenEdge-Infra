import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/lib/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | GMB SEO Autopilot",
    default: "GMB SEO Autopilot – Local SEO Automation Platform",
  },
  description:
    "Automate your Google Business Profile, generate AI-powered content, track local SEO performance, and manage reviews — all in one powerful platform.",
  keywords: [
    "GMB",
    "Google Business Profile",
    "Local SEO",
    "SEO automation",
    "Google My Business",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-on-surface font-sans antialiased">
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}

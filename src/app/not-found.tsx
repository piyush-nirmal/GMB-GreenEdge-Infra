"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="text-center max-w-md animate-fade-in">
        {/* 404 Graphic */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-5xl font-black text-primary/30 select-none">404</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-on-surface mb-2">Page not found</h1>
        <p className="text-on-surface-variant text-base leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-outline-variant text-on-surface-variant rounded-xl font-semibold hover:bg-surface-container transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-16 h-16 bg-error-container rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Something went wrong</h2>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
          An unexpected error occurred. If this keeps happening, please contact support.
        </p>
        {error?.digest && (
          <p className="text-xs text-on-surface-variant/60 font-mono mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}

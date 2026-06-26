"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap, TrendingUp, Star, BarChart3, Globe, Sparkles,
  RefreshCw, Eye, EyeOff, AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const features = [
  {
    icon: TrendingUp,
    title: "Local SEO Automation",
    description: "Track and improve your Google Business Profile ranking automatically.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description: "Generate SEO-optimized posts for Google Business Profile in seconds.",
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "Monitor and respond to customer reviews across all platforms.",
    color: "text-amber-500 bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Competitor Tracking",
    description: "Benchmark your performance against local competitors in real-time.",
    color: "text-emerald-600 bg-emerald-50",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();

  // Google sign-in state
  const [googleLoading, setGoogleLoading] = useState(false);

  // Credentials sign-in state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [credLoading, setCredLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || "Failed to sign in with Google.");
      setGoogleLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredLoading(true);
    setError("");
    try {
      if (isRegistering) {
        await registerWithEmail(username, password);
      } else {
        await loginWithEmail(username, password);
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || "Invalid email or password.");
      setCredLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 bg-white border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";

  return (
    <div className="min-h-screen bg-surface flex">
      {/* ── Left Panel — Branding ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-14"
        style={{
          background: "linear-gradient(145deg, #00236f 0%, #006591 60%, #0d0097 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03]" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl leading-none">GMB SEO</p>
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase">Autopilot</p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative space-y-6">
          <div>
            <h2 className="text-5xl font-bold text-white leading-tight">
              Dominate Local
              <br />
              <span className="text-white/70">Search Rankings</span>
            </h2>
            <p className="text-white/60 mt-4 text-lg leading-relaxed max-w-md">
              The all-in-one platform to automate your Google Business Profile,
              generate AI content, and outrank local competitors.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 hover:bg-white/15 transition-colors"
              >
                <span className={`inline-flex p-2 rounded-xl mb-3 ${color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <p className="text-white font-semibold text-sm leading-snug">{title}</p>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative flex items-center gap-8 border-t border-white/15 pt-6">
          {[
            { value: "2,000+", label: "Businesses" },
            { value: "98%", label: "Uptime" },
            { value: "4.9★", label: "Rating" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-white/50 font-semibold uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel — Sign In ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 overflow-y-auto">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-primary">GMB SEO Autopilot</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-on-surface">{isRegistering ? "Create an account" : "Welcome back"}</h1>
            <p className="text-on-surface-variant mt-2 text-base">
              {isRegistering ? "Get started with your local SEO automation." : "Sign in to manage your local SEO performance."}
            </p>
          </div>

          {/* ── Credentials Form ── */}
          <form onSubmit={handleCredentialsSignIn} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Email address
              </label>
              <input
                id="username"
                type="email"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="Enter your email"
                autoComplete="username"
                required
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className={`${inputBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-error-container rounded-xl text-sm text-on-error-container animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="signin-btn"
              type="submit"
              disabled={credLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-primary hover:opacity-90 active:scale-[0.98] transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {credLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {isRegistering ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                isRegistering ? "Sign Up" : "Sign In"
              )}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
                className="text-xs text-primary hover:underline font-semibold"
              >
                {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Create one"}
              </button>
            </div>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-outline-variant" />
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
              or
            </span>
            <div className="flex-1 h-px bg-outline-variant" />
          </div>

          {/* ── Google Sign In ── */}
          <button
            id="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-outline-variant bg-white hover:bg-surface-container-low hover:border-primary/30 hover:shadow-md active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {googleLoading ? (
              <RefreshCw className="w-4 h-4 text-on-surface-variant animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            )}
            <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </button>

          {/* Trust indicators */}
          <div className="mt-6 space-y-2">
            {[
              { icon: Globe, text: "Secure, encrypted sign-in" },
              { icon: Zap, text: "No personal data stored locally" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Terms */}
          <p className="text-xs text-on-surface-variant mt-6 text-center leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

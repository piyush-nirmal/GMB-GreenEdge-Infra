"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Bell, Shield, CreditCard, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Globe },
] as const;

type Tab = (typeof tabs)[number]["id"];

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
const labelClass = "block text-sm font-semibold text-on-surface mb-1.5";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Alex Rivera", email: "alex@riverasplumbing.com", phone: "(312) 555-0192", company: "Rivera's Plumbing" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary">Settings</h2>
        <p className="text-on-surface-variant mt-1">Manage your account preferences and integrations.</p>
      </div>

      <div className="flex gap-8">
        {/* Tab Sidebar */}
        <aside className="w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  activeTab === id
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:bg-surface-container"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Tab Content */}
        <div className="flex-1 bg-white rounded-xl border border-outline-variant p-8 animate-fade-in">
          {activeTab === "profile" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
              <h3 className="text-lg font-semibold text-on-surface">Profile Information</h3>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Image src="https://i.pravatar.cc/64?img=10" alt="Avatar" width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
                <button type="button" className="px-4 py-2 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Full Name</label>
                  <input {...register("name")} className={inputClass} />
                  {errors.name && <p className="text-xs text-error mt-1">{errors.name.message}</p>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Email Address</label>
                  <input {...register("email")} type="email" className={inputClass} />
                  {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input {...register("phone")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input {...register("company")} className={inputClass} />
                </div>
              </div>

              <button
                type="submit"
                className={cn(
                  "px-6 py-2.5 rounded-xl font-semibold text-sm transition-all",
                  saved
                    ? "bg-emerald-500 text-white"
                    : "bg-primary text-white hover:opacity-90 active:scale-95"
                )}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 max-w-lg">
              <h3 className="text-lg font-semibold text-on-surface">Notification Preferences</h3>
              {[
                ["New Reviews", "Get notified when you receive a new customer review"],
                ["Post Published", "Confirmation when a scheduled post goes live"],
                ["SEO Score Updates", "Weekly SEO score report and changes"],
                ["Competitor Alerts", "When competitors change rankings significantly"],
                ["Critical Issues", "Immediately when critical SEO issues are detected"],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start justify-between gap-4 py-3 border-b border-outline-variant last:border-0">
                  <div>
                    <p className="font-semibold text-sm text-on-surface">{title}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-outline-variant peer-checked:bg-primary rounded-full peer transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6 max-w-lg">
              <h3 className="text-lg font-semibold text-on-surface">Billing & Subscription</h3>
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                <p className="text-sm font-semibold opacity-80">Current Plan</p>
                <p className="text-3xl font-bold mt-1">Pro Plan</p>
                <p className="text-sm opacity-80 mt-1">$49/month · Billed monthly</p>
                <button className="mt-4 px-4 py-2 bg-white text-primary text-sm font-bold rounded-xl hover:bg-white/90 transition-colors">
                  Manage Subscription
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-on-surface">Plan Features</p>
                {["Up to 10 locations", "AI content generation", "Competitor tracking", "Priority support", "White-label reports"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="text-emerald-600">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 max-w-lg">
              <h3 className="text-lg font-semibold text-on-surface">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 py-4 border-b border-outline-variant">
                  <div>
                    <p className="font-semibold text-sm text-on-surface">Two-Factor Authentication</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-outline-variant peer-checked:bg-primary rounded-full peer transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                  </label>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-on-surface">Change Password</p>
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label className={labelClass}>{label}</label>
                      <input type="password" className={inputClass} placeholder="••••••••" />
                    </div>
                  ))}
                  <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-95">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6 max-w-lg">
              <h3 className="text-lg font-semibold text-on-surface">Integrations</h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Google Business Profile",
                    description: "Connect to manage your GMB listings, posts, and reviews.",
                    status: "connected",
                    color: "bg-emerald-50 text-emerald-700",
                  },
                  {
                    name: "Facebook Pages",
                    description: "Publish posts and monitor reviews on Facebook.",
                    status: "not connected",
                    color: "bg-surface-container text-on-surface-variant",
                  },
                  {
                    name: "Instagram Business",
                    description: "Schedule and publish content to Instagram.",
                    status: "not connected",
                    color: "bg-surface-container text-on-surface-variant",
                  },
                  {
                    name: "Google Search Console",
                    description: "Pull analytics data directly from Search Console.",
                    status: "connected",
                    color: "bg-emerald-50 text-emerald-700",
                  },
                ].map((integ) => (
                  <div key={integ.name} className="flex items-center justify-between gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-on-surface">{integ.name}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{integ.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${integ.color}`}>
                        {integ.status}
                      </span>
                      <button className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                        {integ.status === "connected" ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

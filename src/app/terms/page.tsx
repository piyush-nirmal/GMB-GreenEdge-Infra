import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-on-surface">Terms of Service</h1>
          <p className="text-on-surface-variant">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant p-8 space-y-6 text-sm text-on-surface-variant leading-relaxed">
          {[
            { title: "1. Acceptance of Terms", body: "By accessing and using GMB SEO Autopilot, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service." },
            { title: "2. Use of Service", body: "GMB SEO Autopilot provides tools for managing Google Business Profiles, generating AI content, tracking SEO performance, and managing customer reviews. You agree to use the service only for lawful purposes and in accordance with these terms." },
            { title: "3. Account Responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. You are responsible for all activities that occur under your account." },
            { title: "4. Data and Privacy", body: "Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. By using our service, you consent to our data practices as described in our Privacy Policy." },
            { title: "5. Intellectual Property", body: "The service and its original content, features, and functionality are owned by GMB SEO Autopilot and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws." },
            { title: "6. Limitation of Liability", body: "GMB SEO Autopilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service." },
            { title: "7. Changes to Terms", body: "We reserve the right to modify these terms at any time. We will notify you of significant changes via email or a prominent notice on our platform. Your continued use of the service after such notification constitutes acceptance of the new terms." },
          ].map(({ title, body }) => (
            <div key={title} className="space-y-2">
              <h2 className="text-base font-bold text-on-surface">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

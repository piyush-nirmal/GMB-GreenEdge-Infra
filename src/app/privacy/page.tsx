import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-on-surface">Privacy Policy</h1>
          <p className="text-on-surface-variant">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant p-8 space-y-6 text-sm text-on-surface-variant leading-relaxed">
          {[
            { title: "1. Information We Collect", body: "We collect information you provide directly to us, such as when you create an account, connect your Google Business Profile, or contact us for support. This may include your name, email address, business information, and profile data." },
            { title: "2. How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, to send you technical notices and support messages, and to respond to your comments and questions." },
            { title: "3. Google Data", body: "When you connect your Google Business Profile, we access data only with your explicit authorization via Google OAuth. We use this data solely to provide the GMB SEO Autopilot service features and do not sell your Google data to third parties." },
            { title: "4. Data Security", body: "We take reasonable measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit using TLS and at rest using AES-256 encryption." },
            { title: "5. Data Retention", body: "We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by contacting our support team." },
            { title: "6. Third-Party Services", body: "Our service integrates with third-party services including Google, Facebook, and others. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these third parties." },
            { title: "7. Contact Us", body: "If you have any questions about this Privacy Policy, please contact us at privacy@gmbseoautopilot.com or through the Settings page in your account." },
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

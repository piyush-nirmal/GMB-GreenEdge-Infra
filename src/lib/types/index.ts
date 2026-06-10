// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "owner" | "admin" | "member";
  plan: "free" | "pro" | "agency";
  createdAt: string;
}

// ─── Business ─────────────────────────────────────────────────────────────────
export type GmbStatus = "connected" | "disconnected" | "pending";

export interface Business {
  id: string;
  name: string;
  domain: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  category: string;
  gmbStatus: GmbStatus;
  seoScore: number;
  reviewCount: number;
  avgRating: number;
  createdAt: string;
}

// ─── Post ─────────────────────────────────────────────────────────────────────
export type PostStatus = "published" | "scheduled" | "draft" | "failed";
export type PostType = "update" | "offer" | "event" | "product";

export interface Post {
  id: string;
  businessId: string;
  title: string;
  content: string;
  imageUrl?: string;
  status: PostStatus;
  type: PostType;
  scheduledAt: string;
  publishedAt?: string;
  clicks: number;
  views: number;
  createdAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────
export type ReviewSentiment = "positive" | "neutral" | "negative";

export interface Review {
  id: string;
  businessId: string;
  authorName: string;
  authorAvatarUrl: string;
  rating: number; // 1–5
  content: string;
  sentiment: ReviewSentiment;
  replied: boolean;
  replyContent?: string;
  publishedAt: string;
  source: "google" | "yelp" | "facebook";
}

// ─── Competitor ───────────────────────────────────────────────────────────────
export interface Competitor {
  id: string;
  businessId: string;
  name: string;
  domain: string;
  seoScore: number;
  keywordsTop3: number;
  estimatedMonthlyTraffic: number;
  backlinkStrength: 1 | 2 | 3 | 4; // out of 4 bars
  isYou: boolean;
}

// ─── SEO Score ────────────────────────────────────────────────────────────────
export type IssueSeverity = "critical" | "high" | "recommended" | "passed";
export type IssueCategory =
  | "indexability"
  | "on-page"
  | "local-seo"
  | "performance"
  | "mobile"
  | "backlinks";

export interface SeoIssue {
  id: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  category: IssueCategory;
  actionLabel: string;
}

export interface SeoScore {
  id: string;
  businessId: string;
  overallScore: number;
  indexability: number;
  mobilePassed: boolean;
  lcpSeconds: number;
  clsScore: number;
  onPageScore: number;
  localCitations: number;
  inconsistentNapCount: number;
  issues: SeoIssue[];
  updatedAt: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export interface AnalyticsDataPoint {
  month: string;
  organicTraffic: number;
  clicks: number;
  impressions: number;
  conversions: number;
}

export interface AnalyticsData {
  businessId: string;
  period: "7d" | "30d" | "90d" | "12m";
  dataPoints: AnalyticsDataPoint[];
  totalTraffic: number;
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
}

// ─── KPI Metric ───────────────────────────────────────────────────────────────
export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: number; // positive = up, negative = down
  changeLabel: string;
  icon: string; // lucide icon name
  color: "primary" | "secondary" | "success" | "warning" | "error";
}

// ─── Activity Feed ────────────────────────────────────────────────────────────
export type ActivityType =
  | "post_published"
  | "review_received"
  | "seo_score_updated"
  | "scan_completed"
  | "competitor_alert";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  businessName: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

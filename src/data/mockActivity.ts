import { ActivityItem } from "@/lib/types";

export const mockActivity: ActivityItem[] = [
  {
    id: "act-001",
    type: "review_received",
    title: "New 5-star review",
    description: "Maria Thompson left a new review on Rivera's Plumbing",
    timestamp: "2024-07-10T14:22:00Z",
    businessName: "Rivera's Plumbing",
  },
  {
    id: "act-002",
    type: "post_published",
    title: "Post published successfully",
    description: "\"Summer Plumbing Special\" post went live on Google Business Profile",
    timestamp: "2024-07-10T09:00:00Z",
    businessName: "Rivera's Plumbing",
  },
  {
    id: "act-003",
    type: "seo_score_updated",
    title: "SEO Score improved",
    description: "SEO Score increased by 4 points to 82/100 after sitemap fix",
    timestamp: "2024-07-09T16:45:00Z",
    businessName: "Rivera's Plumbing",
  },
  {
    id: "act-004",
    type: "scan_completed",
    title: "Website scan completed",
    description: "Full SEO scan of riveras-plumbing-chicago.com completed. 3 critical issues found.",
    timestamp: "2024-07-09T11:30:00Z",
    businessName: "Rivera's Plumbing",
  },
  {
    id: "act-005",
    type: "competitor_alert",
    title: "Competitor ranking alert",
    description: "Chicago Rooter Pros moved up 2 positions for 'Chicago plumber' keyword",
    timestamp: "2024-07-08T08:15:00Z",
    businessName: "Rivera's Plumbing",
  },
  {
    id: "act-006",
    type: "review_received",
    title: "New 1-star review needs attention",
    description: "Robert Chen left a critical review on Windy City Drainage",
    timestamp: "2024-07-07T17:30:00Z",
    businessName: "Windy City Drainage",
  },
];

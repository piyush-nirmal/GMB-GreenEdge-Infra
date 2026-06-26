import { SeoScore } from "@/lib/types";

export const mockSeoScore: SeoScore = {
  id: "seo-001",
  businessId: "biz-001",
  overallScore: 82,
  indexability: 94,
  mobilePassed: true,
  lcpSeconds: 1.8,
  clsScore: 0.05,
  onPageScore: 78,
  localCitations: 124,
  inconsistentNapCount: 12,
  issues: [
    {
      id: "issue-001",
      title: "Broken internal links detected (404 Errors)",
      description:
        "6 URLs are returning 404 status codes, hindering crawler efficiency and user experience.",
      severity: "critical",
      category: "indexability",
      actionLabel: "Fix Now",
    },
    {
      id: "issue-002",
      title: "Duplicate H1 Tags on Home Page",
      description:
        "Multiple H1 tags dilute keyword relevance. Ensure only one primary H1 exists per page.",
      severity: "critical",
      category: "on-page",
      actionLabel: "View Details",
    },
    {
      id: "issue-003",
      title: "GMB Profile Sync Error",
      description:
        "Website phone number does not match Google Business Profile. Critical for Local Pack ranking.",
      severity: "critical",
      category: "local-seo",
      actionLabel: "Sync NAP",
    },
    {
      id: "issue-004",
      title: "Missing meta descriptions on 3 pages",
      description:
        "Pages without meta descriptions may display poorly in search results, reducing CTR.",
      severity: "high",
      category: "on-page",
      actionLabel: "Add Descriptions",
    },
    {
      id: "issue-005",
      title: "Images missing alt text",
      description:
        "14 images are missing alt attributes, affecting accessibility and image search rankings.",
      severity: "high",
      category: "on-page",
      actionLabel: "Add Alt Text",
    },
    {
      id: "issue-006",
      title: "Page speed could be improved",
      description:
        "Desktop LCP is 2.4s, above the recommended 2.0s threshold. Consider optimizing images.",
      severity: "recommended",
      category: "performance",
      actionLabel: "Optimize",
    },
    {
      id: "issue-007",
      title: "Schema markup missing on service pages",
      description:
        "Adding LocalBusiness schema can improve rich snippet visibility in local searches.",
      severity: "recommended",
      category: "local-seo",
      actionLabel: "Add Schema",
    },
    {
      id: "issue-008",
      title: "HTTPS configured correctly",
      description: "All pages are served over HTTPS with a valid SSL certificate.",
      severity: "passed",
      category: "performance",
      actionLabel: "View",
    },
    {
      id: "issue-009",
      title: "Mobile Core Web Vitals passing",
      description: "LCP: 1.8s, CLS: 0.05 — both within Google's recommended thresholds.",
      severity: "passed",
      category: "mobile",
      actionLabel: "View",
    },
    {
      id: "issue-010",
      title: "Sitemap submitted to Google Search Console",
      description: "Sitemap is valid and has been accepted by Google Search Console.",
      severity: "passed",
      category: "indexability",
      actionLabel: "View",
    },
  ],
  updatedAt: "2024-07-10T11:30:00Z",
};

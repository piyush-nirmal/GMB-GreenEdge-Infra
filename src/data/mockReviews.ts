import { Review } from "@/lib/types";

export const mockReviews: Review[] = [
  {
    id: "rev-001",
    businessId: "biz-001",
    authorName: "Maria Thompson",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=1",
    rating: 5,
    content:
      "Rivera's team arrived within the hour and fixed our burst pipe before it caused major damage. Incredible service! The technician was professional, clean, and explained everything clearly.",
    sentiment: "positive",
    replied: true,
    replyContent:
      "Thank you so much, Maria! We're thrilled we could help you quickly. Your satisfaction is our top priority!",
    publishedAt: "2024-07-08T14:22:00Z",
    source: "google",
  },
  {
    id: "rev-002",
    businessId: "biz-001",
    authorName: "James Kowalski",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=2",
    rating: 4,
    content:
      "Good service overall. Fixed the kitchen faucet properly. The only downside was the wait time (about 3 hours), but the technician was very skilled once he arrived.",
    sentiment: "positive",
    replied: false,
    publishedAt: "2024-07-05T10:11:00Z",
    source: "google",
  },
  {
    id: "rev-003",
    businessId: "biz-001",
    authorName: "Sandra Patel",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=3",
    rating: 2,
    content:
      "Disappointed with the pricing. Was quoted one amount over the phone and charged nearly 40% more on arrival. The work was fine but the surprise cost was frustrating.",
    sentiment: "negative",
    replied: true,
    replyContent:
      "Hi Sandra, we sincerely apologize for the pricing confusion. We'd love to make this right — please contact us directly.",
    publishedAt: "2024-07-02T16:45:00Z",
    source: "google",
  },
  {
    id: "rev-004",
    businessId: "biz-001",
    authorName: "Carlos Vega",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=4",
    rating: 5,
    content:
      "Best plumber in Chicago, hands down. Fixed a complicated sewer issue that three other companies couldn't solve. Fair price, fast work, and super professional.",
    sentiment: "positive",
    replied: true,
    replyContent:
      "Thank you Carlos! Sewer line issues are tricky and we're so glad our team could deliver for you!",
    publishedAt: "2024-06-28T09:33:00Z",
    source: "google",
  },
  {
    id: "rev-005",
    businessId: "biz-001",
    authorName: "Linda Zhao",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=5",
    rating: 3,
    content:
      "Service was average. The job got done but nothing special. Would use them again if no one else is available but wouldn't go out of my way to recommend.",
    sentiment: "neutral",
    replied: false,
    publishedAt: "2024-06-20T12:00:00Z",
    source: "yelp",
  },
  {
    id: "rev-006",
    businessId: "biz-001",
    authorName: "David Monroe",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=6",
    rating: 5,
    content:
      "Fast, professional, and very reasonably priced. Fixed our water heater in under 2 hours. Will definitely call them again!",
    sentiment: "positive",
    replied: false,
    publishedAt: "2024-06-15T08:20:00Z",
    source: "google",
  },
  {
    id: "rev-007",
    businessId: "biz-002",
    authorName: "Amy Fischer",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=7",
    rating: 4,
    content:
      "Windy City did a great job clearing our basement drain. On time, professional, and the price was fair. Will recommend to neighbors.",
    sentiment: "positive",
    replied: true,
    replyContent:
      "Thank you, Amy! Happy to help and we appreciate the referral!",
    publishedAt: "2024-07-01T11:00:00Z",
    source: "google",
  },
  {
    id: "rev-008",
    businessId: "biz-002",
    authorName: "Robert Chen",
    authorAvatarUrl: "https://i.pravatar.cc/40?img=8",
    rating: 1,
    content:
      "Terrible experience. Showed up 4 hours late without calling, left the worksite a mess, and the issue came back within 2 days. Do not recommend.",
    sentiment: "negative",
    replied: false,
    publishedAt: "2024-06-25T17:30:00Z",
    source: "yelp",
  },
];

import { AnalyticsData, AnalyticsDataPoint } from "@/lib/types";

const dataPoints: AnalyticsDataPoint[] = [
  {
    month: "Aug",
    organicTraffic: 820,
    clicks: 310,
    impressions: 4200,
    conversions: 18,
  },
  {
    month: "Sep",
    organicTraffic: 940,
    clicks: 380,
    impressions: 4900,
    conversions: 22,
  },
  {
    month: "Oct",
    organicTraffic: 1020,
    clicks: 420,
    impressions: 5400,
    conversions: 27,
  },
  {
    month: "Nov",
    organicTraffic: 880,
    clicks: 350,
    impressions: 4700,
    conversions: 20,
  },
  {
    month: "Dec",
    organicTraffic: 760,
    clicks: 290,
    impressions: 3900,
    conversions: 15,
  },
  {
    month: "Jan",
    organicTraffic: 700,
    clicks: 265,
    impressions: 3600,
    conversions: 12,
  },
  {
    month: "Feb",
    organicTraffic: 810,
    clicks: 310,
    impressions: 4100,
    conversions: 17,
  },
  {
    month: "Mar",
    organicTraffic: 1050,
    clicks: 440,
    impressions: 5600,
    conversions: 30,
  },
  {
    month: "Apr",
    organicTraffic: 1200,
    clicks: 510,
    impressions: 6200,
    conversions: 36,
  },
  {
    month: "May",
    organicTraffic: 1340,
    clicks: 570,
    impressions: 6900,
    conversions: 41,
  },
  {
    month: "Jun",
    organicTraffic: 1280,
    clicks: 540,
    impressions: 6600,
    conversions: 38,
  },
  {
    month: "Jul",
    organicTraffic: 1400,
    clicks: 620,
    impressions: 7400,
    conversions: 45,
  },
];

export const mockAnalytics: AnalyticsData = {
  businessId: "biz-001",
  period: "12m",
  dataPoints,
  totalTraffic: 12200,
  totalClicks: 5005,
  totalImpressions: 63500,
  avgCtr: 7.9,
  avgPosition: 4.2,
};

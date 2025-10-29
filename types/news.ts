export default interface NewsItem {
  _id: string;
  userId: string;

  type: "updates" | "news" | "testimonials" | "video stories";
  typeAccount: "freeUser" | "paidUser" | "agencyUser" | "all";
  topic: string;
  description: string | null;
  keywords: string | null;
  text: string;

  files: string[];
  createdAt: string;
}

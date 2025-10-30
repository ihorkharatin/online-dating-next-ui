// types/privateMedia.ts

export default interface PrivateMedia {
  _id: string;
  userId: string;
  totalRating: number;
  amountRating: number;
  estimation:
    | "ordinary"
    | "limited"
    | "confidential"
    | "private"
    | "very private"
    | "exclusive"
    | "premium"
    | "elite"
    | "ultimate"
    | "legendary";
  status: "active" | "disabled";
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

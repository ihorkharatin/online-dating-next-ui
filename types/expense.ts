// types/expense.ts

export default interface Expense {
  _id: string;
  paidUserId: string;
  freeUserId: string;
  agencyUserId: string;

  category:
    | "inbox"
    | "outbox"
    | "text chat"
    | "video chat"
    | "voice chat"
    | "dating room"
    | "gift"
    | "private media"
    | "sticker";

  details?: Record<string, any>;
  description?: string;
  price: number;
  paidUserCountry: string;
  freeUserCountry: string;
  count: number;

  createdAt: string;
  updatedAt: string;
}

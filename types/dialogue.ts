// types/dialogue.ts

export default interface Dialogue {
  _id: string;
  freeUserId: string;
  paidUserId: string;
  otherUserId: string[];
  status: string; // за замовчуванням "active"
  unRead: {
    paidUser: number;
    freeUser: number;
  };
}

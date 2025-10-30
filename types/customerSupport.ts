// types/customerSupport.ts

export default interface CustomerSupport {
  _id: string;
  userId: string;
  users: string[];
  typeSupport?: "agencySupport" | "paidUserSupport";
  unRead: {
    user: number;
    support: number;
  };

  createdAt: string;
  updatedAt: string;
}

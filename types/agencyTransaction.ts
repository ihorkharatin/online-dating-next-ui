// types/agencyTransaction.ts

export default interface AgencyTransaction {
  _id: string;
  agencyId: string;
  typeTransaction: "income" | "expense";
  details?: Record<string, any>;
  description?: string;
  price: number;

  createdAt: string;
  updatedAt: string;
}

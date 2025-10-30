// types/present.ts

export default interface Present {
  _id: string;
  agencyID: string;
  senderId: string;
  recipientId: string;
  orderDate: string; // ISO-дата створення замовлення
  deliveredDate?: string; // може бути відсутня, якщо ще не доставлено
  status: "Created" | "Pending" | "Delivered" | "Declined" | "Undelivered";
  priceCoins: number;
  priceEur: number;
  senderMessage: string;
  recipientMessage?: string;
  giftsList: string[]; // список подарунків (масив)
  deliveredPhoto: string[]; // фото з доставкою
}

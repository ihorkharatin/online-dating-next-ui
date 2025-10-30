// types/message.ts

export default interface Message {
  _id: string;
  chatId: string;
  text?: string;
  photos?: string[];
  videos?: string[];
  publicFiles?: string[];
  privateFiles?: string[];
  date: string; // ISO-дата (створення)
  status?: string;
  senderId?: string;
  reaction?: string;
  senderType?: string; // за замовчуванням "paidUser"
  deleteAt?: string | null;
}

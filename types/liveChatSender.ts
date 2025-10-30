// types/liveChatSender.ts

export default interface LiveChatSender {
  _id: string;
  userId: string;
  blackList: any[]; // якщо відомо, що це список ID або email — можна уточнити тип
  status: "ENABLED" | "DISABLED";
  currentMessage: number;

  createdAt: string;
  updatedAt: string;
}

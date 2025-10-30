// types/meeting.ts

export default interface Meeting {
  _id: string;
  externalMeetingId: string;
  meetingId: string;
  createdBy: string;
  createdAt?: string; // ISO-дата, створюється автоматично
  lastActivity?: string; // ISO-дата, TTL 10 хвилин (600 сек)
  status: "active" | "ended";
  meeting: Record<string, any>; // об'єкт із деталями зустрічі
}

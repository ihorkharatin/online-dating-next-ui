// types/connection.ts

export default interface Connection {
  _id: string;
  connectionId: string;
  userId: string;
  created?: string; // ISO дата, не обов’язкове при створенні
  userType: string;
  ipAddress?: string;
  lastActivity?: string; // автоматично оновлюється та має TTL 10m
}

// types/session.ts

export default interface Session {
  _id: string;
  userId: string; // ID користувача
  typeAccount: "freeUser" | "paidUser" | "agencyUser"; // Тип акаунта
  token: string; // JWT або інший токен сесії
  refreshToken?: string; // Рефреш-токен (може бути відсутній)
  tokenExpired: string; // Дата закінчення дії токена (ISO)
  refreshTokenExpired: string; // Дата закінчення дії рефреш-токена (ISO)
  typeDevice?: string; // Тип пристрою (опціонально)
  ipAddress?: string; // IP-адреса користувача (опціонально)
}

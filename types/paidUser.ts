// types/paidUser.ts

export default interface PaidUser {
  _id: string;
  name: string;
  lastName: string;
  nickname: string;
  email: string;
  gender: "Male" | "Female";
  password: string;
  typeAccount: "paidUser";
  country: string;
  city: string;
  birthday: string; // ISO-дата
  status: "Single" | "Divorced" | "Widower";

  balance: number;
  bonus: number;
  registerDate: string;
  lastActivity: string;
  isOnline: boolean;

  userListLocation: any[]; // можна уточнити, якщо це масив ID або назв міст
  userCart: any[];

  verifiedStatus: "active" | "disabled";

  zodiac?: string;
  userHair?: string;
  userEyes?: string;
  userHeight?: number;
  userWeight?: number;
  hobby?: string;
  education?: string;
  occupation?: string;
  children?: string;
  searchAgeMin?: number;
  searchAgeMax?: number;
  aboutMe?: string;
  partnerDesc?: string;

  photos: string[];
  avatar: string;
  videoAvatar?: string;
  videos: string[];
  ipInfo?: Record<string, any>;
  vip: boolean;
  freeLetterAmount: number;
}

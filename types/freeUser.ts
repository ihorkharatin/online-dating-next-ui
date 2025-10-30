// types/freeUser.ts

export default interface FreeUser {
  _id: string;
  name: string;
  lastName: string;
  nickname: string;
  email?: string;
  gender: "Male" | "Female";
  password: string;
  typeAccount: string; // завжди "freeUser"
  country: string;
  city: string;
  birthday: string; // ISO-рядок дати
  status: "Never married" | "Divorced" | "Widow" | "Widower" | "Unknown";
  hobby?: string;
  registerDate: string;
  userIsVerified: boolean;
  verifiedStatus:
    | "new"
    | "under review"
    | "unverified"
    | "verified"
    | "disabled";
  verifiedComment?: string;
  zodiac?: string;
  userHair?: string;
  userEyes?: string;
  userHeight?: number;
  userWeight?: number;
  education?: string;
  occupation?: string;
  children?: string;
  searchAgeMin?: number;
  searchAgeMax?: number;
  aboutMe?: string;
  partnerDesc?: string;
  photos: any[]; // масив URL або шляхів
  videos: any[]; // масив URL або шляхів
  agencyID?: string;
  lastActivity: string;
  isOnline: boolean;
  avatar?: string;
  videoAvatar?: string;
  passport: any[];
  passportNumber: string;
  verificationVideo: string;
  updatedPrivateMedia?: string;
}

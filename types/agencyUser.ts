// types/agencyUser.ts

export default interface AgencyUser {
  _id: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  typeAccount: string; // завжди 'agencyUser'
  registered: string; // ISO дата
  passportPhoto: string;
  contactPerson: string;
  phoneNumber: number;
  agencyAddress: string;
  lastActivity?: string; // необов’язкове поле
  balance: number;

  beneficiary: string;
  beneficiaryIdCode: string;
  beneficiaryAddress: string;
  bank: string;
  swift: string;
  bankAccount: string;
}

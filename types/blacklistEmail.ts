// types/blacklistEmail.ts

export default interface BlacklistEmail {
  _id: string;
  email: string;
  errorCode: number;
  reason: string;
  smtpError: string;
}

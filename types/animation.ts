// types/animation.ts

export default interface Animation {
  _id: string;
  fileUrl: string;
  type: "free" | "paid";
  fileType: "smile" | "sticker";
  fileCategory:
    | "General"
    | "New Year"
    | "Valentines Day"
    | "Easter"
    | "Patricks Day"
    | "Mothers Day"
    | "Fathers Day"
    | "Independence Day"
    | "Halloween"
    | "Thanksgiving Day"
    | "Black Friday"
    | "Christmas";
  price: number;

  createdAt: string;
  updatedAt: string;
}

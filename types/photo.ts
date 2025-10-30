// types/photo.ts

export default interface Photo {
  _id: string;
  userId: string;
  totalRating: number; // загальна кількість балів
  amountRating: number; // кількість оцінок
  type: "Public" | "Private"; // тип фото
  estimation:
    | "ordinary"
    | "limited"
    | "confidential"
    | "private"
    | "very private";
  photoUrl: string; // посилання на фото
  description?: string; // опціональний опис
  createdAt: string; // ISO-дата створення
  updatedAt: string; // ISO-дата оновлення
}

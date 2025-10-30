// types/video.ts

export default interface Video {
  _id: string;
  userId: string; // ID користувача, якому належить відео

  totalRating: number; // Загальна кількість балів рейтингу
  amountRating: number; // Кількість оцінок

  type: "Public" | "Private"; // Тип відео (публічне або приватне)
  estimation:
    | "ordinary"
    | "limited"
    | "confidential"
    | "private"
    | "very private"; // Рівень доступу до відео

  videoUrl: string; // Посилання на відео
  description?: string; // Опис (опціонально)

  createdAt: string; // Дата створення (timestamps)
  updatedAt: string; // Дата оновлення (timestamps)
}

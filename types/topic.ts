// types/topic.ts

export default interface Topic {
  _id: string;
  freeUserId: string; // ID безкоштовного користувача (дівчини)
  paidUserId: string; // ID платного користувача (чоловіка)
  title: string; // Назва теми або заголовок листування

  freeUserLetterAmount: number; // Кількість листів від freeUser
  paidUserLetterAmount: number; // Кількість листів від paidUser
  paidUserIsReadAmount: number; // Кількість прочитаних листів paidUser
  freeUserIsReadAmount: number; // Кількість прочитаних листів freeUser

  freeUserCategory: string; // Категорія користувача freeUser
  paidUserCategory: string; // Категорія користувача paidUser

  lastMessage: Record<string, any>; // Об’єкт із даними останнього повідомлення
  deleteAt: string | null; // Дата видалення або null
  date: string; // Дата створення теми (ISO-рядок)
  lastMessageDate?: string; // Дата останнього повідомлення (опціонально)

  createdAt: string; // ISO-дата створення (timestamps)
  updatedAt: string; // ISO-дата оновлення (timestamps)
}

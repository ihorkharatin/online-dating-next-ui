// types/purchase.ts

export default interface Purchase {
  _id: string;
  purchaseId: string; // Унікальний ідентифікатор покупки
  clientId: string; // ID клієнта, який здійснив покупку
  purchaseDate: string; // Дата покупки (ISO-формат)
  paymentMethod: "Visa" | "Master Card"; // Метод оплати
  paymentStatus: string; // Статус платежу
  paymentDescription: string; // Опис платежу
  paymentAmount: number; // Сума платежу
  coinsAmount: number; // Кількість отриманих монет
  ipAddress: string; // IP-адреса користувача
}

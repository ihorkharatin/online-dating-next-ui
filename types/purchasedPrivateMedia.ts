// types/purchasedPrivateMedia.ts

export default interface PurchasedPrivateMedia {
  _id: string;
  privateMediaId: string; // ID приватного медіа
  paidUserId: string; // ID платного користувача (покупця)
  freeUserId: string; // ID дівчини (власника)
  paidUserPrice: number; // сума, яку заплатив користувач (у кредитах)
  agencyUserPrice: number; // сума, яку отримало агентство (в євро)
  createdAt: string; // ISO-дата створення
  updatedAt: string; // ISO-дата оновлення
}

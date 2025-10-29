import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

// ▪ Створити покупку приватного медіа
export const createPurchasedPrivateMedia = async data => {
  const res = await axios.post(`${baseURL}/purchased-private-media`, data);
  return res.data;
};

// ▪ Отримати всі покупки приватного медіа (можна передати фільтри, наприклад по paidUserId)
export const getAllPurchasedPrivateMedia = async (filters = {}) => {
  const res = await axios.get(`${baseURL}/purchased-private-media`, {
    params: filters,
  });
  return res.data;
};

// ▪ Отримати покупку за id
export const getPurchasedPrivateMediaById = async (id, userId) => {
  const res = await axios.get(`${baseURL}/purchased-private-media/${id}`, {
    params: {
      userId,
    },
  });
  return res.data;
};
export const getPurchasedPrivateMediaByIds = async privateMediaIds => {
  const body = { privateMediaIds };
  const res = await axios.post(
    `${baseURL}/purchased-private-media/by-ids`,
    body,
  );
  return res.data;
};

// ▪ Оновити покупку
export const updatePurchasedPrivateMedia = async (id, data) => {
  const res = await axios.put(`${baseURL}/purchased-private-media/${id}`, data);
  return res.data;
};

// ▪ Видалити покупку
export const deletePurchasedPrivateMedia = async id => {
  const res = await axios.delete(`${baseURL}/purchased-private-media/${id}`);
  return res.data;
};

// ▪ Отримати всі куплені медіа для конкретного paidUser
export const getPurchasedPrivateMediaByPaidUser = async (
  paidUserId,
  page = 1,
  perPage = 100,
) => {
  const res = await axios.get(`${baseURL}/purchased-private-media`, {
    params: { paidUserId, page, perPage },
  });
  return res.data;
};

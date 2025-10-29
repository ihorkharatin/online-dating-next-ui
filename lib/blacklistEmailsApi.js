import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

export async function getBlackListEmail(email) {
  const res = await axios.get(baseURL + `/blacklist-emails/${email}`);
  return res.data;
}
export async function createBlackListEmail(data) {
  const res = await axios.post(baseURL + `/blacklist-emails`, data);

  return res.data;
}
export async function deleteBlackListEmail(id) {
  const res = await axios.delete(baseURL + `/blacklist-emails/${id}`);

  return res.data;
}

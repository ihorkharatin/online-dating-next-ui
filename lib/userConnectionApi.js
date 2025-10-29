import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

export async function getUserIdConnection(userId) {
  const res = await axios.get(baseURL + `/online-connection/info`, {
    params: { userId },
  });
  return res.data;
}
export async function getUserIPInfo() {
  const res = await axios.get('https://api.ipapi.com/api/check', {
    params: { access_key: '36caaf531383b8f7726b8a1253f25747' },
  });
  return res.data;
}

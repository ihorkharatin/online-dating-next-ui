import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

export async function getAllAnimation() {
  const res = await axios.get(baseURL + '/animations');
  return res.data;
}
export async function createAnimation(data) {
  const res = await axios.post(baseURL + `/animations`, data);

  return res.data;
}
export async function deleteAnimations(id) {
  const res = await axios.delete(baseURL + `/animations/${id}`);

  return res.data;
}

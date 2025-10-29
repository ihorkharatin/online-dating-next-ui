import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

export const getFans = async userId => {
  const res = await axios.get(baseURL + `/fans/${userId}`);
  return res.data;
};
export const removeFan = async userId => {
  const res = await axios.delete(baseURL + `/fans/${userId}`);
  return res.data;
};
export const createFan = async data => {
  const res = await axios.post(baseURL + `/fans`, data);
  return res.data;
};

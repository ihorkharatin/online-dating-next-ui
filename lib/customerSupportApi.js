import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import axios from 'axios';

const SUPPORT_URL = BASE_URL_MAIN_SERVER + '/support';

export const createSupport = async data => {
  const response = await axios.post(SUPPORT_URL, data);
  return response.data;
};
export const getAllSupport = async params => {
  const response = await axios.get(SUPPORT_URL, { params });
  return response.data;
};
export const getSupportById = async id => {
  const response = await axios.get(`${SUPPORT_URL}/${id}`);
  return response.data;
};
export const updateSupport = async (id, data) => {
  const response = await axios.put(`${SUPPORT_URL}/${id}`, data);
  return response.data;
};
export const deleteSupport = async id => {
  const response = await axios.delete(`${SUPPORT_URL}/${id}`);
  return response.data;
};

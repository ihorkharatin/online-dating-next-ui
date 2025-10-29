import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

export const getPresents = async (filters = {}, pagination = {}) => {
  const params = {
    ...filters,
    page: pagination.page || 1,
    perPage: pagination.perPage || 10,
  };
  const res = await axios.get(baseURL + `/presents`, { params });
  return res.data;
};

export const getPresent = async id => {
  const res = await axios.get(baseURL + `/presents/${id}`);
  return res.data;
};

export const createPresent = async data => {
  const res = await axios.post(baseURL + `/presents`, data);
  return res.data;
};

export const updatePresent = async (id, data) => {
  const res = await axios.put(baseURL + `/presents/${id}`, data);
  return res.data;
};

export const updateStatus = async (id, status) => {
  const res = await axios.patch(baseURL + `/presents/${id}/status`, { status });
  return res.data;
};

export const deletePresent = async id => {
  const res = await axios.delete(baseURL + `/presents/${id}`);
  return res.data;
};

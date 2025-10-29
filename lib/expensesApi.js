import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

export const fetchAllExpenses = async params => {
  try {
    const response = await axios.get(`${baseURL}/expenses`, {
      params: {
        page: 1,
        perPage: 20,
        ...params,
      },
    });
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency users:', error);
    throw error;
  }
};

export const fetchAllCoinsExpenses = async params => {
  try {
    const response = await axios.get(`${baseURL}/expenses/coins`, { params });
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency users:', error);
    throw error;
  }
};

export const createExpenses = async data => {
  try {
    const response = await axios.post(`${baseURL}/expenses`, data);
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency users:', error);
    throw error;
  }
};

export const getAllAgencyPayout = async params => {
  try {
    const response = await axios.get(`${baseURL}/agency/payout/all`, {
      params,
    });
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency payout:', error);
    throw error;
  }
};
export const createAgencyTransaction = async transaction => {
  try {
    const response = await axios.post(
      `${baseURL}/agency/transaction`,
      transaction,
    );
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency payout:', error);
    throw error;
  }
};

export const deleteAgencyTransaction = async transactionId => {
  try {
    const response = await axios.delete(
      `${baseURL}/agency/transaction/${transactionId}`,
    );
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency payout:', error);
    throw error;
  }
};

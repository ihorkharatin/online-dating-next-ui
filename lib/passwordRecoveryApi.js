// src/api/passwordRecoveryApi.js
import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

/**
 * Send password recovery request
 * @param {string} email - user's email address
 * @returns {Promise<Object>} API response
 */
export const sendPasswordRecovery = async email => {
  try {
    const url = `${BASE_URL_MAIN_SERVER}/paid-user/password-recovery`;

    const res = await axios.post(url, { email });
    return res.data;
  } catch (error) {
    console.error('Error sending password recovery request:', error);
    throw error;
  }
};

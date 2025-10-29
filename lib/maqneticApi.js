import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const PAYMENT_URL =
  'https://z0ukljuy6c.execute-api.us-east-2.amazonaws.com/dev/payment';

export const createPaymentUrl = async params => {
  params.descriptor = window.location.hostname;
  params.callback = window.location.origin + '/man-user/statistics';
  params.callbackError = window.location.origin + '/man-user/statistics';
  const res = await axios.post(PAYMENT_URL, params);
  return res.data;
};

export const getAllPayments = async params => {
  const url = `${BASE_URL_MAIN_SERVER}/purchase`;
  const res = await axios.get(url, { params });
  return res.data;
};

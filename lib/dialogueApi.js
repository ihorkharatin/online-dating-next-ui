import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

export const getDialogueList = async params => {
  const END_POINT = '/dialogue';
  const url = BASE_URL_MAIN_SERVER + END_POINT;

  const response = await axios.get(url, { params });
  return response.data;
};
export const getDialogueUsers = async ({ userId, typeAccount }) => {
  const END_POINT = '/dialogue/users';
  const url = BASE_URL_MAIN_SERVER + END_POINT;

  const response = await axios.get(url, { params: { userId, typeAccount } });
  return response.data;
};

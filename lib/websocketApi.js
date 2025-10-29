import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import axios from 'axios';

const MESSAGE_URL = BASE_URL_MAIN_SERVER + '/websocket';

export const sendWSData = async ({ users, data, action, ...otherProps }) => {
  const response = await axios.post(MESSAGE_URL, {
    users,
    data,
    action,
    ...otherProps,
  });

  return response.data;
};

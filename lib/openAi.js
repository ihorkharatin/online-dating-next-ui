import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import axios from 'axios';

const MESSAGE_URL = BASE_URL_MAIN_SERVER + '/openAi';

export const openAiRequest = async message => {
  if (!message.trim()) {
    return 'Your message is empty!';
  }
  const response = await axios.post(MESSAGE_URL, {
    message,
  });

  return response.data;
};

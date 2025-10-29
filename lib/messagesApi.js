import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import axios from 'axios';
import { updateTopicAmount } from './topicApi';

const MESSAGE_URL = BASE_URL_MAIN_SERVER + '/messages';

export const createMessage = async ({
  message,
  users,
  type,
  updateTopic = false,
}) => {
  const response = await axios.post(MESSAGE_URL, {
    message,
    recipients: users,
    typeMessage: type,
    updateTopic,
  });

  return response.data;
};

export const simplyCreateMessage = async message => {
  const response = await axios.post(MESSAGE_URL, {
    message,
    onlyCreate: true,
  });

  return response.data;
};

export const getMessages = async userData => {
  const params = {
    perPage: 10,
    ...userData,
  };

  const response = await axios.get(MESSAGE_URL, { params });

  return response.data;
};
export const updateMessage = async ({ id, ...message }) => {
  const response = await axios.put(`${MESSAGE_URL}/${id}`, message);
  updateTopicAmount(message.chatId, message.senderId);
  return response.data;
};

export const deleteMessage = async id => {
  const response = await axios.delete(`${MESSAGE_URL}/${id}`);

  return response.data;
};

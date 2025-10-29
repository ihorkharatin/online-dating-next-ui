import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import axios from 'axios';

const TOPIC_URL = BASE_URL_MAIN_SERVER + '/topic';

export const createTopic = async ({ freeUserId, paidUserId, title }) => {
  const response = await axios.post(TOPIC_URL, {
    freeUserId,
    paidUserId,
    title,
  });
  return response.data;
};

export const getTopicList = async (params, options = {}) => {
  const response = await axios.get(TOPIC_URL, {
    params,
    ...options,
  });

  return response.data;
};

export const getTopic = async topicId => {
  const response = await axios.get(TOPIC_URL + `/${topicId}`);
  return response.data;
};

export const updateTopic = async ({ topicId, data }) => {
  const response = await axios.put(TOPIC_URL + `/${topicId}`, data);
  return response.data;
};

export const updateTopicAmount = async (topicId, senderId) => {
  const response = await axios.put(TOPIC_URL + `/${topicId}/amount`, {
    senderId,
  });
  return response.data;
};

export const deleteTopic = async ({ topicId }) => {
  const response = await axios.delete(TOPIC_URL + `/${topicId}`);
  return response.data;
};

export const getLetterStatistics = async (params, options = {}) => {
  const response = await axios.get(TOPIC_URL + '/statistics', {
    params,
    ...options,
  });

  return response.data;
};

export const mailSender = async data => {
  const response = await axios.post(TOPIC_URL + '/mail-sender', data);
  return response.data;
};

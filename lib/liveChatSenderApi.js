import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import { deleteMessage, simplyCreateMessage } from './messagesApi';

const BASE_URL = `${BASE_URL_MAIN_SERVER}/live-chat-sender`;

// Get templates (with optional pagination and filtering by userId)
export const getLiveChatSender = async userId => {
  const params = { userId };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

// Update a template by ID
export const updateLiveChatSender = async (templateId, updateData) => {
  const response = await axios.put(`${BASE_URL}/${templateId}`, updateData);
  return response.data;
};

// Delete a template by ID
export const deleteLiveChatSender = async templateId => {
  const response = await axios.delete(`${BASE_URL}/${templateId}`);
  return response.data;
};

// ✅ Toggle AWS sender rule status
export const toggleAWSSenderStatus = async ({ userId, status }) => {
  const response = await axios.patch(`${BASE_URL}/aws-status`, {
    userId,
    status,
  });
  return response.data;
};

export const createTemplate = message => {
  return simplyCreateMessage({ ...message, chatId: 'template' });
};

export const deleteTemplate = id => {
  return deleteMessage(id);
};

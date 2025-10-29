import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import { uploadFiles } from './filesApi';
import { validateUserId } from '../helpers/validateUserId';
import { supportAccount } from '../helpers/supportAccount';

const baseURL = BASE_URL_MAIN_SERVER;

export async function signUpPaidUser(paidUser) {
  const res = await axios.post(baseURL + '/paid-user', paidUser);
  return res.data;
}
export async function getAllPaidUsers(params) {
  const res = await axios.get(baseURL + '/paid-user', { params });
  return res.data;
}

// 📁 api/paidUsers.js
export const getPaidUsersByIds = async (ids = []) => {
  const response = await axios.post('/paid-user/by-ids', { ids });
  return response.data;
};

export async function getPaidUser(userId) {
  userId = validateUserId(userId);
  const user = getUserFromStorage(userId);
  if (user) {
    return user;
  }
  const res = await axios.get(baseURL + `/paid-user/${userId}`);
  saveUserToStorage(res.data);
  return res.data;
}

export async function getFreeUser(userId) {
  userId = validateUserId(userId);
  const user = getUserFromStorage(userId);
  if (user) {
    return user;
  }

  const res = await axios.get(baseURL + `/free-user/${userId}`);
  saveUserToStorage(res.data);
  return res.data;
}
const getUserFromStorage = userId => {
  const data = sessionStorage.getItem(userId);
  try {
    const user = JSON.parse(data);
    return user;
  } catch (error) {
    return;
  }
};
const saveUserToStorage = user => {
  sessionStorage.setItem(user._id, JSON.stringify(user));
};

export const fetchUser = async userId => {
  if (userId === 'support') {
    return supportAccount;
  }
  userId = validateUserId(userId);
  const paidUserPromise = getPaidUser(userId);
  const freeUserPromise = getFreeUser(userId);
  const result = await Promise.allSettled([paidUserPromise, freeUserPromise]);
  const array = result.filter(el => el?.value);
  return array[0]?.value;
};

export const uploadPaidUserAvatar = async (data, user) => {
  const file = data.get('avatar');
  const files = [file];
  const propName = file.type.includes('image') ? 'avatar' : 'videoAvatar';
  const secondPropName = !file.type.includes('image')
    ? 'avatar'
    : 'videoAvatar';
  const url = await uploadFiles({ files, user });
  const newUser = await updatePaidUser(
    {
      [propName]: url[0].url,
      [secondPropName]: '',
    },
    user._id,
  );

  sessionStorage.setItem(newUser._id, JSON.stringify(newUser));
  return newUser;
};

export const updatePaidUser = async (data, userId) => {
  const res = await axios.put(baseURL + `/paid-user/${userId}`, data);
  saveUserToStorage(res.data);
  return res.data;
};

export const getOnlinePaidUsers = async () => {
  const params = {
    userType: 'paidUser',
  };
  const res = await axios.get(baseURL + '/paid-user/online', { params });
  const users = res.data.sort((firstUser, secondUser) => {
    const date1 = new Date(firstUser.lastActivity);
    const date2 = new Date(secondUser.lastActivity);
    return date2 - date1;
  });

  return users;
};

export const validCredentialsPaidUser = async params => {
  const res = await axios.get(baseURL + '/paid-user/credentials', { params });
  return res.data;
};

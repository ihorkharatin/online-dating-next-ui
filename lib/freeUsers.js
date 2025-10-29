import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';
import { uploadFiles } from './filesApi';

const baseURL = BASE_URL_MAIN_SERVER;

export async function signUpFreeUser(freeUser) {
  const res = await axios.post(baseURL + '/free-user', freeUser);
  return res.data;
}
export async function updateFreeUser(userId, freeUser) {
  const res = await axios.put(baseURL + `/free-user/${userId}`, freeUser);
  sessionStorage.setItem(userId, JSON.stringify(res.data));
  return res.data;
}

export const getOnlineFreeUsers = async ({ page = 1, perPage = 100 } = {}) => {
  const params = {
    userType: 'freeUser',
    page,
    perPage,
  };
  const res = await axios.get(baseURL + '/free-user/online', { params });

  return res.data;
};

export async function getAllFreeUsers(params) {
  const res = await axios.get(baseURL + '/free-user', { params });
  return res.data;
}

// 📁 api/freeUsers.js
export const getFreeUsersByIds = async (ids = []) => {
  const response = await axios.post('/free-user/by-ids', { ids });
  return response.data;
};

export const uploadFreeUserAvatar = async (data, user) => {
  const file = data.get('avatar');
  const files = [file];
  const propName = file.type.includes('image') ? 'avatar' : 'videoAvatar';
  const secondPropName = !file.type.includes('image')
    ? 'avatar'
    : 'videoAvatar';
  const url = await uploadFiles({ files, user });
  const newUser = await updateFreeUser(user._id, {
    [propName]: url[0].url,
    [secondPropName]: '',
  });
  sessionStorage.setItem(user._id, JSON.stringify(newUser));
  return newUser;
};

// Function to update user verification status
export const updateUserVerificationStatus = async (
  userId,
  status,
  verifiedComment,
) => {
  try {
    const response = await axios.put(`/free-user/${userId}`, {
      verifiedStatus: status,
      verifiedComment,
    });
    sessionStorage.setItem(userId, JSON.stringify(response.data));
    return response.data; // Return the updated user object
  } catch (error) {
    console.error('Error updating user verification status:', error.message);
    throw error;
  }
};

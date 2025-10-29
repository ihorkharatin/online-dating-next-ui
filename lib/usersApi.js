import axios from 'axios';
import { BASE_URL_MAIN_SERVER, ONE_HOUR } from '../helpers/constants';
import { supportAccount } from '../helpers/supportAccount';
import { validateUserId } from '../helpers/validateUserId';

const baseURL = BASE_URL_MAIN_SERVER;

const getUserFromStorage = userId => {
  const data = sessionStorage.getItem(userId);
  try {
    const user = JSON.parse(data);
    if (Date.now() - user.lastRequest > ONE_HOUR) {
      return;
    }
    return user;
  } catch (error) {
    return;
  }
};
const saveUserToStorage = user => {
  user.lastRequest = Date.now();
  sessionStorage.setItem(user._id, JSON.stringify(user));
};

export const getOnlineSession = async params => {
  const url = `${BASE_URL_MAIN_SERVER}/online-connection`;

  const userIdsResponse = await axios.get(url, { params });
  const userIds = userIdsResponse.data;
  return userIds;
};

export const fetchUser = async userId => {
  if (userId === 'support') {
    return supportAccount;
  }
  userId = validateUserId(userId);
  const user = getUserFromStorage(userId);
  if (user) {
    return user;
  }
  const res = await axios.get(baseURL + `/user/${userId}`);
  saveUserToStorage(res.data);
  return res.data;
};

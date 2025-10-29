import axios from 'axios';
import { AUTH_URL, BASE_URL_MAIN_SERVER } from '../helpers/constants';
import { sendWSData } from './websocketApi';
import { getUserIPInfo } from './userConnectionApi';
import { updatePaidUser } from './paidUsers';

const baseURL = AUTH_URL;
const axiosCopy = axios.create({ baseURL });

axios.defaults.baseURL = BASE_URL_MAIN_SERVER;
// axios.defaults.headers.Domain = window.location.origin;

const setHeaders = token => {
  localStorage.setItem('token', token);
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axiosCopy.defaults.headers.Authorization = `Bearer ${token}`;
};
const clearHeaders = () => {
  axios.defaults.headers.Authorization = ``;
  axiosCopy.defaults.headers.Authorization = ``;
  localStorage.removeItem('token');
};

export const login = async userdata => {
  const res = await axiosCopy.post('/login', userdata, {
    withCredentials: true,
  });
  setHeaders(res.data.token);
  if (res.data.token) {
    const { _id, name, country, typeAccount, avatar, videoAvatar } =
      res.data.user;
    const props = { freeUser: 'sendToPaidUsers', paidUser: 'sendToFreeUsers' };
    const data = { name, country, avatar, videoAvatar, _id };
    sendWSData({ data, action: 'loginUser', [props[typeAccount]]: true });
    if (typeAccount === 'paidUser') {
      try {
        const ipInfo = await getUserIPInfo();
        updatePaidUser({ ipInfo }, _id);
      } catch (error) {
        console.warn('⚠️ Не вдалося отримати IP info:', error.message);
        updatePaidUser({ ipInfo: null }, _id); // або просто нічого не робити
      }
    }
  }
  return res.data;
};

export const logout = async () => {
  const res = await axiosCopy.post(
    '/logout',
    {},
    {
      withCredentials: true,
    },
  );
  clearHeaders();
  return res.data;
};

export const refresh = async () => {
  const res = await axiosCopy.post(
    '/refresh',
    {},
    {
      withCredentials: true,
    },
  );
  setHeaders(res.data.token);
  return res.data;
};

if (localStorage.getItem('token')) {
  setHeaders(localStorage.getItem('token'));
}

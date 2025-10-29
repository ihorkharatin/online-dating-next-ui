import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

import { validateUserId } from '../helpers/validateUserId';
import { supportAccount } from '../helpers/supportAccount';

const baseURL = BASE_URL_MAIN_SERVER;

// Function to fetch all agency users
export const fetchAllAgencyUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/agency-user`);
    return response.data; // Return list of agency users
  } catch (error) {
    console.error('Error fetching agency users:', error);
    throw error;
  }
};

// Function to fetch an agency user by ID
export const fetchAgencyUserById = async id => {
  if (id === 'support') {
    return supportAccount;
  }
  try {
    id = validateUserId(id);
    // const agency = getFromLocalStorage(id);
    // if (agency) return agency;

    const response = await axios.get(`${baseURL}/agency-user/${id}`);
    // saveToLocalStorage(id, response.data);
    response.data.avatar = response.data.passportPhoto;
    return response.data;
  } catch (error) {
    console.error('Error fetching agency user by ID:', error);
    throw error;
  }
};

// Function to fetch an agency user by Nickname
export const fetchAgencyUserByNickname = async nickname => {
  try {
    const response = await axios.get(
      `${baseURL}/agency-user?nickname=${nickname}`,
    );
    return response.data; // Return agency user data
  } catch (error) {
    console.error('Error fetching agency user by nickname:', error);
    throw error;
  }
};

// Function to create a new agency user
export const createAgencyUser = async agencyUserData => {
  try {
    const response = await axios.post(
      `${baseURL}/agency-user`,
      agencyUserData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return created agency user
  } catch (error) {
    console.error('Error creating agency user:', error);
    throw error;
  }
};

// Function to update an agency user
export const updateAgencyUser = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${baseURL}/agency-user/${id}`,
      updatedData,
    );
    return response.data; // Return updated agency user
  } catch (error) {
    console.error('Error updating agency user:', error);
    throw error;
  }
};

// Function to delete an agency user
export const deleteAgencyUser = async id => {
  try {
    const response = await axios.delete(`${baseURL}/agency-user/${id}`);
    return response.data; // Return success message or deleted agency user
  } catch (error) {
    console.error('Error deleting agency user:', error);
    throw error;
  }
};

const saveToLocalStorage = agency => {
  const data = JSON.stringify(agency);
  sessionStorage.setItem(agency._id, data);
};
const getFromLocalStorage = agencyId => {
  const agency = sessionStorage.getItem(agencyId);
  try {
    const data = JSON.parse(agency);
    return data;
  } catch {}
};

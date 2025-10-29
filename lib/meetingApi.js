import axios from 'axios';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

// Створення зустрічі
export const createMeeting = async externalMeetingId => {
  const res = await axios.post(`${baseURL}/meeting`, {
    externalMeetingId,
  });
  return res.data;
};

// Отримання токена учасника
export const getMeetingToken = async (meetingId, externalUserId) => {
  const res = await axios.post(`${baseURL}/meeting/token`, {
    meetingId,
    externalUserId,
  });

  return res.data;
};

export const removeAttendee = async (meetingId, attendeeId) => {
  const res = await axios.delete(
    `${baseURL}/meeting/attendee/${meetingId}/${attendeeId}`,
  );

  return res.data;
};

// Завершення зустрічі
export const endMeeting = async meetingId => {
  const res = await axios.delete(`${baseURL}/meeting/${meetingId}`);
  return res.data;
};

// Перелік зустрічей
export const listMeetings = async () => {
  const res = await axios.get(`${baseURL}/meeting/all`);
  return res.data;
};

// Оновлення інформації про учасника
export const updateAttendee = async (
  meetingId,
  attendeeId,
  attendeeUpdates,
) => {
  const res = await axios.put(
    `${baseURL}/meeting/${meetingId}/attendee/${attendeeId}`,
    attendeeUpdates,
  );
  return res.data;
};

// Перепідключення до зустрічі
export const reconnectToMeeting = async (meetingId, attendeeId) => {
  const res = await axios.post(
    `${baseURL}/meeting/${meetingId}/attendee/${attendeeId}/reconnect`,
  );
  return res.data;
};

// Отримання деталей зустрічі
export const getMeetingDetails = async meetingId => {
  const res = await axios.get(`${baseURL}/meeting/${meetingId}`);
  return res.data.meeting.Meeting;
};

export const changeMeetingStatus = async meetingId => {
  const res = await axios.patch(`${baseURL}/meeting/${meetingId}/changeStatus`);
  return res.data;
};

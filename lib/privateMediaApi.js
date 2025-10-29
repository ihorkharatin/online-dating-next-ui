import axios from 'axios';
import { v4 as randomId } from 'uuid';
import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const baseURL = BASE_URL_MAIN_SERVER;

// Тут ми повністю контролюємо бакети локально:
const buckets = {
  letter: 'live-chat-letters-files',
  video: 'dating-date-videos',
  photo: 'dating-date-photos',
};

// Функція для отримання розширення
const getExtensionFromMime = mime => mime.split('/')[1];

// Отримати список приватних медіа з фільтрами та пагінацією
export const getPrivateMedia = async (filters = {}, pagination = {}) => {
  const params = {
    ...filters,
    page: pagination.page || 1,
    perPage: pagination.perPage || 10,
  };
  const res = await axios.get(`${baseURL}/private-media`, { params });
  return res.data;
};

// Створити новий запис приватних медіа в базі
export const createPrivateMedia = async (userId, fileList) => {
  const data = { userId, fileList };
  const res = await axios.post(`${baseURL}/private-media`, data);
  return res.data;
};

// Комбінована функція: завантажити файли + створити запис у базі
export const uploadAndCreatePrivateMedia = async (userId, fileList, user) => {
  const uploadedUrls = await uploadFiles(fileList, user);
  return await createPrivateMedia(userId, uploadedUrls);
};

// Оновити існуючий запис медіа
export const updatePrivateMedia = async (id, data) => {
  const res = await axios.put(`${baseURL}/private-media/${id}`, data);
  return res.data;
};

// Видалити запис медіа
export const deletePrivateMedia = async id => {
  const res = await axios.delete(`${baseURL}/private-media/${id}`);
  return res.data;
};

export const uploadFiles = async (files, user) => {
  files = [...files];
  const urlList = await Promise.all(
    files.map(async file => {
      const extension = getExtensionFromMime(file.type);
      const filename = `${user?.nickname}_${randomId()}`;

      const fileType = file.type;

      // Get the upload URL
      const url = await getUploadFileUrl({
        filename: filename + `.${extension}`,
        type: file.type.split('/')[0], // Use file type for URL generation
        fileType,
      });

      return {
        file,
        url,
        title: filename,
      };
    }),
  );

  const uploadResults = await Promise.all(
    urlList.map(data =>
      uploadFileToS3({
        file: data.file,
        uploadUrl: data.url,
        title: data.title,
      }),
    ),
  );

  return uploadResults;
};

const uploadFileToS3 = async ({ file, uploadUrl, title }) => {
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'public, max-age=31536000',
    },
    body: file,
  }).catch(() => {});
  const url = getPublicFileUrl(title, file.type);
  return { url, estimation: file.estimation };
};

const getPublicFileUrl = (fileName, type) => {
  const bucket = buckets[type.split('/')[0]] || buckets.photo;

  return `https://${bucket}.s3.us-east-2.amazonaws.com/${fileName}.${
    type.split('/')[1]
  }`;
};

const getUploadFileUrl = async ({ filename, fileType, type }) => {
  const res = await axios.get(BASE_URL_MAIN_SERVER + `/file/upload-url`, {
    params: {
      filename,
      fileType,
      type,
    },
  });
  return res.data;
};

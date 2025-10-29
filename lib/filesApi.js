import axios from 'axios';
import { v4 as randomId } from 'uuid';

import { BASE_URL_MAIN_SERVER } from '../helpers/constants';

const buckets = {
  letter: 'live-chat-letters-files',
  video: 'dating-date-videos',
  photo: 'dating-date-photos',
};

// Функція для отримання розширення
const getExtensionFromMime = mime => mime.split('/')[1];

const baseURL = BASE_URL_MAIN_SERVER;
const main_base_URL = BASE_URL_MAIN_SERVER;

export async function getUserPhotos(userId) {
  const res = await axios.get(baseURL + '/photo', { params: { userId } });
  return res.data;
}
export async function getUserVideos(userId) {
  const res = await axios.get(baseURL + '/video', { params: { userId } });
  return res.data;
}
export async function uploadUserPhoto(files, type, user) {
  if (files.length === 0) return [];
  const fileList = await uploadFiles({ files, type, user });

  const urlList = fileList.map(el => el.url);
  const formData = {
    type,
    description: `${user?.name} from ${user?.country} `,
    urlList,
    userId: user?._id,
  };
  const res = await axios.post(baseURL + '/photo', formData);
  return res.data;
}

export async function uploadUserVideo(files, type, user) {
  if (files.length === 0) return [];
  const fileList = await uploadFiles({ files, type, user });

  const urlList = fileList.map(el => el.url);
  const formData = {
    type,
    description: `${user.name} from ${user.country} `,
    urlList,
    userId: user._id,
  };

  const res = await axios.post(baseURL + '/video', formData);
  console.log(res);

  return res.data;
}

export async function removeUserPhoto(photoId) {
  const res = await axios.delete(baseURL + `/photo/${photoId}`);
  return res.data;
}
export async function removeUserVideo(videoId) {
  const res = await axios.delete(baseURL + `/video/${videoId}`);
  return res.data;
}

const getUploadFileUrl = async ({ filename, fileType, type, isLetterFile }) => {
  const res = await axios.get(main_base_URL + `/file/upload-url`, {
    params: {
      filename,
      fileType,
      type,
      isLetterFile,
    },
  });
  return res.data;
};

const getPublicFileUrl = (fileName, type, isLetterFile) => {
  const bucket = isLetterFile
    ? buckets.letter
    : buckets[type.split('/')[0]] || buckets.photo;

  return `https://${bucket}.s3.us-east-2.amazonaws.com/${fileName}.${
    type.split('/')[1]
  }`;
};

const uploadFileToS3 = async ({ file, uploadUrl, title, isLetterFile }) => {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'public, max-age=31536000',
    },
    body: file,
  }).catch(() => {});
  const url = getPublicFileUrl(title, file.type, isLetterFile);
  return { title, type: file.type, url };
};

export const uploadFile = async (file, isLetterFile) => {
  const extension = getExtensionFromMime(file.type);
  const id = randomId();
  const fileName = `${id}.${extension}`;
  const uploadUrl = await getUploadFileUrl({
    filename: fileName,
    fileType: file.type,
    type: file.type.split('/')[0],
    isLetterFile,
  });
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'public, max-age=31536000',
    },
    body: file,
  });
  const url = getPublicFileUrl(id, file.type, isLetterFile);
  return url;
};

export const uploadFiles = async ({ files, user, isLetterFile }) => {
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
        isLetterFile,
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
        isLetterFile,
      }),
    ),
  );

  console.log(uploadResults); // Process or log the results
  return uploadResults;
};

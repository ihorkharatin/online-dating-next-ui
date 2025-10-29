export function isVideoUrl(url = '') {
  const videoExtensions = [
    '.mp4',
    '.avi',
    '.mov',
    '.quicktime',
    '.wmv',
    '.flv',
    '.webm',
    '.mkv',
    '.m4v',
    '.3gp',
    '.mpeg',
    '.mpg',
    '.ts',
    '.ogv',
  ];

  const lowerUrl = url.toLowerCase(); // щоб перевірка не залежала від регістру
  const hasVideoKeyword = lowerUrl.includes('video');

  const urlExtension =
    '.' + lowerUrl.split('.').pop().split('?')[0].split('#')[0]; // чисте розширення

  const isVideoExtension = videoExtensions.includes(urlExtension);

  return hasVideoKeyword || isVideoExtension;
}

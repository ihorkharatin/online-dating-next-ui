export const checkOnlineStatus = (user = {}, idList = []) => {
  const defaultOnline = user.isOnline;
  const isOnline = idList.includes(user._id);
  if (isOnline) return 'green';
  if (defaultOnline) return 'yellow';
  return 'white';
};

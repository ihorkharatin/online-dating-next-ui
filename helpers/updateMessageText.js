export const updateMessageText = (text, user) => {
  if (user?.typeAccount !== 'paidUser' || !text) {
    return text;
  }

  text = text.replaceAll('{{name}}', user.name);
  text = text.replaceAll('{{country}}', user.country);
  text = text.replaceAll('{{city}}', user.city);
  return text;
};

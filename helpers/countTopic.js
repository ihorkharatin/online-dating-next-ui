export const unreadLettersAmount = (topicList, userType, userId) => {
  const result = {
    inbox: 0,
    outbox: 0,
    primary: 0,
    spam: 0,
    trash: 0,
    total: 0,
  };
  const categories = ['primary', 'spam', 'trash'];
  for (const topic of topicList) {
    const category = topic[`${userType}Category`].toLowerCase();

    const {
      freeUserIsReadAmount,
      freeUserLetterAmount,

      paidUserIsReadAmount,
      paidUserLetterAmount,
    } = topic;

    const totalReceived =
      userType !== 'paidUser' ? paidUserLetterAmount : freeUserLetterAmount;

    const totalRead =
      userType === 'paidUser' ? paidUserIsReadAmount : freeUserIsReadAmount;
    const totalUnRead = totalReceived - totalRead;
    if (categories.includes(category)) {
      result[category.toLowerCase()] += +totalUnRead;
    } else {
      const lastMessage = topic.lastMessage;
      const isMyMessage = userId === lastMessage?.senderId;
      if (isMyMessage) {
        result.outbox += totalUnRead;
      } else {
        result.inbox += totalUnRead;
      }
    }

    result.total += +totalUnRead;
  }
  return result;
};

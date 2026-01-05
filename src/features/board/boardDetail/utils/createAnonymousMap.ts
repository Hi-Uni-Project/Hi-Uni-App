import { Comment } from '../types/comment';

export const createAnonymousMap = (
  comments: Comment[],
): Map<number, number> => {
  const userIdMap = new Map<number, number>();
  let counter = 1;

  comments.forEach(comment => {
    // 댓글 작성자
    if (!userIdMap.has(comment.userId)) {
      userIdMap.set(comment.userId, counter++);
    }

    // 답글 작성자
    comment.replies?.forEach(reply => {
      if (!userIdMap.has(reply.userId)) {
        userIdMap.set(reply.userId, counter++);
      }
    });
  });

  return userIdMap;
};

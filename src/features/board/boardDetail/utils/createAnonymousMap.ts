import { Comment } from '../types/comment';

export const createAnonymousMap = (
  comments: Comment[],
): Map<string, number> => {
  const authorMap = new Map<string, number>();
  let counter = 1;

  comments.forEach(comment => {
    if (!authorMap.has(comment.author)) {
      authorMap.set(comment.author, counter++);
    }

    comment.replies?.forEach(reply => {
      if (!authorMap.has(reply.author)) {
        authorMap.set(reply.author, counter++);
      }
    });
  });

  return authorMap;
};

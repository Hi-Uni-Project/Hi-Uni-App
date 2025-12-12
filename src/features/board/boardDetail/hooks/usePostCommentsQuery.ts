import { useQuery } from '@tanstack/react-query';

import { fetchComments } from '../api/comment/fetchComments';
import { convertToComment } from '../types/comment';
import type { Comment } from '../types/comment';

export const usePostCommentsQuery = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await fetchComments(postId);
      return response.map(convertToComment);
    },
    enabled: !!postId,
    staleTime: 1000 * 60,
  });
};

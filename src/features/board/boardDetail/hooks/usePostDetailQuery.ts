import { useQuery } from '@tanstack/react-query';

import { fetchNoReviewPost, fetchReviewPost } from '../api/post/fetchPost';
import {
  convertNoReviewToPostDetail,
  convertReviewToPostDetail,
  PostDetail,
} from '../types';

export const usePostDetailQuery = (postId: number, isReview: boolean) => {
  return useQuery<PostDetail>({
    queryKey: ['postDetail', postId, isReview],
    queryFn: async () => {
      if (isReview) {
        const response = await fetchReviewPost(postId);
        return convertReviewToPostDetail(response);
      } else {
        const response = await fetchNoReviewPost(postId);
        return convertNoReviewToPostDetail(response);
      }
    },
    enabled: !!postId,
    staleTime: 1000 * 60,
  });
};

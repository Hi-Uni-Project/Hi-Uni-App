import { useQuery } from '@tanstack/react-query';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import {
  fetchWeeklyHotPosts,
  fetchMyPosts,
  fetchMyComments,
} from '@/shared/api/boardFetchApi';

const useBoardQuery = (queryKey: string[], queryFn: () => Promise<Post[]>) => {
  return useQuery<Post[]>({
    queryKey,
    queryFn,
  });
};

export const useWeeklyHotPosts = () =>
  useBoardQuery(['weeklyHotPosts'], fetchWeeklyHotPosts);

export const useMyPostsQuery = () => useBoardQuery(['myPosts'], fetchMyPosts);

export const useMyCommentsQuery = () =>
  useBoardQuery(['myComments'], fetchMyComments);

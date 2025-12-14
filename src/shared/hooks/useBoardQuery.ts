import { useQuery } from '@tanstack/react-query';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import {
  fetchWeeklyHotPosts,
  fetchMyPosts,
  fetchMyComments,
  fetchMyScrab,
} from '@/shared/api/board/boardFetchApi';

const useBoardQuery = (
  queryKey: string[],
  queryFn: () => Promise<Post[]>,
  staleTime: number,
) => {
  return useQuery<Post[]>({
    queryKey,
    queryFn,
    staleTime,
  });
};

export const useWeeklyHotPosts = (sort: SortType = SortType.LATEST) =>
  useBoardQuery(
    ['weeklyHotPosts', sort],
    () => fetchWeeklyHotPosts(sort),
    1000 * 60,
  );

export const useMyPostsQuery = () =>
  useBoardQuery(['myPosts'], fetchMyPosts, 1000 * 60);

export const useMyCommentsQuery = () =>
  useBoardQuery(['myComments'], fetchMyComments, 1000 * 60);

export const useMyScrabQuery = () =>
  useBoardQuery(['myScrab'], fetchMyScrab, 1000 * 60);

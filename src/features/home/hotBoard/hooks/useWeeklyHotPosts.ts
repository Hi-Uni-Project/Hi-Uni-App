import { useQuery } from '@tanstack/react-query';

import { getWeeklyHotPostsApi } from '../api/getWeeklyHotPostsApi';

export const useWeeklyHotPosts = () => {
  return useQuery({
    queryKey: ['weeklyHotPosts'],
    queryFn: getWeeklyHotPostsApi,
    select: res => res.data,
    staleTime: 1000 * 60 * 5,
  });
};

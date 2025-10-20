import { WeeklyHotPostResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const getWeeklyHotPostsApi =
  async (): Promise<WeeklyHotPostResponse> => {
    const response =
      await axiosInstance.get<WeeklyHotPostResponse>('/posts/weekly-hot');

    return response.data;
  };

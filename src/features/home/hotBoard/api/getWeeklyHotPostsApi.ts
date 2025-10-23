import { DefaultPostResponse } from '@/features/board/shared/types/DefaultPostType';
import { axiosInstance } from '@/shared/api/axiosInstance';

export const getWeeklyHotPostsApi = async () => {
  const response =
    await axiosInstance.get<DefaultPostResponse>('/posts/weekly-hot');

  return response.data.data ?? [];
};

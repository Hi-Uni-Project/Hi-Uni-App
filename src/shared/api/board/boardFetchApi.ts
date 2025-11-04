import { AxiosError } from 'axios';

import { DefaultPostResponse } from '@/features/board/shared/types/DefaultPostType';
import { axiosInstance } from '@/shared/api/axiosInstance';

/**
 * 게시글 목록을 가져오는 공통 API 함수
 * @param endpoint - API 엔드포인트 경로
 * @returns Post 배열
 */

export const fetchPosts = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get<DefaultPostResponse>(endpoint);

    return response.data.data ?? [];
  } catch (error) {
    const err = error as AxiosError;

    console.error(
      '❌ Failed to fetch posts:',
      err.response?.data || err.message,
    );
    return [];
  }
};

export const fetchWeeklyHotPosts = () => fetchPosts('/posts/weekly-hot');
export const fetchMyPosts = () => fetchPosts('/posts/my-posts');
export const fetchMyComments = () => fetchPosts('/comments/my-comments');

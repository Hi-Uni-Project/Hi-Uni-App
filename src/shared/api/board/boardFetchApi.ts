import { AxiosError } from 'axios';

import { DefaultPostResponse } from '@/features/board/shared/types/DefaultPostType';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import { axiosInstance } from '@/shared/api/axiosInstance';

/**
 * 게시글 목록을 가져오는 공통 API 함수
 * @param endpoint - API 엔드포인트 경로
 * @param params - 쿼리 파라미터 (주간 HOT)
 * @returns Post 배열
 */

export const fetchPosts = async (
  endpoint: string,
  params?: Record<string, any>,
) => {
  try {
    const response = await axiosInstance.get<DefaultPostResponse>(endpoint, {
      params,
    });

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

export const fetchMyPosts = () => fetchPosts('/posts/my-posts');
export const fetchMyComments = () => fetchPosts('/comments/my-comments');
export const fetchMyScrab = () => fetchPosts('bookmarks/my');
export const fetchWeeklyHotPosts = (sort: SortType = SortType.LATEST) =>
  fetchPosts('/posts/weekly-hot', { sort });

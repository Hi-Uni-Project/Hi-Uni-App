import { DefaultPostResponse } from '@/features/board/shared/types/DefaultPostType';
import { axiosInstance } from '@/shared/api/axiosInstance';

/**
 * 게시글 목록을 가져오는 공통 API 함수
 * @param endpoint - API 엔드포인트 경로
 * @returns Post 배열
 */
export const fetchPosts = async (endpoint: string) => {
  const response = await axiosInstance.get<DefaultPostResponse>(endpoint);
  return response.data.data ?? [];
};

export const fetchWeeklyHotPosts = () => fetchPosts('/posts/weekly-hot');
export const fetchMyPosts = () => fetchPosts('/posts/my-posts');
export const fetchMyComments = () => fetchPosts('/comments/my-comments');

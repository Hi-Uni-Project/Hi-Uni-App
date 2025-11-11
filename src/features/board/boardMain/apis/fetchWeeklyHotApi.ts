import { Post } from '@/features/board/shared/types/DefaultPostType';
import {
  PostCategory,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import { axiosInstance } from '@/shared/api/axiosInstance';

// 카테고리별 주간 인기 게시글
export const fetchWeeklyHotByCategory = async (
  category: PostCategory,
): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<{ data: Post[] }>(
      '/posts/weekly-hot-category',
      { params: { category } },
    );

    return response.data.data ?? [];
  } catch (error) {
    console.log('Failed to fetch weekly hot by category:', error);
    return [];
  }
};

// 타입별 주간 인기 게시글
export const fetchWeeklyHotByType = async (type: PostType): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<{ data: Post[] }>(
      '/posts/weekly-hot-type',
      { params: { type } },
    );

    return response.data.data ?? [];
  } catch (error) {
    console.log('Failed to fetch weekly hot by type:', error);
    return [];
  }
};

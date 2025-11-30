import { Post } from '@/features/board/shared/types/DefaultPostType';
import {
  PostCategory,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import { axiosInstance } from '@/shared/api/axiosInstance';

// 카테고리별 주간 인기 게시글
export const fetchWeeklyHotByCategory = async (
  category: PostCategory,
  sort: SortType = SortType.LATEST,
): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<{ data: Post[] }>(
      '/posts/weekly-hot-category',
      { params: { category, sort } },
    );

    return response.data.data ?? [];
  } catch (error) {
    console.log('Failed to fetch post:', error);
    return [];
  }
};

// 타입별 주간 인기 게시글
export const fetchWeeklyHotByType = async (
  type: PostType,
  sort: SortType = SortType.LATEST,
): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<{ data: Post[] }>(
      '/posts/weekly-hot-type',
      { params: { type, sort } },
    );

    return response.data.data ?? [];
  } catch (error) {
    console.log('Failed to fetch post:', error);
    return [];
  }
};

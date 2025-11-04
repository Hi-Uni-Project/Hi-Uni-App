import { AxiosError } from 'axios';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import {
  PostCategory,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import { axiosInstance } from '@/shared/api/axiosInstance';

/**
 * 카테고리 및 타입(필터)별 게시글 조회 API
 * @param category 게시판 카테고리
 * @param type 게시글 타입 (선택)
 * @param sort 정렬 기준 (기본값: 최신순)
 */

export const fetchPostsByCategory = async (
  category: PostCategory,
  type: PostType | null,
  sort: SortType = SortType.LATEST,
): Promise<Post[]> => {
  try {
    const endpoint = type ? '/posts/type' : '/posts/category';

    const response = await axiosInstance.get<{ data: Post[] }>(endpoint, {
      params: {
        ...(type ? { type } : { category }),
        sort,
      },
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

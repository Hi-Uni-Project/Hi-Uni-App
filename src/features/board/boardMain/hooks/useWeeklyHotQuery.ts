import { useQuery } from '@tanstack/react-query';

import { Post } from '../../shared/types/DefaultPostType';
import { PostCategory, PostType } from '../../shared/types/enum/postEnum';
import {
  fetchWeeklyHotByCategory,
  fetchWeeklyHotByType,
} from '../apis/fetchWeeklyHotApi';

export const useCategoryWeeklyHotQuery = (
  category: PostCategory,
  type: PostType | null,
) => {
  return useQuery<Post[]>({
    queryKey: ['posts', 'weekly-hot', category, type],
    queryFn: () => {
      if (type === null) {
        return fetchWeeklyHotByCategory(category);
      }
      // 특정 타입 선택: 타입별 인기글
      return fetchWeeklyHotByType(type);
    },
    enabled: true,
    staleTime: 1000 * 60,
  });
};

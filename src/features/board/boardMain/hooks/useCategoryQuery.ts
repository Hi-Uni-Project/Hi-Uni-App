import { useQuery } from '@tanstack/react-query';

import { fetchPostsByCategory } from '../apis/fetchPostsByCategoryApi';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import {
  PostCategory,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';

export const usePostsByCategoryQuery = (
  category: PostCategory,
  type: PostType | null,
  sort: SortType = SortType.LATEST,
) => {
  return useQuery<Post[]>({
    queryKey: ['posts', 'category', category, type, sort],
    queryFn: () => fetchPostsByCategory(category, type, sort),
    enabled: !!category,
    staleTime: 1000 * 60,
  });
};

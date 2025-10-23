import { useQuery } from '@tanstack/react-query';

import { searchBoardPosts } from '../api/searchBoardApi';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';

export const useSearchBoardQuery = (
  keyword: string,
  sort: SortType = SortType.LATEST,
  enabled = false,
) => {
  return useQuery<Post[]>({
    queryKey: ['searchBoardPosts', keyword, sort],
    queryFn: () => searchBoardPosts(keyword, sort),
    enabled,
  });
};

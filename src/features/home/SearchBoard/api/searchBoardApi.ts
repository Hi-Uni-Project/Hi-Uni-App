import { DefaultPostResponse } from '@/features/board/shared/types/DefaultPostType';
import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import { axiosInstance } from '@/shared/api/axiosInstance';

export const searchBoardPosts = async (
  keyword: string,
  sort: SortType = SortType.LATEST,
) => {
  if (!keyword) {
    return [];
  }

  const response = await axiosInstance.get<DefaultPostResponse>(
    '/posts/search',
    {
      params: { keyword, sort },
    },
  );

  return response.data.data ?? [];
};

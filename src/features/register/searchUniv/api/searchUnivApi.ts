import { UnivSearchRequest, UnivSearchResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const searchUnivApi = async ({
  keyword,
}: UnivSearchRequest): Promise<UnivSearchResponse> => {
  const response = await axiosInstance.get<UnivSearchResponse>(
    `/univs/search?keyword=${encodeURIComponent(keyword)}`,
  );

  return response.data;
};

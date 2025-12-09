import { CreatePostRequest, PostData } from './types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const createPost = async (
  postData: CreatePostRequest,
): Promise<PostData> => {
  const response = await axiosInstance.post<ResponseTypes<PostData>>(
    '/posts/no-review',
    postData,
  );

  return response.data.data;
};

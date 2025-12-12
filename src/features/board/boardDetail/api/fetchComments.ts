import { CommentResponse } from '../types/comment';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const fetchComments = async (
  postId: number,
): Promise<CommentResponse[]> => {
  const response = await axiosInstance.get<ResponseTypes<CommentResponse[]>>(
    `/comments/${postId}`,
  );

  return response.data.data;
};

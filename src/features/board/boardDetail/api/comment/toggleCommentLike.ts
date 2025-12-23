import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const addCommentLike = async (commentId: number) => {
  const response = await axiosInstance.post<ResponseTypes>(
    `/comments/${commentId}/likes`,
  );
  return response.data.data;
};

export const removeCommentLike = async (commentId: number) => {
  const response = await axiosInstance.delete<ResponseTypes>(
    `/comments/${commentId}/likes`,
  );
  return response.data.data;
};

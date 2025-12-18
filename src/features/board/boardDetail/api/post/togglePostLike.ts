import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const addPostLike = async (postId: number) => {
  const response = await axiosInstance.post<ResponseTypes>(
    `/posts/likes/${postId}`,
  );
  return response.data.data;
};

export const removePostLike = async (postId: number) => {
  const response = await axiosInstance.delete<ResponseTypes>(
    `/posts/likes/${postId}`,
  );
  return response.data.data;
};

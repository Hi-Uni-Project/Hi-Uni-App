import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const addPostBookmark = async (postId: number) => {
  const response = await axiosInstance.post<ResponseTypes>(
    `/bookmarks/${postId}`,
  );
  return response.data.data;
};

export const removePostBookmark = async (postId: number) => {
  const response = await axiosInstance.delete<ResponseTypes>(
    `/bookmarks/${postId}`,
  );
  return response.data.data;
};

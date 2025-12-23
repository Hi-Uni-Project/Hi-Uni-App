import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const deletePost = async (postId: number): Promise<void> => {
  await axiosInstance.delete<ResponseTypes<void>>(`/posts/${postId}`);
};

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const createComment = async (content: string, postId: number) => {
  const response = await axiosInstance.post<ResponseTypes>(
    `/comments/${postId}`,
    { content },
  );

  console.log(response);

  return response.data.data;
};

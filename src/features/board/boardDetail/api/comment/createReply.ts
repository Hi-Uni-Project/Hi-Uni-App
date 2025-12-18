import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const createReply = async (
  postId: number,
  commentId: number,
  content: string,
) => {
  const response = await axiosInstance.post<ResponseTypes>(
    `/comments/${postId}/reply`,
    {
      parentCommentId: commentId,
      content,
    },
  );

  return response.data.data;
};

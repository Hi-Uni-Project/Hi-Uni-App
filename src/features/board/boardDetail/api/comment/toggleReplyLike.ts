import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const addReplyLike = async (
  commentId: number,
  replyId: number,
): Promise<void> => {
  await axiosInstance.post<ResponseTypes<void>>(
    `/comments/${commentId}/likes/reply/${replyId}`,
  );
};

export const removeReplyLike = async (
  commentId: number,
  replyId: number,
): Promise<void> => {
  await axiosInstance.delete<ResponseTypes<void>>(
    `/comments/${commentId}/likes/reply/${replyId}`,
  );
};

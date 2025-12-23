import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const deleteComment = async (commentId: number): Promise<void> => {
  await axiosInstance.delete<ResponseTypes<void>>(`/comments/${commentId}`);
};

export const deleteReply = async (
  parentId: number,
  replyId: number,
): Promise<void> => {
  await axiosInstance.delete<ResponseTypes<void>>(
    `/comments/${parentId}/reply/${replyId}`,
  );
};

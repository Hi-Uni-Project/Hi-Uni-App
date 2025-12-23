import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const updateComment = async (
  commentId: number,
  content: string,
): Promise<void> => {
  await axiosInstance.put<ResponseTypes<void>>(`/comments/${commentId}`, {
    content,
  });
};

export const updateReply = async (
  parentId: number,
  replyId: number,
  content: string,
): Promise<void> => {
  await axiosInstance.put<ResponseTypes<void>>(
    `/comments/${parentId}/reply/${replyId}`,
    {
      content,
    },
  );
};

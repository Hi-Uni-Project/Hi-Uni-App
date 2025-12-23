import { CreateReviewPostRequest } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const updateNoReviewPost = async (
  postId: number,
  title: string,
  content: string,
  category: string,
): Promise<void> => {
  await axiosInstance.put<ResponseTypes<void>>(`/posts/no-review/${postId}`, {
    title,
    content,
    category,
  });
};

export const updateReviewPost = async (
  postId: number,
  data: CreateReviewPostRequest,
): Promise<void> => {
  await axiosInstance.put<ResponseTypes<void>>(`/posts/review/${postId}`, data);
};

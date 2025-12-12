import { NoReviewPostResponse, ReviewPostResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const fetchNoReviewPost = async (
  postId: number,
): Promise<NoReviewPostResponse> => {
  const response = await axiosInstance.get<ResponseTypes<NoReviewPostResponse>>(
    `/posts/no-review/${postId}`,
  );

  return response.data.data;
};

export const fetchReviewPost = async (
  postId: number,
): Promise<ReviewPostResponse> => {
  const response = await axiosInstance.get<ResponseTypes<ReviewPostResponse>>(
    `/posts/review/${postId}`,
  );

  return response.data.data;
};

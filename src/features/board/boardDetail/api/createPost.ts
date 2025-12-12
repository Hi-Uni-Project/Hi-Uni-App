import { ReviewFormData } from '../../boardWrite/types';
import { PostType } from '../../shared/types/enum/postEnum';

import { CreatePostRequest, PostData } from './types';
import { convertReviewFormToRequest } from './util/convertReviewFormToRequest';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export const createPost = async (
  postData: CreatePostRequest,
): Promise<PostData> => {
  const response = await axiosInstance.post<ResponseTypes<PostData>>(
    '/posts/no-review',
    postData,
  );

  return response.data.data;
};

export const createReviewPost = async (
  title: string,
  type: PostType,
  formData: ReviewFormData,
): Promise<PostData> => {
  const requestData = convertReviewFormToRequest(title, type, formData);

  const response = await axiosInstance.post<ResponseTypes<PostData>>(
    '/posts/review',
    requestData,
  );

  return response.data.data;
};

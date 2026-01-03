import { ResumeUpdateRequest } from '../types/requestType';
import {
  AiAboutMeDataResponse,
  AiAboutMeResponse,
  MyReviewData,
  ResumeDataResponse,
  ResumeResponse,
  SkillSearchResponse,
} from '../types/responseType';
import { isLocalImage, photoToAsset } from '../utils/imageUtils';

import { axiosInstance } from '@/shared/api/axiosInstance';

const fetchResumeData = async (): Promise<ResumeDataResponse> => {
  const response = await axiosInstance.get<ResumeResponse>('/resume');

  return response.data.data;
};

const searchSkillData = async (
  keyword: string,
): Promise<SkillSearchResponse> => {
  const response = await axiosInstance.get<SkillSearchResponse>(
    `/skill/search?keyword=${keyword}`,
  );

  return response.data;
};

interface PostResumeParams {
  resumeData: ResumeUpdateRequest;
  photo: string | null;
}

const postResume = async ({ resumeData, photo }: PostResumeParams) => {
  const formData = new FormData();

  formData.append('data', JSON.stringify(resumeData));

  if (photo && isLocalImage(photo)) {
    const asset = photoToAsset(photo);
    formData.append('image', asset as any);
  } else {
    formData.append('image', null);
  }

  const response = await axiosInstance.post('/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const generateAiAboutMe = async (): Promise<AiAboutMeDataResponse> => {
  const response = await axiosInstance.get<AiAboutMeResponse>(
    '/resume/ai-about-me',
  );

  return response.data.data;
};

const getMyReviews = async (): Promise<MyReviewData[]> => {
  const response = await axiosInstance.get('/posts/me/reviews');

  return response.data.data;
};

export {
  fetchResumeData,
  searchSkillData,
  postResume,
  generateAiAboutMe,
  getMyReviews,
};

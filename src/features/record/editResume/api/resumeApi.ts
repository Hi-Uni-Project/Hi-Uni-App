import { Asset } from 'react-native-image-picker';

import { ResumeUpdateRequest } from '../types/requestType';
import { ResumeDataResponse, SkillSearchResponse } from '../types/responseType';

import { axiosInstance } from '@/shared/api/axiosInstance';

const fetchResumeData = async (): Promise<ResumeDataResponse> => {
  const response = await axiosInstance.get<ResumeDataResponse>('/resume');

  return response.data;
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
  photo: Asset | null;
}

const postResume = async ({ resumeData, photo }: PostResumeParams) => {
  const formData = new FormData();

  // JSON 데이터 추가
  formData.append('data', JSON.stringify(resumeData));

  // 이미지 파일 추가 (photo가 있는 경우에만)
  if (photo?.uri) {
    formData.append('image', {
      uri: photo.uri,
      type: photo.type || 'image/jpeg',
      name: photo.fileName || 'photo.jpg',
    } as any);
  }

  const response = await axiosInstance.post('/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export { fetchResumeData, searchSkillData, postResume };

import { ResumeUpdateRequest } from '../types/requestType';
import {
  AiAboutMeDataResponse,
  AiAboutMeResponse,
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

  console.log('postResume - resumeData:', JSON.stringify(resumeData, null, 2));
  console.log('postResume - links:', resumeData.links);

  // JSON 데이터 추가
  formData.append('data', JSON.stringify(resumeData));

  // 이미지 파일 추가 (로컬에서 새로 선택한 파일만 전송)
  // 서버 이미지는 이미 서버에 존재하므로 다시 보내지 않음
  if (photo && isLocalImage(photo)) {
    const asset = photoToAsset(photo);
    console.log('postResume - photo:', photo);
    console.log('postResume - asset:', asset);
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

/**
 * AI 내 소개 생성 API
 * @returns AI가 생성한 자기소개 및 남은 횟수
 */
const generateAiAboutMe = async (): Promise<AiAboutMeDataResponse> => {
  console.log('generateAiAboutMe - API 호출 시작');

  const response = await axiosInstance.get<AiAboutMeResponse>(
    '/resume/ai-about-me',
  );

  console.log('generateAiAboutMe - 응답:', response.data);

  return response.data.data;
};

export { fetchResumeData, searchSkillData, postResume, generateAiAboutMe };

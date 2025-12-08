import { ResumeUpdateRequest } from '../types/requestType';
import {
  AiAboutMeDataResponse,
  AiAboutMeResponse,
  ResumeDataResponse,
  ResumeResponse,
  SkillSearchResponse,
} from '../types/responseType';

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

/**
 * 이미지가 로컬 파일인지 확인
 * @param uri - 이미지 URI
 * @returns 로컬 파일 여부 (file:// 또는 ph:// 로 시작)
 */
const isLocalImage = (uri: string): boolean => {
  return uri.startsWith('file://') || uri.startsWith('ph://');
};

/**
 * URI에서 파일 확장자를 추출하여 MIME 타입 반환
 */
const getMimeType = (uri: string): string => {
  const extension = uri.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'jpg':
    case 'jpeg':
    default:
      return 'image/jpeg';
  }
};

/**
 * URI에서 파일명 추출
 */
const getFileName = (uri: string): string => {
  const segments = uri.split('/');
  return segments[segments.length - 1] || 'photo.jpg';
};

/**
 * photo URI를 FormData용 Asset으로 변환
 * - 로컬 이미지: uri 그대로
 * - 서버 이미지: baseURL + uri, Authorization 헤더 추가
 */
// const photoToAsset = (photo: string) => {
//   if (isLocalImage(photo)) {
//     return {
//       uri: photo,
//       type: getMimeType(photo),
//       name: getFileName(photo),
//     };
//   }

//   // 서버 이미지: ImagePicker의 getImageSource와 동일한 방식
//   const accessToken = useUserStore.getState().accessToken;
//   return {
//     uri: `${Config.API_KEY}${photo}`,
//     type: getMimeType(photo),
//     name: getFileName(photo),
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };
// };

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
    const asset = {
      uri: photo,
      type: getMimeType(photo),
      name: getFileName(photo),
    };
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

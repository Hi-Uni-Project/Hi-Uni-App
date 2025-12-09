import Config from 'react-native-config';

import { useUserStore } from '@/shared/stores/user';

/**
 * 이미지가 로컬 파일인지 확인
 * @param uri - 이미지 URI
 * @returns 로컬 파일 여부 (file:// 또는 ph:// 로 시작)
 */
export const isLocalImage = (uri: string): boolean => {
  return uri.startsWith('file://') || uri.startsWith('ph://');
};

/**
 * URI에서 파일 확장자를 추출하여 MIME 타입 반환
 */
export const getMimeType = (uri: string): string => {
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
export const getFileName = (uri: string): string => {
  const segments = uri.split('/');
  return segments[segments.length - 1] || 'photo.jpg';
};

/**
 * 이미지 소스 생성 (Image 컴포넌트용)
 * - 로컬 이미지: uri 그대로 사용
 * - 서버 이미지: baseURL + uri, Authorization 헤더 추가
 */
export const getImageSource = (photo: string | null) => {
  if (!photo) {
    return undefined;
  }

  if (isLocalImage(photo)) {
    return { uri: photo };
  }

  // 서버 이미지: baseURL 추가 + 인증 헤더
  const accessToken = useUserStore.getState().accessToken;
  return {
    uri: `${Config.API_KEY}${photo}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

/**
 * photo URI를 FormData용 Asset으로 변환
 * - 로컬 이미지: uri 그대로
 * - 서버 이미지: baseURL + uri, Authorization 헤더 추가
 */
export const photoToAsset = (photo: string) => {
  if (isLocalImage(photo)) {
    return {
      uri: photo,
      type: getMimeType(photo),
      name: getFileName(photo),
    };
  }

  // 서버 이미지: ImagePicker의 getImageSource와 동일한 방식
  const accessToken = useUserStore.getState().accessToken;
  return {
    uri: `${Config.API_KEY}${photo}`,
    type: getMimeType(photo),
    name: getFileName(photo),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

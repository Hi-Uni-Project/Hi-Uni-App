import { PostType } from '@/features/board/shared/types/enum/postEnum';

// 후기 질문 인터페이스
export interface ReviewQuestion {
  label: string;
  value: string;
}

// 공통 게시글 필드
interface BasePostResponse {
  nickname: string;
  univName: string;
  id: number;
  title: string;
  content: string;
  category: string;
  isReview: boolean;
  isLiked: boolean;
  isScrap: boolean;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  viewCount: number;
  createdAt: string;
}

// 일반 게시글 상세 응답 (no-review)
export interface NoReviewPostResponse extends BasePostResponse {
  type: PostType;
  majorName?: string;
  firstMajorName?: string;
  secondMajorName?: string;
  userImageUrl?: string;
  imageUrl?: string;
  isReview: false;
}

// 후기 게시글 상세 응답 (review) - JOB
export interface JobReviewResponse extends BasePostResponse {
  firstMajorName: string;
  secondMajorName?: string;
  userImageUrl?: string;
  imageUrl?: string;
  type: 'JOB';
  isReview: true;
  companyName: string;
  appliedPosition: string;
  applyMethod: string;
  interviewQuestions: string;
  preparation: string;
  result: string;
  feelings: string;
  additional?: string;
}

// 후기 게시글 상세 응답 (review) - INTERNSHIP
export interface InternshipReviewResponse extends BasePostResponse {
  majorName?: string;
  firstMajorName?: string;
  secondMajorName?: string;
  userImageUrl?: string;
  imageUrl?: string;
  type: 'INTERNSHIP';
  isReview: true;
  companyName: string;
  startDate: string;
  endDate: string;
  userPosition: string;
  whatLearn: string;
  feelings: string;
  additional?: string;
}

// 후기 게시글 상세 응답 (review) - INTERVIEW
export interface InterviewReviewResponse extends BasePostResponse {
  firstMajorName: string;
  secondMajorName?: string;
  userImageUrl?: string;
  imageUrl?: string;
  type: 'INTERVIEW';
  isReview: true;
  companyName: string;
  appliedPosition: string;
  interviewFormat: string;
  interviewQuestions: string;
  preparation: string;
  atmosphere: string;
  feelings: string;
  additional?: string;
}

// 후기 게시글 상세 응답 (review) - EXPERIENCE
export interface ExperienceReviewResponse extends BasePostResponse {
  firstMajorName: string;
  secondMajorName?: string;
  userImageUrl?: string;
  imageUrl?: string;
  type: 'EXPERIENCE';
  isReview: true;
  organizationName: string;
  position: string;
  positionRank: string;
  whatWork: string;
  requiredSkills: string;
  characteristics: string;
  feelings: string;
  additional?: string;
  startDate: string;
  endDate: string;
}

// 후기 게시글 상세 응답 (review) - LICENSE
export interface LicenseReviewResponse extends BasePostResponse {
  firstMajorName: string;
  secondMajorName?: string;
  userImageUrl?: string;
  imageUrl?: string;
  type: 'LICENSE';
  isReview: true;
  certificationName: string;
  prepDuration: string;
  materials: string;
  difficulty: string;
  studyMethod: string;
  tips: string;
  feelings: string;
  additional?: string;
}

export type ReviewPostResponse =
  | JobReviewResponse
  | InternshipReviewResponse
  | InterviewReviewResponse
  | ExperienceReviewResponse
  | LicenseReviewResponse;

// 통합 게시글 응답 타입
export type PostResponse = NoReviewPostResponse | ReviewPostResponse;

/**
 * 게시글 응답을 UI 데이터로 변환 (통합 함수)
 */
export const convertPostToPostDetail = (response: PostResponse): PostDetail => {
  if (response.isReview) {
    return convertReviewToPostDetail(response as ReviewPostResponse);
  }
  return convertNoReviewToPostDetail(response as NoReviewPostResponse);
};

// 게시글 상세 UI 타입
export interface PostDetail {
  id: number;
  nickname: string;
  univ: string;
  major: string;
  userImageUrl: string;
  date: string;
  title: string;
  content: string;
  isReview: boolean;
  reviewQuestions?: ReviewQuestion[];
  additionalReview?: string;
  views: number;
  likes: number;
  bookmarks: number;
  commentCount: number;
  category: string;
  subcategory?: string; // optional로 변경
  postType: PostType;
}

/**
 * 날짜 포맷 변환 (yyyy.MM.dd)
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/**
 * 일반 게시글 응답을 UI 데이터로 변환
 */
export const convertNoReviewToPostDetail = (
  response: NoReviewPostResponse,
): PostDetail => {
  // majorName 또는 firstMajorName/secondMajorName 처리
  const major = response.majorName
    ? response.majorName
    : response.firstMajorName +
      (response.secondMajorName ? ` · ${response.secondMajorName}` : '');

  return {
    id: response.id,
    nickname: response.nickname,
    univ: response.univName,
    major,
    userImageUrl: response.userImageUrl || '',
    date: formatDate(response.createdAt),
    title: response.title,
    content: response.content,
    isReview: false,
    views: response.viewCount,
    likes: response.likeCount,
    bookmarks: response.bookmarkCount,
    commentCount: response.commentCount,
    category: response.category,
    postType: response.type,
  };
};

/**
 * 후기 게시글 응답을 UI 데이터로 변환
 */
export const convertReviewToPostDetail = (
  response: ReviewPostResponse,
): PostDetail => {
  let reviewQuestions: ReviewQuestion[] = [];

  switch (response.type) {
    case 'JOB':
      reviewQuestions = [
        { label: '회사명', value: response.companyName },
        { label: '직무', value: response.appliedPosition },
        { label: '지원 방법', value: response.applyMethod },
        { label: '면접 질문', value: response.interviewQuestions },
        { label: '준비 사항', value: response.preparation },
        { label: '결과', value: response.result },
      ];
      break;

    case 'INTERNSHIP':
      reviewQuestions = [
        { label: '회사명', value: response.companyName },
        { label: '시작일', value: formatDate(response.startDate) },
        { label: '종료일', value: formatDate(response.endDate) },
        { label: '부서/직무', value: response.userPosition },
        { label: '배운 점', value: response.whatLearn },
      ];
      break;

    case 'INTERVIEW':
      reviewQuestions = [
        { label: '회사명', value: response.companyName },
        { label: '직무', value: response.appliedPosition },
        { label: '면접 유형', value: response.interviewFormat },
        { label: '질문 내용', value: response.interviewQuestions },
        { label: '답변 준비', value: response.preparation },
        { label: '면접 분위기', value: response.atmosphere },
      ];
      break;

    case 'EXPERIENCE':
      reviewQuestions = [
        { label: '조직명', value: response.organizationName },
        { label: '시작일', value: formatDate(response.startDate) },
        { label: '종료일', value: formatDate(response.endDate) },
        { label: '직무', value: response.position },
        { label: '직급', value: response.positionRank },
        { label: '담당 업무', value: response.whatWork },
        { label: '필수 스킬', value: response.requiredSkills },
        { label: '특징', value: response.characteristics },
      ];
      break;

    case 'LICENSE':
      reviewQuestions = [
        { label: '자격증명', value: response.certificationName },
        { label: '준비 기간', value: response.prepDuration },
        { label: '교재', value: response.materials },
        { label: '난이도', value: response.difficulty },
        { label: '학습 방법', value: response.studyMethod },
        { label: '합격 팁', value: response.tips },
      ];
      break;
  }

  // PostType으로 변환
  const postType: PostType = response.type as PostType;

  // majorName 또는 firstMajorName/secondMajorName 처리
  const major =
    'majorName' in response && response.majorName
      ? response.majorName
      : response.firstMajorName +
        (response.secondMajorName ? ` · ${response.secondMajorName}` : '');

  return {
    id: response.id,
    nickname: response.nickname,
    univ: response.univName,
    major,
    userImageUrl: response.userImageUrl || '',
    date: formatDate(response.createdAt),
    title: response.title,
    content: response.feelings,
    isReview: true,
    reviewQuestions,
    additionalReview: response.additional,
    views: response.viewCount,
    likes: response.likeCount,
    bookmarks: response.bookmarkCount,
    commentCount: response.commentCount,
    category: response.category,
    postType,
  };
};

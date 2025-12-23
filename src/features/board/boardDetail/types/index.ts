import { PostType } from '@/features/board/shared/types/enum/postEnum';

// 후기 질문 인터페이스
export interface ReviewQuestion {
  label: string;
  value: string;
}

// 일반 게시글 상세 응답 (no-review)
export interface NoReviewPostResponse {
  nickname: string;
  univName: string;
  firstMajorName: string;
  secondMajorName: string;
  id: number;
  title: string;
  content: string;
  type: PostType;
  category: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  viewCount: number;
  createdAt: string;
  isLiked: boolean;
  isScrap: boolean;
  isUser?: boolean;
}

// 공통 필드
interface BaseReviewPostResponse {
  nickname: string;
  univName: string;
  firstMajorName: string;
  secondMajorName?: string;
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  viewCount: number;
  createdAt: string;
  isLiked: boolean;
  isScrap: boolean;
  isReview: boolean;
  isUser?: boolean;
}

// JOB 후기 응답
export interface JobReviewResponse extends BaseReviewPostResponse {
  type: PostType.JOB;
  companyName: string;
  appliedPosition: string;
  applyMethod: string;
  interviewQuestions: string;
  preparation: string;
  result: string;
  feelings: string;
  additional?: string;
}

// INTERNSHIP 후기 응답
export interface InternshipReviewResponse extends BaseReviewPostResponse {
  type: PostType.INTERNSHIP;
  companyName: string;
  department: string;
  tasks: string;
  learned: string;
  feelings: string;
  additional?: string;
  startDate: string;
  endDate: string;
}

// INTERVIEW 후기 응답
export interface InterviewReviewResponse extends BaseReviewPostResponse {
  type: PostType.INTERVIEW;
  companyName: string;
  appliedPosition: string;
  interviewFormat: string;
  interviewQuestions: string;
  preparation: string;
  atmosphere: string;
  feelings: string;
  additional?: string;
}

// EXPERIENCE 후기 응답
export interface ExperienceReviewResponse extends BaseReviewPostResponse {
  type: PostType.EXPERIENCE;
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

// LICENSE 후기 응답
export interface LicenseReviewResponse extends BaseReviewPostResponse {
  type: PostType.LICENSE;
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

// 게시글 상세 UI 타입
export interface PostDetail {
  id: number;
  nickname: string;
  univ: string;
  firstMajorName: string;
  secondMajorName: string;
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
  subcategory?: string;
  postType: PostType;
  isLiked: boolean;
  isBookmarked: boolean;
  isUser?: boolean;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

//  일반 게시글 응답을 UI 데이터로 변환
export const convertNoReviewToPostDetail = (
  response: NoReviewPostResponse,
): PostDetail => {
  return {
    id: response.id,
    nickname: response.nickname,
    univ: response.univName,
    firstMajorName: response.firstMajorName,
    secondMajorName: response.secondMajorName,
    date: response.createdAt,
    title: response.title,
    content: response.content,
    isReview: false,
    views: response.viewCount,
    likes: response.likeCount,
    bookmarks: response.bookmarkCount,
    commentCount: response.commentCount,
    category: response.category,
    postType: response.type,
    isLiked: response.isLiked,
    isBookmarked: response.isScrap,
    isUser: response.isUser,
  };
};

export const convertReviewToPostDetail = (
  response: ReviewPostResponse,
): PostDetail => {
  let reviewQuestions: ReviewQuestion[] = [];

  switch (response.type) {
    case PostType.JOB:
      reviewQuestions = [
        { label: '회사명', value: response.companyName },
        { label: '직무', value: response.appliedPosition },
        { label: '지원 방법', value: response.applyMethod },
        { label: '면접 질문', value: response.interviewQuestions },
        { label: '준비 사항', value: response.preparation },
        { label: '결과', value: response.result },
      ];
      break;

    case PostType.INTERNSHIP:
      reviewQuestions = [
        { label: '회사명', value: response.companyName },
        { label: '부서/직무', value: response.department },
        { label: '담당 업무', value: response.tasks },
        { label: '실무 내용', value: response.learned },
        { label: '시작일', value: formatDate(response.startDate) },
        { label: '종료일', value: formatDate(response.endDate) },
      ];
      break;

    case PostType.INTERVIEW:
      reviewQuestions = [
        { label: '회사명', value: response.companyName },
        { label: '직무', value: response.appliedPosition },
        { label: '면접 유형', value: response.interviewFormat },
        { label: '질문 내용', value: response.interviewQuestions },
        { label: '답변 준비', value: response.preparation },
        { label: '면접 분위기', value: response.atmosphere },
      ];
      break;

    case PostType.EXPERIENCE:
      reviewQuestions = [
        { label: '조직명', value: response.organizationName },
        { label: '직무', value: response.position },
        { label: '직급', value: response.positionRank },
        { label: '담당 업무', value: response.whatWork },
        { label: '필수 스킬', value: response.requiredSkills },
        { label: '특징', value: response.characteristics },
        { label: '시작일', value: formatDate(response.startDate) },
        { label: '종료일', value: formatDate(response.endDate) },
      ];
      break;

    case PostType.LICENSE:
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

  return {
    id: response.id,
    nickname: response.nickname,
    univ: response.univName,
    firstMajorName: response.firstMajorName,
    secondMajorName: response.secondMajorName || '',
    date: response.createdAt,
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
    postType: response.type,
    isLiked: response.isLiked,
    isBookmarked: response.isScrap,
    isUser: response.isUser,
  };
};

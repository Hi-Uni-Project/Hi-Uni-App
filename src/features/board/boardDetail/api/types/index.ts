import { PostType } from '@/features/board/shared/types/enum/postEnum';

export interface CreatePostRequest {
  title: string;
  content: string;
  type: PostType;
  imageUrl?: string;
}

// 공통 후기 게시글 필드
interface BaseReviewPostRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

// JOB 후기 게시글 생성 요청
export interface CreateJobReviewRequest extends BaseReviewPostRequest {
  type: 'JOB';
  companyName: string;
  appliedPosition: string;
  applyMethod: string;
  interviewQuestions: string;
  preparation: string;
  result: string;
  feelings: string;
  additional?: string;
}

// INTERNSHIP 후기 게시글 생성 요청
export interface CreateInternshipReviewRequest extends BaseReviewPostRequest {
  type: 'INTERNSHIP';
  companyName: string;
  department: string;
  tasks: string;
  learned: string;
  feelings: string;
  additional?: string;
  startDate: string;
  endDate: string;
}

// INTERVIEW 후기 게시글 생성 요청
export interface CreateInterviewReviewRequest extends BaseReviewPostRequest {
  type: 'INTERVIEW';
  companyName: string;
  appliedPosition: string;
  interviewFormat: string;
  interviewQuestions: string;
  preparation: string;
  atmosphere: string;
  feelings: string;
  additional?: string;
}

// EXPERIENCE 후기 게시글 생성 요청
export interface CreateExperienceReviewRequest extends BaseReviewPostRequest {
  type: 'EXPERIENCE';
  organizationName: string;
  position: string;
  positionRank: string;
  whatWork: string;
  requiredSkills: string;
  feelings: string;
  additional?: string;
  startDate: string;
  endDate: string;
}

// LICENSE 후기 게시글 생성 요청
export interface CreateLicenseReviewRequest extends BaseReviewPostRequest {
  type: 'LICENSE';
  certificationName: string;
  prepDuration: string;
  materials: string;
  difficulty: string;
  studyMethod: string;
  tips: string;
  feelings: string;
  additional?: string;
}

// 통합 후기 게시글 생성 요청 타입
export type CreateReviewPostRequest =
  | CreateJobReviewRequest
  | CreateInternshipReviewRequest
  | CreateInterviewReviewRequest
  | CreateExperienceReviewRequest
  | CreateLicenseReviewRequest;

export interface PostData {
  nickname: string;
  univName: string;
  majorName: string;
  userImageUrl: string;
  id: number;
  title: string;
  content: string;
  type: string;
  category: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  viewCount: number;
  createdAt: string;
}

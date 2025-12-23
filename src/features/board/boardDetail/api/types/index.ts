import { PostType } from '@/features/board/shared/types/enum/postEnum';

export interface CreatePostRequest {
  title: string;
  content: string;
  type: PostType;
}

// 후기 게시글 생성 요청 (새 API 명세)
export interface CreateReviewPostRequest {
  title: string;
  content: string;
  type: PostType;
  firstQuestion: string;
  secondQuestion: string;
  thirdQuestion: string;
  fourthQuestion: string;
  fifthQuestion: string;
  sixthQuestion: string;
  seventhQuestion: string;
  eighthQuestion: string;
  startDate?: string;
  endDate?: string;
}

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

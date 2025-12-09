import { PostType } from '@/features/board/shared/types/enum/postEnum';

export interface CreatePostRequest {
  title: string;
  content: string;
  type: PostType;
  imageUrl?: string; // 삭제 예정
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

import { PostCategory, PostType } from './enum/postEnum';

import { ResponseTypes } from '@/shared/api/types';

export interface Post {
  id: number;
  title: string;
  content: string;

  category: PostCategory;
  type: PostType;
  isReview: boolean;

  firstMajorName: string;
  secondMajorName: string;

  likeCount: number;
  commentCount: number;
  bookmarkCount: number;

  createdAt: string;
}

export interface PostList {
  data: Post[];
}

export type DefaultPostResponse = ResponseTypes<Post[]>;

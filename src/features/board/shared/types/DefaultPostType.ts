import { PostCategory, PostType } from './enum/postEnum';

import { ResponseTypes } from '@/shared/api/types';
/* - 우혁님 참고해주세요!
타입에 공통되는 값들이 많다고 생각됩니다.

이런 경우 추후에 공통 interface로 구현하여
유틸성 type으로 확장할 수 있을 거 같아요.

일단 board/shared 하위로 관리하겠습니다.
*/

export interface Post {
  id: number;
  title: string;
  content: string;

  category: PostCategory;
  type: PostType;

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

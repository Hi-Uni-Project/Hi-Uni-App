/**
 * 타입 임시 정리
 * 서버에서 return 되는 res 형태에 맞춰서 수정 필요
 */

export interface Post {
  category: string;
  subcategory: string;
  author: string;
  school: string;
  date: string;
  title: string;
  content: string;
  views: number;
  likes: number;
  bookmarks: number;
  commentCount: number;
}

export interface Reply {
  id: number;
  author: string;
  school: string;
  content: string;
  date: string;
  likes?: number;
}

export interface Comment {
  id: number;
  author: string;
  school: string;
  content: string;
  date: string;
  likes: number;
  replies?: Reply[];
}

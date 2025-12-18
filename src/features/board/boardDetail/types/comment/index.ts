export interface CommentResponse {
  id: number;
  nickname: string;
  firstMajorName: string;
  secondMajorName: string;
  content: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  isLiked: boolean;
  date: string;
  likes: number;
  firstMajorName: string;
  secondMajorName: string;
  replies?: Comment[];
}

export interface Reply {
  id: number;
  author: string;
  univ: string;
  content: string;
  date: string;
  likes: number;
}

export const convertToComment = (response: CommentResponse): Comment => {
  return {
    id: response.id,
    author: response.nickname,
    firstMajorName: response.firstMajorName,
    secondMajorName: response.secondMajorName,
    content: response.content,
    date: response.createdAt,
    isLiked: response.isLiked,
    likes: response.likeCount,
    replies: [], // 답글은 별도 API로 조회 필요
  };
};

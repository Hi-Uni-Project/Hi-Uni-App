export interface CommentResponse {
  id: number;
  nickname: string | null;
  firstMajorName: string | null;
  secondMajorName: string | null;
  content: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  commentReplies: CommentResponse[];
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
  firstMajorName: string;
  secondMajorName: string;
  content: string;
  isLiked: boolean;
  date: string;
  likes: number;
  replies?: Comment[];
}

export const convertToComment = (response: CommentResponse): Comment => {
  return {
    id: response.id,
    author: response.nickname || '익명',
    firstMajorName: response.firstMajorName || '',
    secondMajorName: response.secondMajorName || '',
    content: response.content,
    date: response.createdAt,
    isLiked: response.isLiked,
    likes: response.likeCount,
    replies: response.commentReplies.map(convertToComment),
  };
};

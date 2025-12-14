export interface CommentResponse {
  id: number;
  nickname: string;
  majorName: string;
  content: string;
  likeCount: number;
}

export interface Comment {
  id: number;
  author: string;
  univ: string;
  content: string;
  date: string;
  likes: number;
  majorName: string;
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
    univ: response.majorName,
    majorName: response.majorName,
    content: response.content,
    date: '방금 전', // createdAt이 없어서 임시로 설정
    likes: response.likeCount,
    replies: [], // 답글은 별도 API로 조회 필요
  };
};

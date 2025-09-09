export interface HotPost {
  id: string;
  title: string;
  date: string;
  likes: number;
  comments: number;
}

const mockHotPosts: HotPost[] = [
  {
    id: '1',
    title: '이번 주 핫한 강의 후기 공유합니다!',
    date: '06/19',
    likes: 25,
    comments: 12,
  },
  {
    id: '2',
    title: '대학 생활 팁: 시간 관리 방법',
    date: '06/20',
    likes: 18,
    comments: 8,
  },
  {
    id: '3',
    title: '스터디 그룹 모집합니다!',
    date: '06/22',
    likes: 32,
    comments: 15,
  },
  {
    id: '4',
    title: '캠퍼스 맛집 추천',
    date: '06/20',
    likes: 40,
    comments: 20,
  },
];

export default mockHotPosts;

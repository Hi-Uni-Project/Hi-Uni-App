import { Platform } from 'react-native';

import { Comment, Post } from '../types';

import { OptionItem } from '@/shared/components/Board/OptionPopup';

export const TOP_OFFSET = Platform.OS === 'ios' ? 70 : 50;

export const MOCK_POST: Post = {
  category: '인턴십 게시판',
  subcategory: '제주대학교',
  author: '익명',
  school: '컴퓨터공학과',
  date: '6/23 22:08',
  title: '카카오 6개월 인턴십 후기',
  content: `카카오에서 UI 디자이너 인턴 했던 거 공유해볼게!!
앞단 디자이너들이랑 일하면서 느낀 건, 디자인은 그냥 화면 예쁘게 만드는 게 아니라 '사용자 입장에서 진짜 필요한 걸 고민하고 해결하는' 일이라는 거였다. 디자인에 대해 적극적인 건 구독이면 카카오 같은 큰 서비스에서의 인턴은 정말 추천하는 경험이 될 거야.
나는 이 경험 덕분에 확실히 '아, 난 실무 디자이너로 계속 나아가고 싶다'는 확신이 들었어!`,
  views: 802,
  likes: 40,
  bookmarks: 35,
  commentCount: 3,
};

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    author: '익명1',
    school: '경영학과',
    content: 'ㅠㅠ 이번에 나도 인턴 넣었는데 서류광탈 안하길...',
    date: '6/23 22:08',
    likes: 5,
  },
  {
    id: 2,
    author: '익명2',
    school: '산업디자인학과',
    content: '댓글을 입력하세요.',
    date: '6/23 22:08',
    likes: 0,
    replies: [
      {
        id: 4,
        author: '익명3',
        school: '산업디자인학과',
        content: '저도 부탁드려여 ㅠㅠㅠ',
        date: '6/23 22:08',
        likes: 2,
      },
      {
        id: 5,
        author: '익명3',
        school: '산업디자인학과',
        content: '저도 부탁드려여 줄바꿈 테스트 ㅠㅠㅠ'.repeat(9),
        date: '6/23 22:08',
      },
    ],
  },
];

export const createPostOptions = (onDeletePost: () => void): OptionItem[] => [
  {
    label: '쪽지 보내기',
    onPress: onDeletePost,
  },
  {
    label: '신고하기',
    onPress: () => console.log('신고하기'),
  },
  {
    label: '차단하기',
    onPress: () => console.log('차단하기'),
  },
];

export const createCommentOptions = (
  onDeleteComment: () => void,
): OptionItem[] => [
  {
    label: '수정하기',
    onPress: () => console.log('댓글 수정하기'),
  },
  {
    label: '삭제하기',
    onPress: onDeleteComment,
  },
];

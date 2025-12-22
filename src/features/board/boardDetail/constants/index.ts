import { Platform } from 'react-native';

import { OptionItem } from '@/shared/components/Board/OptionPopup';

export const TOP_OFFSET = Platform.OS === 'ios' ? 70 : 50;

export const createPostOptions = (
  isUser: boolean,
  onDeletePost?: () => void,
): OptionItem[] => {
  if (isUser) {
    return [
      {
        label: '수정하기',
        onPress: () => console.log('게시글 수정하기'),
      },
      {
        label: '삭제하기',
        onPress: onDeletePost || (() => console.log('게시글 삭제하기')),
      },
    ];
  }

  return [
    {
      label: '쪽지 보내기',
      onPress: () => console.log('쪽지 보내기 -> 다음 ver 구현'),
    },
    {
      label: '신고하기',
      onPress: () => console.log('신고하기 -> 다음 ver 구현'),
    },
    {
      label: '차단하기',
      onPress: () => console.log('차단하기 -> 다음 ver 구현'),
    },
  ];
};

export const createCommentOptions = (
  isUser: boolean,
  onDeleteComment?: () => void,
): OptionItem[] => {
  if (isUser) {
    return [
      {
        label: '수정하기',
        onPress: () => console.log('댓글 수정하기'),
      },
      {
        label: '삭제하기',
        onPress: onDeleteComment || (() => console.log('댓글 삭제하기')),
      },
    ];
  }

  return [
    {
      label: '쪽지 보내기',
      onPress: () => console.log('쪽지 보내기 -> 다음 ver 구현'),
    },
    {
      label: '신고하기',
      onPress: () => console.log('신고하기 -> 다음 ver 구현'),
    },
    {
      label: '차단하기',
      onPress: () => console.log('차단하기 -> 다음 ver 구현'),
    },
  ];
};

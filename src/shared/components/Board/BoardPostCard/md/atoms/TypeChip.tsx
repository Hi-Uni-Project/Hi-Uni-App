import React from 'react';

import { Text } from 'react-native';

import {
  POST_TYPE_DISPLAY_NAME,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';

interface Props {
  type: PostType;
}

const TypeChip = ({ type }: Props) => {
  return (
    <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[2px] text-surface-500 typo-caption-14-regular">
      {POST_TYPE_DISPLAY_NAME[type]}
    </Text>
  );
};

export default TypeChip;

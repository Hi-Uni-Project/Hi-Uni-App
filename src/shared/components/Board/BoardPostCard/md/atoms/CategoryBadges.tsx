import React from 'react';

import { View, Text } from 'react-native';

import {
  PostCategory,
  PostType,
  POST_CATEGORY_DISPLAY_NAME,
  POST_TYPE_DISPLAY_NAME,
} from '@/features/board/shared/types/enum/postEnum';

interface Props {
  category: PostCategory;
  type: PostType;
}

const CategoryBadges = ({ category, type }: Props) => {
  return (
    <View className="mb-2 flex-row gap-1.5">
      <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[5px] text-surface-500 typo-caption-14-regular">
        {POST_CATEGORY_DISPLAY_NAME[category]}
      </Text>
      <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[5px] text-surface-500 typo-caption-14-regular">
        {POST_TYPE_DISPLAY_NAME[type]}
      </Text>
    </View>
  );
};

export default CategoryBadges;

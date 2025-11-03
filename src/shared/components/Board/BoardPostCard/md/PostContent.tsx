import React from 'react';

import { View, Text } from 'react-native';

import {
  PostType,
  POST_TYPE_DISPLAY_NAME,
} from '@/features/board/shared/types/enum/postEnum';

interface Props {
  title: string;
  content: string;
  type: PostType;
  vertical: boolean;
}

const PostContent = ({ title, content, type, vertical }: Props) => {
  return (
    <>
      {vertical ? (
        <View className="mb-[6px] flex-row items-center space-x-2">
          <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[2px] text-surface-500 typo-caption-14-regular">
            {POST_TYPE_DISPLAY_NAME[type]}
          </Text>
          <Text className="font-semibold text-surface-900 typo-body-16-bold">
            {title}
          </Text>
        </View>
      ) : (
        <Text className="mb-[6px] font-semibold text-surface-900 typo-body-16-bold">
          {title}
        </Text>
      )}

      <Text
        className="mb-3 text-surface-600 typo-body-15-regular"
        numberOfLines={1}
        ellipsizeMode="tail">
        {content}
      </Text>
    </>
  );
};

export default PostContent;

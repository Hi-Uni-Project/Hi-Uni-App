import React from 'react';

import { View, Text } from 'react-native';

import TitleText from '../atoms/TitleText';
import TypeChip from '../atoms/TypeChip';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

interface Props {
  title: string;
  content: string;
  type: PostType;
  vertical?: boolean;
  typeHide?: boolean;
}

const PostContent = ({ title, content, type, vertical, typeHide }: Props) => {
  return (
    <View>
      {vertical && typeHide ? (
        <View className="mb-[6px] flex-row items-center space-x-2">
          <TypeChip type={type} />
          <View className="flex-1">
            <TitleText title={title} />
          </View>
        </View>
      ) : (
        <View className="mb-[6px]">
          <TitleText title={title} />
        </View>
      )}

      <Text
        className="mb-3 text-surface-600 typo-body-15-regular"
        numberOfLines={1}
        ellipsizeMode="tail">
        {content}
      </Text>
    </View>
  );
};

export default PostContent;

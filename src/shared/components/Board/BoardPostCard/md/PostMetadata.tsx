import React from 'react';

import { View, Text } from 'react-native';

import { formatDateOrTime, formatMajor } from '@/shared/utils/formatter';

interface Props {
  firstMajorName: string;
  secondMajorName: string;
  createdAt: string;
}

const PostMetadata = ({
  firstMajorName,
  secondMajorName,
  createdAt,
}: Props) => {
  return (
    <View className="flex-row space-x-1">
      <Text className="text-surface-500 typo-caption-13-light">익명</Text>
      <Text className="text-surface-500 typo-caption-13-light">
        · {formatMajor(firstMajorName, secondMajorName)}
      </Text>
      <Text className="text-surface-500 typo-caption-13-light">
        · {formatDateOrTime(createdAt)}
      </Text>
    </View>
  );
};

export default PostMetadata;

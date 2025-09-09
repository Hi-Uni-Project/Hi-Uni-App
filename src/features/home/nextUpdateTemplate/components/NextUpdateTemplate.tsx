import React from 'react';

import { View, Text } from 'react-native';

interface Props {
  title: string;
}

const NextUpdateTemplate = ({ title }: Props) => {
  return (
    <View className="space-y-[15px] px-5">
      <Text className="text-main-text typo-sub-title-22-bold">{title}</Text>

      <Text className="mr-1 text-surface-400 typo-body-16-medium">
        준비 중이에요! 곧 다음 업데이트에서 만나요 ✨
      </Text>
    </View>
  );
};

export default NextUpdateTemplate;

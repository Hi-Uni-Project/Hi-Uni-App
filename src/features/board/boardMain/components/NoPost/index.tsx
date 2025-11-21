import React from 'react';

import { View, Text } from 'react-native';

const NoPosts = () => {
  return (
    <View className="min-h-[400px] items-center justify-center">
      <Text className="text-surface-400 typo-body-16-medium">
        현재 등록된 글이 없어요.
      </Text>
      <Text className="text-surface-400 typo-body-16-medium">
        가장 먼저 글을 등록해보세요!
      </Text>
    </View>
  );
};

export default NoPosts;

import React from 'react';

import { View, Text } from 'react-native';

const NoHotBoard = () => {
  return (
    <View className="h-[80%] items-center justify-center">
      <Text className="text-surface-400 typo-body-16-medium">
        이번주 인기 게시물이 아직 없어요.
      </Text>
    </View>
  );
};

export default NoHotBoard;

import React from 'react';

import { View, Text } from 'react-native';

const NoRecent = () => {
  return (
    <View className="flex-1 items-center justify-center pt-6">
      <Text className="text-surface-400 typo-body-16-medium">
        최근 검색어가 없어요.
      </Text>
    </View>
  );
};

export default NoRecent;

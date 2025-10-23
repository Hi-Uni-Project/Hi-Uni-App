import React from 'react';

import { View, Text } from 'react-native';

import StatusIcons from '@/shared/icons/StatusIcons';

const NoSearchResult = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-[14px]">
      <StatusIcons status="caution" width={32} height={32} color="#979797" />
      <Text className="text-surface-500 typo-sub-title-18-medium">
        검색 결과가 없어요.
      </Text>
    </View>
  );
};

export default NoSearchResult;

// 프론트에서 스켈레톤 UI 적용 전 임시 로딩 컴포넌트입니다.

import React from 'react';

import { View, Text, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#8B5CF6" />
      <Text className="mt-4 text-surface-500 typo-body-15-regular">
        게시글을 불러오는 중...
      </Text>
    </View>
  );
};

export default Loading;

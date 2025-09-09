import React from 'react';

import { View, Text } from 'react-native';

const LoginHeader = () => {
  // font 및 박스 임시 스타일링
  return (
    <View className="flex-1 items-center gap-5 pt-24">
      <Text className="mb-2 text-surface-700 typo-sub-title-18-medium">
        대학생활 커리어 여정을 함께하는 곳
      </Text>

      <View className="h-[129px] w-[129px] bg-[#D9D9D9]" />
    </View>
  );
};

export default LoginHeader;

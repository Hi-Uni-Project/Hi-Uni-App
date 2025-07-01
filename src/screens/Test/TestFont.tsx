import React from 'react';

import { View, Text, ScrollView } from 'react-native';

const TestFont = () => {
  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <View className="space-y-4">
        {/* 비교용 기본 폰트 */}
        <Text className="text-sm text-gray-400">시스템 폰트 확인용</Text>
        <Text style={{ fontFamily: 'System', fontSize: 16 }}>
          기본 시스템 폰트설정된거 확인
        </Text>
        {/* Title */}
        <Text className="text-sm text-gray-400">Title</Text>
        <Text className="font-title text-title">Pretendard Bold 26</Text>

        {/* Subtitle */}
        <Text className="text-sm text-gray-400">Subtitle</Text>
        <Text className="font-subtitle text-subtitle">
          Pretendard Medium 18
        </Text>

        {/* Body */}
        <Text className="text-sm text-gray-400">Body</Text>
        <Text className="font-body text-body">Pretendard Bold 16</Text>
        <Text className="font-body-regular text-body-regular-16">
          Pretendard Regular 16
        </Text>
        <Text className="font-body-regular text-body-regular-15">
          Pretendard Regular 15
        </Text>
        <Text className="font-body-semibold text-body-semibold">
          Pretendard Semibold 14
        </Text>
        <Text className="font-body-light text-body-light-13">
          Pretendard Light 13
        </Text>
        <Text className="font-body-light text-body-light-12">
          Pretendard Light 12
        </Text>

        {/* Error */}
        <Text className="text-sm text-gray-400">Error</Text>
        <Text className="font-error text-error text-text-red">
          Pretendard Medium 14
        </Text>
        <Text className="font-error-regular text-error-regular text-text-red">
          Pretendard Regular 14
        </Text>

        {/* Button */}
        <Text className="text-sm text-gray-400">Main Button</Text>
        <Text className="font-button text-button">Pretendard Semibold 18</Text>
        <Text className="font-button-16 text-button-16">
          Pretendard Semibold 16
        </Text>
      </View>
    </ScrollView>
  );
};

export default TestFont;

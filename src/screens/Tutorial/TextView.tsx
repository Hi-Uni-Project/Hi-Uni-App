import React from 'react';

import { View, Text } from 'react-native';

import TextProvider from './TextProvider';

const TextView = ({ currentStep }: { currentStep: number }) => {
  const textProvider = TextProvider;
  return (
    <View className="flex-1">
      <View className="m-5 mt-28">
        <Text className="text-center typo-title-26-bold">
          {textProvider[currentStep].title}
        </Text>
        <Text className="mt-2 text-center text-gray-600 typo-sub-title-18-medium">
          {textProvider[currentStep].subTitle}
        </Text>
      </View>
    </View>
  );
};

export default TextView;

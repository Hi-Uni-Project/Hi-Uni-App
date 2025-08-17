import React from 'react';

import { View } from 'react-native';
import Animated, { FadeOutUp, FadeInDown } from 'react-native-reanimated';

import TextProvider from './TextProvider';

interface Props {
  currentStep: number;
}

const TextView = ({ currentStep }: Props) => {
  const textProvider = TextProvider;
  return (
    <View key={`TextView-${currentStep}`} className="flex-1">
      <View className="m-5 mt-28">
        {textProvider[currentStep].title.split('\n').map((line, index) => (
          <Animated.Text
            key={`TextView-${currentStep}-Title-${index}`}
            entering={FadeInDown.delay(300).duration(400 + index * 80)}
            exiting={FadeOutUp.duration(300)}
            className="text-center typo-title-26-bold">
            {line}
          </Animated.Text>
        ))}

        <View className="mb-4" />

        {textProvider[currentStep].subTitle.split('\n').map((line, index) => (
          <Animated.Text
            key={`TextView-${currentStep}-subTitle-${index}`}
            entering={FadeInDown.delay(300).duration(600 + index * 80)}
            exiting={FadeOutUp.duration(300)}
            className="text-center text-gray-600 typo-sub-title-18-medium">
            {line}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

export default TextView;

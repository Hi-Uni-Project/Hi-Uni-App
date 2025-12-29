import React from 'react';

import { ImageSourcePropType, View } from 'react-native';
import Animated, { FadeOutUp, FadeInDown } from 'react-native-reanimated';

import ONBOARDING_PROVIDER from '../../../shared/constants/onboardingProvider';

interface Props {
  currentStep: number;
}

const TextView = ({ currentStep }: Props) => {
  const onboardingProvider = ONBOARDING_PROVIDER;

  const onboardingImages: Record<number, ImageSourcePropType> = {
    0: require('@/assets/onboarding/onboarding-1.png'),
    1: require('@/assets/onboarding/onboarding-2.png'),
    2: require('@/assets/onboarding/onboarding-3.png'),
    3: require('@/assets/onboarding/onboarding-4.png'),
  };

  return (
    <View key={`TextView-${currentStep}`} className="flex-1">
      <View className="m-5 mt-28">
        {onboardingProvider[currentStep].title
          .split('\n')
          .map((line, index) => (
            <Animated.Text
              key={`TextView-${currentStep}-Title-${index}`}
              entering={FadeInDown.delay(300).duration(400 + index * 80)}
              exiting={FadeOutUp.duration(300)}
              className="text-center text-main-text typo-title-28-bold">
              {line}
            </Animated.Text>
          ))}

        <View className="mb-3" />

        {onboardingProvider[currentStep].subTitle
          .split('\n')
          .map((line, index) => (
            <Animated.Text
              key={`TextView-${currentStep}-subTitle-${index}`}
              entering={FadeInDown.delay(300).duration(600 + index * 80)}
              exiting={FadeOutUp.duration(300)}
              className="text-center text-surface-600 typo-sub-title-18-medium">
              {line}
            </Animated.Text>
          ))}
      </View>

      <View className="mb-24 flex-1 items-center justify-center">
        <Animated.Image
          key={`TextView-${currentStep}-Image`}
          entering={FadeInDown.delay(300).duration(800)}
          exiting={FadeOutUp.duration(300)}
          className="h-[450px] w-[340px]"
          source={onboardingImages[currentStep]}
          width={1}
          height={1}
        />
      </View>
    </View>
  );
};

export default TextView;

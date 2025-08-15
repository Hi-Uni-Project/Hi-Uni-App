import React, { useState } from 'react';

import { Text, SafeAreaView, View, Pressable } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import ButtonView from './ButtonView';
import PaginationView from './PaginationView';
import TextProvider from './TextProvider';
import TextView from './TextView';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useSharedValue<number>(0);
  const textProvider = TextProvider;

  const movePageByIndex = (index: number) => {
    const length = textProvider.length;

    if (index < length) {
      setCurrentStep(index);
      progress.value = withSpring(index);
    } else {
      // navigating 및 온보딩 여부 체크가 들어갑니다.
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#F9F9F9]">
      <TextView currentStep={currentStep} />
      <ButtonView
        currentStep={currentStep}
        onNext={() => {
          movePageByIndex(currentStep + 1);
        }}
      />
      <View className="relative w-full items-center justify-center py-5">
        <PaginationView progress={progress} data={textProvider} />
        <Pressable
          className="absolute right-5"
          onPress={() => {
            // navigating 들어갑니다.

            // 개발 단계에서는 임시로 첫 번째 페이지로 이동하는 코드 넣어두겠습니다.
            if (process.env.NODE_ENV === 'development') {
              movePageByIndex(0);
            }
          }}>
          <Text className="text-gray-500">건너뛰기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

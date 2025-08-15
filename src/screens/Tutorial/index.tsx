import React, { useState } from 'react';

import { Text, SafeAreaView, View, Pressable } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import ButtonView from './ButtonView';
import PaginationView from './PaginationView';
import TextProvider from './TextProvider';
import TextView from './TextView';

const TutorialScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useSharedValue<number>(0);
  const textProvider = TextProvider;

  const onPressPagination = (index: number) => {
    progress.value = withSpring(index);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#F9F9F9]">
      <TextView currentStep={currentStep} />
      <ButtonView
        currentStep={currentStep}
        onNext={() => {
          setCurrentStep(currentStep + 1);
          onPressPagination(currentStep + 1);
        }}
      />
      <View className="relative w-full items-center justify-center py-5">
        <PaginationView progress={progress} data={textProvider} />
        <Pressable
          className="absolute right-3"
          onPress={() => {
            setCurrentStep(0);
            onPressPagination(0);
          }}>
          <Text>건너뛰기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TutorialScreen;

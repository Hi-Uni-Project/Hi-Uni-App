import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import ButtonView from './ButtonView';
import PaginationView from './PaginationView';
import TextView from './TextView';

import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ONBOARDING_PROVIDER from '@/shared/constants/onboardingProvider';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useSharedValue<number>(0);
  const onboardingProvider = ONBOARDING_PROVIDER;
  const navigation = useNavigation<MainStackNavigationProp>();

  const movePageByIndex = (index: number) => {
    const length = onboardingProvider.length;

    if (index < length) {
      setCurrentStep(index);
      progress.value = withSpring(index);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <ScreenLayout className="items-center justify-center">
      <TextView currentStep={currentStep} />
      <ButtonView
        currentStep={currentStep}
        onNext={() => {
          movePageByIndex(currentStep + 1);
        }}
      />
      <View className="relative w-full items-center justify-center py-5">
        <PaginationView progress={progress} data={onboardingProvider} />
        <Pressable
          className="absolute right-5"
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text className="text-surface-500 typo-body-15-medium">건너뛰기</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default OnboardingScreen;

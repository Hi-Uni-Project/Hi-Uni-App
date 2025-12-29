import React from 'react';

import { Image, View } from 'react-native';

import { useUserRegister } from '@/features/register/hooks/useUserRegister';
import WelcomeTextBox from '@/features/welcome/components/WelcomeTextBox';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const SignupSuccessScreen = () => {
  const { handleRegister } = useUserRegister();

  return (
    <ScreenLayout className="items-center bg-primary-purple">
      <WelcomeTextBox
        main="환영합니다!"
        sub={`하이유니와 함께
커리어 성장하실 준비되셨나요?`}
      />

      <View className="flex-1 justify-end">
        <Image
          className="h-[600px] w-[340px] self-center"
          source={require('@/assets/success/success.png')}
          resizeMode="contain"
        />
      </View>

      <HUButton
        variant="black"
        text="커리어 성장하러가기"
        onPress={handleRegister}
      />
    </ScreenLayout>
  );
};

export default SignupSuccessScreen;

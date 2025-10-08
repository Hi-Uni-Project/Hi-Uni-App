import React from 'react';

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

      <HUButton
        variant="black"
        text="커리어 성장하러가기"
        onPress={handleRegister}
      />
    </ScreenLayout>
  );
};

export default SignupSuccessScreen;

import React from 'react';

import LoginBottomSheet from '@/features/login/components/LoginBottomSheet';
import LoginHeader from '@/features/login/components/LoginHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const LoginScreen = () => {
  return (
    <ScreenLayout>
      <LoginHeader />

      <LoginBottomSheet />
    </ScreenLayout>
  );
};

export default LoginScreen;

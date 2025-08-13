import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import LoginBottomSheet from '@/features/login/components/LoginBottomSheet';
import LoginHeader from '@/features/login/components/LoginHeader';

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      <LoginHeader />

      <LoginBottomSheet />
    </SafeAreaView>
  );
};

export default LoginScreen;

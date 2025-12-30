import React from 'react';

import { Image, Platform, View } from 'react-native';

import LoginBottomSheet from '@/features/login/components/LoginBottomSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const LoginScreen = () => {
  const paddingBottom = Platform.OS === 'ios' ? 'pb-[165px]' : 'pb-[105px]';

  return (
    <ScreenLayout>
      <View className={`flex-1 justify-end ${paddingBottom}`}>
        <Image
          className="h-[600px] w-[340px] self-center"
          source={require('@/assets/login/login.png')}
          width={1}
          height={1}
        />
      </View>

      <LoginBottomSheet />
    </ScreenLayout>
  );
};

export default LoginScreen;

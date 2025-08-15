import React from 'react';

import { View, Text } from 'react-native';

import SocialLoginSection from '../ui/organisms/SocialLoginSection';

const LoginBottomSheet = () => {
  return (
    <View className="absolute bottom-0 w-full items-center rounded-t-3xl bg-primary-purple px-5 py-6">
      <Text className="mb-6 text-center text-white typo-body-16-regular">
        로그인/회원가입하고{'\n'}하이유니와 함께 커리어 성장하러 가볼까요?
      </Text>

      <SocialLoginSection />
    </View>
  );
};

export default LoginBottomSheet;

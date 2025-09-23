import React from 'react';

import { View } from 'react-native';

import { loginApi } from '../../api/loginApi';
import { loginStrategies } from '../../lib/socialStrategies';
import { LoginRequest, SocialTypes } from '../../types';

import { SOCIAL_PROVIDERS } from '@/shared/constants/socialProvider';
import HUButton from '@/shared/ui/atoms/HUButton';

const SocialLoginSection = () => {
  // 유저 세션 비즈니스 로직 구현하면서 서비스 함수 한번에 정리 예정입니다.
  // 이번 PR 에서는 러프하게 봐주셔도 되는 코드들입니다.
  const handleSocialLogin = async (provider: SocialTypes) => {
    try {
      const authToken = await loginStrategies[provider]();

      // setSocialAccessToken(socialAccessToken);

      // handleLogin({ socialType, socialAccessToken });

      console.log(authToken);

      handleLogin({ authToken, provider });
    } catch (err) {
      console.error(`${provider} 로그인 실패:`, err);
    }
  };

  const handleLogin = async (loginPayload: LoginRequest) => {
    try {
      const response = await loginApi(loginPayload);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="w-full items-center gap-[7px] pb-11">
      {SOCIAL_PROVIDERS.map(provider => (
        <HUButton
          key={provider.id}
          variant={provider.id}
          text={provider.text}
          onPress={() => handleSocialLogin(provider.id)}
        />
      ))}
    </View>
  );
};
export default SocialLoginSection;

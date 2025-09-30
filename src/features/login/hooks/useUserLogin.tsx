import { loginApi } from '../api/loginApi';
import { loginStrategies } from '../lib/socialStrategies';
import { LoginRequest, LoginResponse, SocialTypes } from '../types';

import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useUserStore } from '@/shared/stores/user';

export const useLoginService = (navigation: MainStackNavigationProp) => {
  const { setAccessToken, setRefreshToken, setAuthToken, setUserSocialType } =
    useUserStore();

  const handleSocialLogin = async (provider: SocialTypes) => {
    try {
      const authToken = await loginStrategies[provider]();
      setAuthToken(authToken);
      setUserSocialType(provider);

      handleLogin({ authToken, provider });
    } catch (err) {
      console.error(`${provider} 로그인 실패:`, err);
    }
  };

  const handleLogin = async (loginPayload: LoginRequest) => {
    try {
      const response = await loginApi(loginPayload);

      if (response.data.isSignUp) {
        handleSuccessfulLogin(response);
      } else {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        navigation.navigate('SignupRoute');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  const handleSuccessfulLogin = (response: LoginResponse) => {
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    navigation.navigate('HomeRoute');
  };

  return {
    handleSocialLogin,
  };
};

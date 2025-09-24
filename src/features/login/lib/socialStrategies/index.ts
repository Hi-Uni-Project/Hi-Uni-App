import { SocialLoginFunction, SocialTypes } from '../../types';

import { googleLogin } from './google';
import { kakaoLogin } from './kakao';
import { naverLogin } from './naver';

export const loginStrategies: Record<SocialTypes, SocialLoginFunction> = {
  naver: naverLogin,
  kakao: kakaoLogin,
  google: googleLogin,
  apple: kakaoLogin, // 임시
};

import { ResponseType } from '@/shared/api/types';

export type SocialTypes = 'kakao' | 'naver' | 'google' | 'apple';
export type SocialLoginFunction = () => Promise<string>;

export interface LoginRequest {
  provider: SocialTypes;
  authToken: string;
}

export interface Login {
  accessToken: string;
  refreshToken: string;
  isSignUp: boolean;
}

export type LoginResponse = ResponseType<Login>;

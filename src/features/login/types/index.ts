import { ResponseTypes } from '@/shared/api/types';

export type SocialTypes = 'kakao' | 'naver' | 'google' | 'apple';
export type SocialLoginFunction = () => Promise<string>;

export interface LoginRequest {
  provider: SocialTypes;
  authToken: string;
}

export interface SocialInfo {
  provider: SocialTypes;
  socialEmail: string;
}

export interface UnivInfo {
  univName: string;
  univEmail: string;
  firstMajorName: string;
  secondMajorName: string;
}

export interface User {
  social: SocialInfo;
  univ: UnivInfo;
  tos: TosInfo;
}

export interface TosInfo {
  inPersonTosIsAgreed: boolean;
  marketingTosIsAgreed: boolean;
  personalInfoTosIsAgreed: boolean;
  serviceImprovementTosIsAgreed: boolean;
  serviceTosIsAgreed: boolean;
}

export interface Login {
  accessToken: string;
  refreshToken: string;
  isSignUp: boolean;
  user: User;
}

export type LoginResponse = ResponseTypes<Login>;

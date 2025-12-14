import React from 'react';

import { SocialTypes } from '@/features/login/types';
import Apple from '@/static/icons/apple-icon.svg';
import Google from '@/static/icons/google-icon.svg';
import Kakao from '@/static/icons/kakao-icon.svg';
import Naver from '@/static/icons/naver-icon.svg';

interface Props {
  socialTypes: SocialTypes;
}

const SocialProviderIcons = ({ socialTypes }: Props) => {
  switch (socialTypes) {
    case 'naver':
      return <Naver />;
    case 'apple':
      return <Apple />;
    case 'google':
      return <Google />;
    case 'kakao':
      return <Kakao />;
    default:
      return null;
  }
};

export default SocialProviderIcons;

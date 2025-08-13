import React from 'react';

import Apple from '@/assets/buttons/apple-button.svg';
import Google from '@/assets/buttons/google-button.svg';
import Kakao from '@/assets/buttons/kakao-button.svg';
import Naver from '@/assets/buttons/naver-button.svg';

interface Props {
  provider: 'kakao' | 'naver' | 'google' | 'apple';
}

const SocialButtons = ({ provider }: Props) => {
  switch (provider) {
    case 'apple':
      return <Apple />;
    case 'google':
      return <Google />;
    case 'kakao':
      return <Kakao />;
    case 'naver':
      return <Naver />;
    default:
      return null;
  }
};

export default SocialButtons;

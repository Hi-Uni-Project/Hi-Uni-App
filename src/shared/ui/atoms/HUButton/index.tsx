import React from 'react';

import { cva } from 'class-variance-authority';
import { Pressable, PressableProps, Text } from 'react-native';

import { cn } from '@/shared/lib/cn';
import AppleIcon from '@/static/icons/apple.svg';
import GoogleIcon from '@/static/icons/google.svg';
import KakaoIcon from '@/static/icons/kakao.svg';
import NaverIcon from '@/static/icons/naver.svg';

interface Props extends PressableProps {
  variant?: 'primary' | 'kakao' | 'naver' | 'google' | 'apple' | 'black';
  text?: string;
}

const buttonVariants = cva(
  'flex justify-center items-center shrink-0 border-none w-[350px] h-[68px]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-purple rounded-full ',
        kakao: 'bg-kakao rounded-[12px]',
        naver: 'bg-naver rounded-[12px]',
        google: 'bg-google rounded-[12px]',
        apple: 'bg-apple rounded-[12px]',
        black: 'bg-secondary-black rounded-full',
      },
      disabled: {
        true: 'bg-gray-300 cursor-not-allowed',
        false: '',
      },
    },
  },
);

const textVariants = cva('typo-main-button-16-semibold', {
  variants: {
    variant: {
      primary: 'text-white typo-main-button-18-semibold',
      kakao: 'text-[#181600]',
      naver: 'text-white',
      google: 'text-[#101010]',
      apple: 'text-white',
      black: 'text-white typo-main-button-18-semibold',
    },
    disabled: {
      true: 'text-white',
      false: '',
    },
  },
});

const HUButton = ({
  variant = 'primary',
  className,
  text = '',
  disabled = false,
  ...props
}: Props) => {
  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, disabled }),
        className,
        'relative',
      )}
      disabled={disabled}
      {...props}>
      {variant === 'kakao' && (
        <KakaoIcon
          className="absolute left-[17px] top-[21px]"
          width={23}
          height={21}
        />
      )}
      {variant === 'naver' && (
        <NaverIcon
          className="absolute left-[19px] top-[21px]"
          width={21}
          height={21}
        />
      )}
      {variant === 'google' && (
        <GoogleIcon
          className="absolute left-5 top-[22px]"
          width={21}
          height={21}
        />
      )}
      {variant === 'apple' && (
        <AppleIcon
          className="absolute left-[22px] top-[21px]"
          width={17}
          height={21}
        />
      )}
      <Text className={textVariants({ variant, disabled })}>{text}</Text>
    </Pressable>
  );
};

export default HUButton;

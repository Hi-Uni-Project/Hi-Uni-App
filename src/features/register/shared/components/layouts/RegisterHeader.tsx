import React from 'react';

import { View, Text } from 'react-native';

interface RegisterHeaderProps {
  main: string;
  sub: string;
  reverse?: boolean;
  variant?: 'default' | 'code';
}

const RegisterHeader = ({
  main,
  sub,
  reverse = false,
  variant = 'default',
}: RegisterHeaderProps) => {
  if (variant === 'code') {
    return (
      <View className="mt-3 items-center space-y-2 px-8">
        <Text className="text-main-text typo-title-26-bold">{main}</Text>
        <Text className="text-center text-surface-600 typo-body-16-regular">
          {sub}
        </Text>
      </View>
    );
  }

  const firstText = reverse ? sub : main;
  const secondText = reverse ? main : sub;
  const firstStyle = reverse
    ? 'text-main-text typo-title-26-bold'
    : 'text-surface-600 typo-sub-title-18-medium';
  const secondStyle = reverse
    ? 'text-surface-600 typo-sub-title-18-medium'
    : 'text-main-text typo-title-26-bold';

  return (
    <View className="space-y-1 pl-[30px]">
      <Text className={firstStyle}>{firstText}</Text>
      <Text className={secondStyle}>{secondText}</Text>
    </View>
  );
};

export default RegisterHeader;

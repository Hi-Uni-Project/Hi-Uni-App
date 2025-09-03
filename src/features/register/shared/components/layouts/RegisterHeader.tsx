import React from 'react';

import { View, Text } from 'react-native';

interface RegisterHeaderProps {
  main: string;
  sub: string;
  variant?: 'default' | 'code';
}

const RegisterHeader = ({
  main,
  sub,
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

  return (
    <View className="space-y-1 pl-[30px]">
      <Text className="text-surface-600 typo-sub-title-18-medium">{main}</Text>
      <Text className="text-main-text typo-title-26-bold">{sub}</Text>
    </View>
  );
};

export default RegisterHeader;

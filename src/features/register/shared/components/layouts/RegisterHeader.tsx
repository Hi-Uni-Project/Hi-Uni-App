import React from 'react';

import { View, Text } from 'react-native';

interface Props {
  main: string;
  sub: string;
}

const RegisterHeader = ({ main, sub }: Props) => {
  return (
    <View className="space-y-1 pl-[30px]">
      <Text className="text-surface-600 typo-sub-title-18-medium">{main}</Text>
      <Text className="text-main-text typo-title-26-bold">{sub} </Text>
    </View>
  );
};

export default RegisterHeader;

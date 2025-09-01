import React from 'react';

import { View, Text } from 'react-native';

import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';

interface Props {
  main: string;
  sub: string;
}

const WelcomeTextBox = ({ main, sub }: Props) => {
  return (
    <RegisterDefaultLayout className="mt-20">
      <View className="items-center gap-[7px]">
        <Text className="text-white typo-title-28-bold">{main}</Text>
        <Text className="text-center text-kakao typo-sub-title-18-medium">
          {sub}
        </Text>
      </View>
    </RegisterDefaultLayout>
  );
};

export default WelcomeTextBox;

import React, { ReactNode } from 'react';

import { ScrollView, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeHeader from '@/features/home/shared/components/HomeHeader';

interface Props extends ViewProps {
  children: ReactNode;
}

const HomeScrollLayout = ({ children }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="relative">
      <HomeHeader />
      <ScrollView style={{ marginTop: insets.top + 70 }}>{children}</ScrollView>
    </View>
  );
};

export default HomeScrollLayout;

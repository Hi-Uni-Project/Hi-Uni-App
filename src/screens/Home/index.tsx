import React from 'react';

import { View } from 'react-native';

import NextUpdateTemplate from '@/features/home/components/NextUpdateTemplate';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HomeScreen = () => {
  return (
    <ScreenLayout>
      <View style={{ rowGap: 75 }}>
        <NextUpdateTemplate title="대외활동" />

        <NextUpdateTemplate title="인턴십" />

        <NextUpdateTemplate title="채용공고" />
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

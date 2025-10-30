import React from 'react';

import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarDetailHeader from '../layouts/CalendarDetailHeader';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const EditSchedule = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenLayout>
      <CalendarDetailHeader />
      <View style={{ marginTop: insets.top }}>
        <Text>Edit Schedule Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default EditSchedule;

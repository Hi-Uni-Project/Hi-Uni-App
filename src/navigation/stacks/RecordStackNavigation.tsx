import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';

import { RecordNavigationProps } from '../types/navigationTypes';

import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';

const Stack = createNativeStackNavigator<RecordNavigationProps>();

const Dummy = () => {
  return (
    <>
      <HeaderWithBack />
      <ScrollView>
        <View className="h-[3200px] w-full bg-red-50" />
      </ScrollView>
    </>
  );
};

const RecordRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResumeSection" component={Dummy} />
    </Stack.Navigator>
  );
};

export default RecordRoute;

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BoardRoute from './stacks/BoardStackNavigation';
import HomeRoute from './stacks/HomeStackNavigator';
import OnboardRoute from './stacks/OnboardStackNavigation';
import { MainNavigationProps } from './types/navigationTypes';

const Stack = createNativeStackNavigator<MainNavigationProps>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoute"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardRoute" component={OnboardRoute} />

      <Stack.Screen name="HomeRoute" component={HomeRoute} />

      <Stack.Screen name="BoardRoute" component={BoardRoute} />

      {/* <Stack.Screen name="RecordRoute" component={RecordRoute} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;

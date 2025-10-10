import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardRoute from './stacks/OnboardStackNavigation';
import HomeTabScreens from './tabs/TabNavigator';
import { MainNavigationProps } from './types/navigationTypes';

const Stack = createNativeStackNavigator<MainNavigationProps>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoute"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardRoute" component={OnboardRoute} />

      <Stack.Screen name="HomeRoute" component={HomeTabScreens} />
    </Stack.Navigator>
  );
};

export default MainStack;

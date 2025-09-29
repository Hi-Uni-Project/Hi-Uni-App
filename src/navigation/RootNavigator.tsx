import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './stacks/SignupStackNavigator';
import HomeTabScreens from './tabs/TabNavigator';
import { MainNavigationProps } from './types/navigationTypes';

import LoginScreen from '@/screens/Login';
import OnboardingScreen from '@/screens/Onboarding';

const Stack = createNativeStackNavigator<MainNavigationProps>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding" // 자동로그인 구현 시 -> Home으로 변경
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignupRoute" component={SignupRoute} />

      <Stack.Screen name="HomeRoute" component={HomeTabScreens} />
    </Stack.Navigator>
  );
};

export default MainStack;

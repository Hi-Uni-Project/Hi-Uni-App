import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardNavigationProps } from '../types/navigationTypes';

import HomeRoute from './HomeStackNavigator';
import SignupRoute from './SignupStackNavigator';

import LoginScreen from '@/screens/Login';
import OnboardingScreen from '@/screens/Onboarding';

const Stack = createNativeStackNavigator<OnboardNavigationProps>();

const OnboardRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="SignupRoute" component={SignupRoute} />

      <Stack.Screen name="HomeRoute" component={HomeRoute} />
    </Stack.Navigator>
  );
};

export default OnboardRoute;

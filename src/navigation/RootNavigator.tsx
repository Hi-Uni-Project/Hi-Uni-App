import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/screens/Login';
import OnboardingScreen from '@/screens/Onboarding';
import SCREEN_NAME_PROVIDER from '@/shared/constants/screenNameProvider';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAME_PROVIDER.ONBOARDING}>
      <Stack.Screen
        name={SCREEN_NAME_PROVIDER.ONBOARDING}
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAME_PROVIDER.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

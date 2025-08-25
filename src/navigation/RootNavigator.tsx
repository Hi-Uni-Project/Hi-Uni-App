import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/screens/Login';
import OnboardingScreen from '@/screens/Onboarding';
import TermsScreen from '@/screens/Terms';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Term" component={TermsScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;

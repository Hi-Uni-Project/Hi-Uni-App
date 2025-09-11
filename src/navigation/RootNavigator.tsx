import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabScreens from './TabNavigator';

import LoginScreen from '@/screens/Login';
import OnboardingScreen from '@/screens/Onboarding';
import MailCodeInput from '@/screens/Register/MailCodeInput';
import MailInput from '@/screens/Register/MailInput';
import SearchMyDepartment from '@/screens/Register/SearchMyDepartment';
import SearchMyUniv from '@/screens/Register/SearchMyUniv';
import TermsScreen from '@/screens/Terms';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Term" component={TermsScreen} />
      <Stack.Screen name="SearchMyUniv" component={SearchMyUniv} />
      <Stack.Screen name="SearchMyDepartment" component={SearchMyDepartment} />
      <Stack.Screen name="MailInput" component={MailInput} />
      <Stack.Screen name="MailCodeInput" component={MailCodeInput} />

      <Stack.Screen name="Home" component={HomeTabScreens} />
    </Stack.Navigator>
  );
};

export default RootStack;

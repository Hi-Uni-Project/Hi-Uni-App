import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignupNavigationProps } from '../types/navigationTypes';

import MailCodeInputScreen from '@/screens/Register/MailCodeInput';
import MailInputScreen from '@/screens/Register/MailInput';
import SearchMyDepartmentScreen from '@/screens/Register/SearchMyDepartment';
import SearchMyUnivScreen from '@/screens/Register/SearchMyUniv';
import SignupSuccessScreen from '@/screens/Register/SignupSuccess';
import TermsScreen from '@/screens/Terms';

const SignupRoute = () => {
  const Stack = createNativeStackNavigator<SignupNavigationProps>();

  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Terms"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Univ" component={SearchMyUnivScreen} />
      <Stack.Screen name="Department" component={SearchMyDepartmentScreen} />
      <Stack.Screen name="InputEmail" component={MailInputScreen} />
      <Stack.Screen name="InputCode" component={MailCodeInputScreen} />
      <Stack.Screen
        name="SignupSuccess"
        component={SignupSuccessScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SignupRoute;

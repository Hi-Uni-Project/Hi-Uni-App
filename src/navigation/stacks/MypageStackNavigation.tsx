import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MypageNavigationProps } from '../types/navigationTypes';

import MypageMain from '@/screens/Mypage';
import AccountManage from '@/screens/Mypage/AccountManage';
import MyScrab from '@/screens/Mypage/MyScrab';

const Stack = createNativeStackNavigator<MypageNavigationProps>();

const MypageRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MypageMain" component={MypageMain} />
      <Stack.Screen name="MyScrab" component={MyScrab} />
      <Stack.Screen name="AccountManage" component={AccountManage} />
    </Stack.Navigator>
  );
};

export default MypageRoute;

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeNavigationProps } from '../types/navigationTypes';

import HomeScreen from '@/screens/Home';
import HotBoardScreen from '@/screens/Home/HotBoard';

const DetailScreen = () => <>2</>;
const ProfileScreen = () => <>3</>;

const Stack = createNativeStackNavigator<HomeNavigationProps>();

const HomeRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HotBoard" component={HotBoardScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default HomeRoute;

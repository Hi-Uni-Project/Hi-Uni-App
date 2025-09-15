import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import HomeStackNavigator from '../stacks/HomeStackNavigator';

import HUTabBar, { HUTabBarProps } from '@/shared/components/HUTabBar';

const Tab = createBottomTabNavigator();

const SecondPage = () => (
  <View>
    <Text>Second Page</Text>
  </View>
);

const tabBar = (props: HUTabBarProps) => <HUTabBar {...props} />;

function HomeTabScreens() {
  return (
    <Tab.Navigator
      tabBar={tabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="Second" component={SecondPage} />
      <Tab.Screen name="Search" component={SecondPage} />
      <Tab.Screen name="Record" component={SecondPage} />
      <Tab.Screen name="Calendar" component={SecondPage} />
    </Tab.Navigator>
  );
}

export default HomeTabScreens;

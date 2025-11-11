import React, { useMemo, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import BoardScreen from '@/screens/Board';
import CalendarScreen from '@/screens/Calendar';
import HomeScreen from '@/screens/Home';
import HUTabBar, { HUTabBarProps } from '@/shared/components/HUTabBar';

const Tab = createBottomTabNavigator();

const SecondPage = () => (
  <View>
    <Text>Second Page</Text>
  </View>
);

const HomeTabScreens = () => {
  const [currentRouteName, setCurrentRouteName] = useState('HomeTab');

  const backgroundColor = useMemo(() => {
    switch (currentRouteName) {
      case 'HomeTab':
      case 'Board':
      case 'Record':
        return '';
      case 'Calendar':
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  }, [currentRouteName]);

  const tabBar = (props: HUTabBarProps) => {
    return <HUTabBar {...props} />;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}>
      <Tab.Navigator
        tabBar={tabBar}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          listeners={{ focus: () => setCurrentRouteName('HomeTab') }}
        />
        <Tab.Screen
          name="Board"
          component={BoardScreen}
          listeners={{ focus: () => setCurrentRouteName('Board') }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          listeners={{ focus: () => setCurrentRouteName('Calendar') }}
        />
        <Tab.Screen
          name="Record"
          component={SecondPage}
          listeners={{ focus: () => setCurrentRouteName('Record') }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default HomeTabScreens;

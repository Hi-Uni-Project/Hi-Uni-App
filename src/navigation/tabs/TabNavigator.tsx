import React, { useMemo, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import BoardRoute from '../stacks/BoardStackNavigation';

import CalendarScreen from '@/screens/Calendar';
import HomeScreen from '@/screens/Home';
import HUTabBar, { HUTabBarProps } from '@/shared/components/HUTabBar';
import { useTabBarStore } from '@/shared/stores/tabBar';

const Tab = createBottomTabNavigator();

const SecondPage = () => (
  <View>
    <Text>Second Page</Text>
  </View>
);

const HomeTabScreens = () => {
  const [currentRouteName, setCurrentRouteName] = useState('HomeTab');
  const isTabBarVisible = useTabBarStore(state => state.isVisible);

  const backgroundColor = useMemo(() => {
    switch (currentRouteName) {
      case 'HomeTab':
      case 'Board':
      case 'Search':
      case 'Record':
        return '';
      case 'Calendar':
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  }, [currentRouteName]);

  const tabBar = (props: HUTabBarProps) => {
    if (!isTabBarVisible) {
      return null;
    }
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
          name="Search"
          component={SecondPage}
          listeners={{ focus: () => setCurrentRouteName('Search') }}
        />
        <Tab.Screen
          name="Board"
          options={{
            unmountOnBlur: true,
          }}
          component={BoardRoute}
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

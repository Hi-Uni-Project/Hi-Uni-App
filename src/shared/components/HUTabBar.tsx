import React from 'react';

import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TabCalendarIcon from '@/shared/icons/tabBarIcons/TabCalendarIcon';
import TabChatIcon from '@/shared/icons/tabBarIcons/TabChatIcon';
import TabHomeIcon from '@/shared/icons/tabBarIcons/TabHomeIcon';
import TabRecordIcon from '@/shared/icons/tabBarIcons/TabRecordIcon';
import TabSearchIcon from '@/shared/icons/tabBarIcons/TabSearchIcon';

export interface HUTabBarProps {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const IconComponents = [
  (isSelected: boolean) => <TabHomeIcon isSelected={isSelected} />,
  (isSelected: boolean) => <TabSearchIcon isSelected={isSelected} />,
  (isSelected: boolean) => <TabChatIcon isSelected={isSelected} />,
  (isSelected: boolean) => <TabCalendarIcon isSelected={isSelected} />,
  (isSelected: boolean) => <TabRecordIcon isSelected={isSelected} />,
];

const HUTabBar = ({ state, navigation }: HUTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row justify-between rounded-t-[20px] bg-white px-[12px] pt-[4px]"
      style={{
        paddingBottom: insets.bottom,
        boxShadow: '0px 1px 8px 0px #1111111A',
      }}>
      {state.routes.map((route, index) => {
        const isSelected = state.index === index;

        return (
          <Pressable
            key={route.key}
            className="h-[68px] items-center justify-center px-[12px]"
            onPress={() => {
              if (!isSelected) {
                navigation.navigate(route.name, route.params);
              }
            }}>
            {IconComponents[index] && IconComponents[index](isSelected)}
          </Pressable>
        );
      })}
    </View>
  );
};

export default HUTabBar;

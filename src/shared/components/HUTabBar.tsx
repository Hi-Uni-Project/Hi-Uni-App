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

  const [selected, setSelected] = React.useState(false);

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,

        height: insets.bottom + 68,
        bottom: 0,

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: insets.bottom,

        paddingTop: 4,
        backgroundColor: 'white',
        boxShadow: '0px 1px 8px 0px #1111111A',

        paddingHorizontal: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 68,
              paddingHorizontal: 12,
            }}
            onPress={() => {
              setSelected(!selected);
              onPress();
            }}
            onLongPress={onLongPress}>
            {IconComponents[index] && IconComponents[index](isFocused)}
          </Pressable>
        );
      })}
    </View>
  );
};

export default HUTabBar;

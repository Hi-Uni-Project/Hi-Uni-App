import React from 'react';

import {
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoardUpperNavigator from '@/navigation/tabs/BoardUpperNavigator';
import ProfileIcon from '@/static/icons/profile.svg';
import SearchIcon from '@/static/icons/search.svg';

const BoardHeader = ({ onTabPress }) => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    headerHeight: {
      height: insets.top + 124,
    },
    headerShadow: {
      boxShadow: '0px 0px 15px 0px #00000005',
    },
  });

  return (
    <View
      className="absolute left-0 right-0 top-0 z-10 bg-white"
      style={[styles.headerHeight, styles.headerShadow]}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: insets.top }} />

      <View className="flex-row items-center justify-between">
        <Text className="ml-[21px] text-main-text typo-sub-title-20-medium">
          제주대학교
        </Text>
        <View className="mr-[10px] h-[70px] flex-row items-center">
          <TouchableOpacity className="p-[10px]">
            <SearchIcon width={26} height={26} />
          </TouchableOpacity>
          <TouchableOpacity className="p-[10px]">
            <ProfileIcon width={26} height={26} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-[54px] bg-red-200">
        <BoardUpperNavigator onTabPress={onTabPress} />
      </View>
    </View>
  );
};

export default BoardHeader;

import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeStackNavigationProp } from '@/navigation/types/navigationTypes';
import ProfileIcon from '@/static/icons/profile.svg';
import SearchIcon from '@/static/icons/search.svg';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackNavigationProp>();

  const styles = StyleSheet.create({
    headerHeight: {
      height: insets.top + 70,
    },
    headerShadow: {
      boxShadow: '0px 0px 15px 0px #00000005',
    },
  });

  return (
    <View
      className="absolute left-0 right-0 top-0 z-10 items-end bg-white"
      style={[styles.headerHeight, styles.headerShadow]}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: insets.top }} />
      <View className="mr-[10px] h-[70px] flex-row items-center">
        <TouchableOpacity
          className="p-[10px]"
          onPress={() => navigation.navigate('HomeSearch')}>
          <SearchIcon width={26} height={26} color="#1E2128" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-[10px]"
          onPress={() => navigation.navigate('MyPageRoute')}>
          <ProfileIcon width={26} height={26} color="#1E2128" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

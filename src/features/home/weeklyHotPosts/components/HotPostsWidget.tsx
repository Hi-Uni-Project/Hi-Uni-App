import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import mockHotPosts from '../mocks/mockHotPosts';

import HotPostItem from './HotPostItem';

import { HomeStackNavigationProp } from '@/navigation/types/navigationTypes';
import CardView from '@/shared/components/CardView';
import SectionHeader from '@/shared/components/layouts/SectionHeader';
import FireIcon from '@/static/icons/fire.svg';
const Separator = () => <View className="h-[1px] bg-[#EAEAEA]" />;

const HotPostsWidgetTitle = () => (
  <View className="flex-row items-center">
    <Text className="text-main-text typo-sub-title-22-bold">주간 HOT</Text>
    <FireIcon width={18} height={20} className="ml-[6px]" />
  </View>
);

const HotPostsWidget = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<HomeStackNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  return (
    <Animated.View layout={LinearTransition} className="mt-8">
      <SectionHeader
        titleComponent={<HotPostsWidgetTitle />}
        onPressMore={() => {
          navigation.navigate('HotBoard');
        }}
      />
      <CardView className="mx-5">
        {isLoading ? (
          <Text>로딩중..</Text>
        ) : (
          <FlatList
            data={mockHotPosts.filter((_, index) => index < 4)}
            renderItem={({ item }) => <HotPostItem item={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={Separator}
            scrollEnabled={false}
          />
        )}
      </CardView>
    </Animated.View>
  );
};

export default HotPostsWidget;

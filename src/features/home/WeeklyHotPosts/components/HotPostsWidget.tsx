import React from 'react';

import { FlatList, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import mockHotPosts from '../mocks/mockHotPosts';

import HotPostItem from './HotPostItem';

import CardView from '@/shared/components/CardView';
import SectionHeader from '@/shared/components/layouts/SectionHeader';
import FireIcon from '@/static/icons/fire.svg';
const Separator = () => <View className="h-[1px] bg-[#EAEAEA]" />;

const HotPostsWidgetTitle = () => (
  <View className="flex-row items-center">
    <Text className="typo-title-22-semibold">주간 HOT</Text>
    <FireIcon width={18} height={20} className="ml-[6px]" />
  </View>
);

const HotPostsWidget = () => {
  return (
    <Animated.View layout={LinearTransition} className="mt-8">
      <SectionHeader
        titleComponent={<HotPostsWidgetTitle />}
        onPressMore={() => {
          console.log('더 보기 클릭됨');
        }}
      />
      <CardView className="mx-5">
        <FlatList
          data={mockHotPosts.filter((_, index) => index < 4)}
          renderItem={({ item }) => <HotPostItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={Separator}
          scrollEnabled={false}
        />
      </CardView>
    </Animated.View>
  );
};

export default HotPostsWidget;

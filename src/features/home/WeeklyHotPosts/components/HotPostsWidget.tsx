import React from 'react';

import { FlatList, View } from 'react-native';

import mockHotPosts from '../mocks/mockHotPosts';

import HotPostItem from './HotPostItem';

import CardView from '@/shared/components/CardView';

const Separator = () => <View className="h-[1px] bg-[#EAEAEA]" />;

const HotPostsWidget = () => {
  return (
    <CardView className="mx-5">
      <FlatList
        data={mockHotPosts.filter((_, index) => index < 4)}
        renderItem={({ item }) => <HotPostItem item={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        scrollEnabled={false}
      />
    </CardView>
  );
};

export default HotPostsWidget;

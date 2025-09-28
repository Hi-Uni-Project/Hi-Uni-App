import React from 'react';

import { FlatList, View } from 'react-native';

import HotBoardHeader from '@/features/home/hotBoard/layouts/HotBoardHeader';
import BoardHeaderColor from '@/features/home/shared/layouts/BoardHeaderColorGround';
import BoardPostCardMD from '@/shared/components/BoardPostCard/md';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { mockBoardPosts } from '@/shared/constants/boardMockData';

const HotBoardScreen = () => {
  return (
    <View className="flex-1">
      <BoardHeaderColor />
      <HotBoardHeader />

      <ScreenLayout edges={['bottom']}>
        <View className="flex-1 px-5">
          <FlatList
            data={mockBoardPosts}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => <BoardPostCardMD {...item} />}
            contentContainerStyle={{ paddingVertical: 20, gap: 8 }}
            showsVerticalScrollIndicator={false}
          />

          {/* 주간 HOT 게시글이 없을 경우 */}
          {/* <NoHotBoard /> */}
        </View>
      </ScreenLayout>
    </View>
  );
};

export default HotBoardScreen;

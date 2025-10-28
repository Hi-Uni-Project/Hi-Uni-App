import React from 'react';

import { View } from 'react-native';

import { useWeeklyHotPosts } from '@/features/home/hotBoard/hooks/useWeeklyHotPosts';
import BoardHeaderColor from '@/features/home/shared/layouts/BoardHeaderColorGround';
import BoardContentLayout from '@/shared/components/Board/layouts/BoardContentLayout';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HotBoardScreen = () => {
  const { data: boardData, isLoading } = useWeeklyHotPosts();

  return (
    <View className="flex-1">
      <BoardHeaderColor />
      <DetailBoardHeader title="주간 HOT" icon />

      <ScreenLayout edges={['bottom']}>
        <View className="flex-1 px-5">
          <BoardContentLayout
            des="인기 게시물이"
            data={boardData}
            isLoading={isLoading}
          />
        </View>
      </ScreenLayout>
    </View>
  );
};

export default HotBoardScreen;

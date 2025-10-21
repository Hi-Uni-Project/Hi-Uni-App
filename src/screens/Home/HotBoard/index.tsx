import React from 'react';

import { View } from 'react-native';

import HotBoardContent from '@/features/home/hotBoard/components/HotBoardContent';
import { useWeeklyHotPosts } from '@/features/home/hotBoard/hooks/useWeeklyHotPosts';
import HotBoardHeader from '@/features/home/hotBoard/layouts/HotBoardHeader';
import BoardHeaderColor from '@/features/home/shared/layouts/BoardHeaderColorGround';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HotBoardScreen = () => {
  const { data: boardData, isLoading } = useWeeklyHotPosts();

  return (
    <View className="flex-1">
      <BoardHeaderColor />
      <HotBoardHeader />

      <ScreenLayout edges={['bottom']}>
        <View className="flex-1 px-5">
          <HotBoardContent data={boardData} isLoading={isLoading} />
        </View>
      </ScreenLayout>
    </View>
  );
};

export default HotBoardScreen;

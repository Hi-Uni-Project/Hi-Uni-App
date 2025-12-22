import React, { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import SortBoardContentLayout from '@/shared/components/Board/layouts/SortBoardContentLayout';
import { useWeeklyHotPosts } from '@/shared/hooks/useBoardQuery';
import { useSortBoard } from '@/shared/hooks/useSortBoard';

const HotBoardScreen = () => {
  const sortBoardState = useSortBoard();
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useWeeklyHotPosts(sortBoardState.selectedSort);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SortBoardContentLayout
      title="주간 HOT"
      description="이번 주 인기 게시물이"
      posts={posts}
      isLoading={isLoading}
      sortBoardState={sortBoardState}
    />
  );
};

export default HotBoardScreen;

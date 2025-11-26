import React from 'react';

import SortBoardContentLayout from '@/shared/components/Board/layouts/SortBoardContentLayout';
import { useWeeklyHotPosts } from '@/shared/hooks/useBoardQuery';
import { useSortBoard } from '@/shared/hooks/useSortBoard';

const HotBoardScreen = () => {
  const sortBoardState = useSortBoard();
  const { data: posts = [], isLoading } = useWeeklyHotPosts(
    sortBoardState.selectedSort,
  );

  return (
    <SortBoardContentLayout
      title="주간 HOT"
      description="이번 주 인기 게시물이"
      posts={posts}
      isLoading={isLoading}
      onPostPress={() => console.log('post clicked')}
      sortBoardState={sortBoardState}
    />
  );
};

export default HotBoardScreen;

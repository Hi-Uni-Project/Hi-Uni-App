import React from 'react';

import SortBoardContentLayout from '@/shared/components/Board/layouts/SortBoardContentLayout';
import { useWeeklyHotPosts } from '@/shared/hooks/useBoardQuery';

const HotBoardScreen = () => {
  const { data: posts = [], isLoading } = useWeeklyHotPosts();

  return (
    <SortBoardContentLayout
      title="주간 HOT"
      description="이번 주 인기 게시물이"
      posts={posts}
      isLoading={isLoading}
      onPostPress={() => console.log('post clicked')}
    />
  );
};

export default HotBoardScreen;

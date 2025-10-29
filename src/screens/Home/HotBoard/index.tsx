import React from 'react';

import BoardListScreen from '@/shared/components/Board/BoardListScreen';
import { useWeeklyHotPosts } from '@/shared/hooks/useBoardQuery';

const HotBoardScreen = () => {
  return (
    <BoardListScreen
      emptyDescription="이번 주 인기 게시물이"
      title="주간 HOT"
      showHeaderIcon
      useQuery={useWeeklyHotPosts}
    />
  );
};

export default HotBoardScreen;

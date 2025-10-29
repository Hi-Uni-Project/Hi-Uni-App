import React from 'react';

import BoardListScreen from '@/shared/components/Board/BoardListScreen';
import { useMyCommentsQuery } from '@/shared/hooks/useBoardQuery';
import { useHideTabBar } from '@/shared/hooks/useHideTabBar';

const MyPosts = () => {
  useHideTabBar();

  return (
    <BoardListScreen
      title="내가 쓴 글"
      emptyDescription="아직 작성한 글이"
      useQuery={useMyCommentsQuery}
    />
  );
};

export default MyPosts;

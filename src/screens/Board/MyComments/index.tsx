import React from 'react';

import BoardListScreen from '@/shared/components/Board/BoardListScreen';
import { useMyCommentsQuery } from '@/shared/hooks/useBoardQuery';
import { useHideTabBar } from '@/shared/hooks/useHideTabBar';

const MyComments = () => {
  useHideTabBar();

  return (
    <BoardListScreen
      title="내가 댓글 단 글"
      emptyDescription="아직 댓글 단 글이"
      useQuery={useMyCommentsQuery}
    />
  );
};

export default MyComments;

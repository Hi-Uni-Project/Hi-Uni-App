import React from 'react';

import BoardListScreen from '@/shared/components/Board/BoardList';
import { useMyScrabQuery } from '@/shared/hooks/useBoardQuery';

const MyScrab = () => {
  return (
    <BoardListScreen
      title="내 스크랩"
      emptyDescription="아직 스크랩한 글이"
      useQuery={useMyScrabQuery}
    />
  );
};

export default MyScrab;

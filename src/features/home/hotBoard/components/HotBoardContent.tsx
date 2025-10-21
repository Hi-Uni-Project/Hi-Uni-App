import React from 'react';

import { FlatList } from 'react-native';

import NoHotBoard from '@/features/home/hotBoard/components/NoHotBoard';
import { WeeklyHotPost } from '@/features/home/hotBoard/types';
import BoardPostCardMD from '@/shared/components/BoardPostCard/md';
import Loading from '@/shared/ui/organisms/Loading';

interface HotBoardContentProps {
  data: WeeklyHotPost[] | undefined;
  isLoading: boolean;
}

const HotBoardContent = ({ data, isLoading }: HotBoardContentProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <NoHotBoard />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <BoardPostCardMD {...item} />}
      contentContainerStyle={{ paddingVertical: 20, gap: 8 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HotBoardContent;

import React from 'react';

import { FlatList } from 'react-native';

import BoardPostCardMD from '../BoardPostCard/md';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import NoBoardLayout from '@/shared/components/Board/layouts/NoBoardLayout';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  data: Post[] | undefined;
  isLoading: boolean;
  des: string;
}

const BoardContentLayout = ({ data, isLoading, des }: Props) => {
  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <NoBoardLayout des={des} />;
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

export default BoardContentLayout;

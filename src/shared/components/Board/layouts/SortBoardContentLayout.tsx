// src/shared/components/Board/layouts/BoardListTemplate.tsx
import React from 'react';

import { View } from 'react-native';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';
import NoBoardLayout from '@/shared/components/Board/layouts/NoBoardLayout';
import SortPostList from '@/shared/components/Board/SortPostList';
import { useSortBoard } from '@/shared/hooks/useSortBoard';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  title: string;
  icon?: boolean;
  description?: string;
  posts: Post[] | undefined;
  isLoading: boolean;
  onPostPress: (post: Post) => void;
}

const SortBoardContentLayout = ({
  title,
  icon = true,
  description,
  posts,
  isLoading,
  onPostPress,
}: Props) => {
  const {
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
  } = useSortBoard();

  if (isLoading) {
    return <Loading />;
  }

  if (!posts || posts.length === 0) {
    return <NoBoardLayout des={description ?? '게시물이'} />;
  }

  return (
    <View className="flex-1">
      <BoardHeaderColorGround />
      <DetailBoardHeader title={title} icon={icon} />

      <View className="flex-1 bg-surface-50 px-5">
        <SortPostList
          classname=""
          vertical
          selectedSortLabel={selectedSortLabel}
          setSelectedSort={setSelectedSort}
          setSortSheetVisible={setSortSheetVisible}
          sortSheetVisible={sortSheetVisible}
          data={posts}
          onPostPress={onPostPress}
        />
      </View>
    </View>
  );
};

export default SortBoardContentLayout;

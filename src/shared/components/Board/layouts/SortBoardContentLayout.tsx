import React from 'react';

import { View } from 'react-native';

import SortBoardHeaderLayout from './SortBoardHeaderLayout';

import { Post } from '@/features/board/shared/types/DefaultPostType';
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
  sortBoardState: ReturnType<typeof useSortBoard>;
}

const SortBoardContentLayout = ({
  title,
  icon = true,
  description,
  posts,
  isLoading,
  sortBoardState,
}: Props) => {
  const {
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
  } = sortBoardState;

  if (isLoading) {
    return <Loading />;
  }

  if (!posts || posts.length === 0) {
    return (
      <SortBoardHeaderLayout title={title} icon={icon}>
        <View className="flex-1 bg-surface-50 px-5">
          <NoBoardLayout des={description ?? '게시물이'} />
        </View>
      </SortBoardHeaderLayout>
    );
  }

  return (
    <SortBoardHeaderLayout title={title} icon={icon}>
      <View className="flex-1 bg-surface-50 px-5">
        <SortPostList
          classname=""
          vertical
          selectedSortLabel={selectedSortLabel}
          setSelectedSort={setSelectedSort}
          setSortSheetVisible={setSortSheetVisible}
          sortSheetVisible={sortSheetVisible}
          data={posts}
        />
      </View>
    </SortBoardHeaderLayout>
  );
};

export default SortBoardContentLayout;

import React from 'react';

import { View } from 'react-native';

import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';
import NoBoardLayout from '@/shared/components/Board/layouts/NoBoardLayout';
import SortPostList from '@/shared/components/Board/SortPostList';
import { useSortBoard } from '@/shared/hooks/useSortBoard';
import { mockPosts } from '@/shared/lib/mock';
import Loading from '@/shared/ui/organisms/Loading';

const isLoading = false;

const PopularReviews = () => {
  const {
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
  } = useSortBoard();

  if (isLoading) {
    return <Loading />;
  }

  if (!mockPosts || mockPosts.length === 0) {
    return <NoBoardLayout des={'아직 취업 정보 인기글이'} />;
  }

  return (
    <View className="flex-1">
      <BoardHeaderColorGround />
      <DetailBoardHeader title={'취업 정보 인기 후기'} icon={true} />

      <View className="flex-1 bg-surface-50 px-5">
        <SortPostList
          classname=""
          vertical
          selectedSortLabel={selectedSortLabel}
          setSelectedSort={setSelectedSort}
          setSortSheetVisible={setSortSheetVisible}
          sortSheetVisible={sortSheetVisible}
          data={mockPosts}
          onPostPress={() => console.log('ss')}
        />
      </View>
    </View>
  );
};

export default PopularReviews;

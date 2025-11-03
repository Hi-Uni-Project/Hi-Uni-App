import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';

import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import { BoardNavigationProps } from '@/navigation/types/navigationTypes';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';
import NoBoardLayout from '@/shared/components/Board/layouts/NoBoardLayout';
import SortPostList from '@/shared/components/Board/SortPostList';
import { useSortBoard } from '@/shared/hooks/useSortBoard';
import { mockPosts } from '@/shared/lib/mock';
import Loading from '@/shared/ui/organisms/Loading';

const isLoading = false;
type PopularReviewsRouteProp = RouteProp<
  BoardNavigationProps,
  'PopularReviews'
>;
interface Props {
  route: PopularReviewsRouteProp;
}

const PopularReviews = ({ route }: Props) => {
  const { title } = route.params;

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
    return <NoBoardLayout des={`아직 ${title} 인기글이`} />;
  }

  return (
    <View className="flex-1">
      <BoardHeaderColorGround />
      <DetailBoardHeader
        title={`${title === '전체' ? '취업 정보' : title} 인기 후기`}
        icon={true}
      />

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

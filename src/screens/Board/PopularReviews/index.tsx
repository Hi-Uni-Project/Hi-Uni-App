import React from 'react';

import { RouteProp } from '@react-navigation/native';

import { useCategoryWeeklyHotQuery } from '@/features/board/boardMain/hooks/useWeeklyHotQuery';
import {
  getPostTypeByDisplayName,
  PostCategory,
} from '@/features/board/shared/types/enum/postEnum';
import { BoardNavigationProps } from '@/navigation/types/navigationTypes';
import SortBoardContentLayout from '@/shared/components/Board/layouts/SortBoardContentLayout';
import { useSortBoard } from '@/shared/hooks/useSortBoard';

type PopularReviewsRouteProp = RouteProp<
  BoardNavigationProps,
  'PopularReviews'
>;
interface Props {
  route: PopularReviewsRouteProp;
}

const PopularReviews = ({ route }: Props) => {
  const { title } = route.params;
  const sortBoardState = useSortBoard();
  const selectedPostType = getPostTypeByDisplayName(title);

  const { data: posts = [], isLoading } = useCategoryWeeklyHotQuery(
    PostCategory.JOB_INFORMATION,
    selectedPostType,
    sortBoardState.selectedSort,
  );

  return (
    <SortBoardContentLayout
      sortBoardState={sortBoardState}
      title={`${title === '전체' ? '취업 정보' : title} 인기 후기`}
      description={`아직 ${title} 인기글이`}
      posts={posts}
      isLoading={isLoading}
      onPostPress={() => console.log('post clicked')}
    />
  );
};

export default PopularReviews;

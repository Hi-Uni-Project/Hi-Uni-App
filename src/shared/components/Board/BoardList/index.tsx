import React from 'react';

import { UseQueryResult } from '@tanstack/react-query';
import { View } from 'react-native';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import BoardContentLayout from '@/shared/components/Board/layouts/BoardContentLayout';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

interface Props {
  title: string;
  emptyDescription: string;
  showHeaderIcon?: boolean;
  useQuery: () => UseQueryResult<Post[] | undefined>;
  hideTabBar?: boolean;
}

const BoardListScreen = ({
  title,
  emptyDescription,
  showHeaderIcon = false,
  useQuery,
}: Props) => {
  const { data, isLoading } = useQuery();

  return (
    <View className="flex-1">
      <BoardHeaderColorGround />
      <DetailBoardHeader title={title} icon={showHeaderIcon} />

      <ScreenLayout edges={['bottom']}>
        <View className="flex-1 px-5">
          <BoardContentLayout
            des={emptyDescription}
            data={data}
            isLoading={isLoading}
          />
        </View>
      </ScreenLayout>
    </View>
  );
};

export default BoardListScreen;

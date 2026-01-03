import React, { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { UseQueryResult } from '@tanstack/react-query';
import { Image, View } from 'react-native';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import BoardContentLayout from '@/shared/components/Board/layouts/BoardContentLayout';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';

interface Props {
  title: string;
  emptyDescription: string;
  showHeaderIcon?: boolean;
  useQuery: () => UseQueryResult<Post[] | undefined>;
  hideTabBar?: boolean;
  makeInfoHide?: boolean;
}

const BoardListScreen = ({
  title,
  emptyDescription,
  showHeaderIcon = false,
  makeInfoHide = false,
  useQuery,
}: Props) => {
  const { data, isLoading, refetch } = useQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View className="flex-1">
      <BoardHeaderColorGround />
      <DetailBoardHeader title={title} icon={showHeaderIcon} />

      <View className="flex-1 bg-surface-50 px-5">
        <BoardContentLayout
          makeInfoHide={makeInfoHide}
          des={emptyDescription}
          data={data}
          isLoading={isLoading}
        />

        {!data ||
          (data.length === 0 && (
            <View className="flex-1 justify-end">
              <Image
                className="h-[420px] w-[230px] self-center"
                source={require('@/assets/images/no-board-item.png')}
                resizeMode="contain"
              />
            </View>
          ))}
      </View>
    </View>
  );
};

export default BoardListScreen;

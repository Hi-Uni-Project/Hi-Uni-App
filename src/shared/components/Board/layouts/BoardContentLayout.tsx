import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

import BoardPostCardMD from '../BoardPostCard/md';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import NoBoardLayout from '@/shared/components/Board/layouts/NoBoardLayout';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  data: Post[] | undefined;
  isLoading: boolean;
  des: string;
  makeInfoHide: boolean;
}

const BoardContentLayout = ({ data, isLoading, des, makeInfoHide }: Props) => {
  const navigation = useNavigation<MainStackNavigationProp>();

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
      renderItem={({ item }) => (
        <BoardPostCardMD
          {...item}
          makeInfoHide={makeInfoHide}
          onPress={() =>
            navigation.navigate('BoardRoute', {
              screen: 'BoardDetailPosts',
              params: {
                postId: item.id,
                isReview: item.isReview,
              },
            })
          }
        />
      )}
      contentContainerStyle={{ paddingVertical: 20, gap: 8, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default BoardContentLayout;

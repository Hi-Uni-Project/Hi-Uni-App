import React, { Dispatch, SetStateAction } from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList, FlatListProps } from 'react-native';

import BoardPostCardMD from '../BoardPostCard/md';

import SortBottomSheet from './SortBottomSheet';
import SortHeader from './SortHeader';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';

interface SortPostListProps {
  data: Post[];
  contentContainerStyle?: FlatListProps<Post>['contentContainerStyle'];
  selectedSortLabel: string;
  sortSheetVisible: boolean;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedSort: (displayName: string) => void;
  classname?: string;
  vertical?: boolean;
  scrollEnabled?: boolean;
  typeHide?: boolean;
  makeInfoHide?: boolean;
}

const SortPostList = ({
  data,
  classname = '-mt-6',
  contentContainerStyle = { paddingVertical: 20, paddingBottom: 50, gap: 8 },
  selectedSortLabel,
  sortSheetVisible,
  setSortSheetVisible,
  setSelectedSort,
  vertical = false,
  scrollEnabled = true,
  typeHide = false,
  makeInfoHide = false,
}: SortPostListProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <>
      <FlatList
        className={classname}
        data={data}
        scrollEnabled={scrollEnabled}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <BoardPostCardMD
            {...item}
            onPress={() =>
              navigation.navigate('BoardRoute', {
                screen: 'BoardDetailPosts',
                params: {
                  postId: item.id,
                  isReview: item.isReview,
                },
              })
            }
            vertical={vertical}
            typeHide={typeHide}
            makeInfoHide={makeInfoHide}
          />
        )}
        ListHeaderComponent={
          <SortHeader
            selectedSort={selectedSortLabel}
            onPress={() => setSortSheetVisible(true)}
          />
        }
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />

      <SortBottomSheet
        sortSheetVisible={sortSheetVisible}
        setSortSheetVisible={setSortSheetVisible}
        selectedSort={selectedSortLabel}
        setSelectedSort={setSelectedSort}
      />
    </>
  );
};

export default SortPostList;

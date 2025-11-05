import React, { Dispatch, SetStateAction } from 'react';

import { FlatList, FlatListProps } from 'react-native';

import BoardPostCardMD from '../BoardPostCard/md';

import SortBottomSheet from './SortBottomSheet';
import SortHeader from './SortHeader';

import { Post } from '@/features/board/shared/types/DefaultPostType';

interface SortPostListProps {
  data: Post[];
  onPostPress?: (post: Post) => void;
  contentContainerStyle?: FlatListProps<Post>['contentContainerStyle'];
  selectedSortLabel: string;
  sortSheetVisible: boolean;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedSort: (displayName: string) => void;
  classname?: string;
  vertical?: boolean;
  scrollEnabled?: boolean;
  typeHide?: boolean;
}

const SortPostList = ({
  data,
  onPostPress,
  classname = '-mt-6',
  contentContainerStyle = { paddingVertical: 20, paddingBottom: 50, gap: 8 },
  selectedSortLabel,
  sortSheetVisible,
  setSortSheetVisible,
  setSelectedSort,
  vertical = false,
  scrollEnabled = true,
  typeHide = false,
}: SortPostListProps) => {
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
            onPress={() => onPostPress?.(item)}
            vertical={vertical}
            typeHide={typeHide}
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

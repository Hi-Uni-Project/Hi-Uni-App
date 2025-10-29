import React, { Dispatch, SetStateAction } from 'react';

import { FlatList, FlatListProps } from 'react-native';

import SortBottomSheet from './SortBottomSheet';
import SortHeader from './SortHeader';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import BoardPostCardMD from '@/shared/components/Board/BoardPostCard/md';

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
}

const SortPostList = ({
  data,
  onPostPress,
  classname = '-mt-6',
  contentContainerStyle = { paddingVertical: 20, gap: 8 },
  selectedSortLabel,
  sortSheetVisible,
  setSortSheetVisible,
  setSelectedSort,
  vertical = false,
}: SortPostListProps) => {
  return (
    <>
      <FlatList
        className={classname}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <BoardPostCardMD
            {...item}
            onPress={() => onPostPress?.(item)}
            vertical={vertical}
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

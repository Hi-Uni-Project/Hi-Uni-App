import React, { Dispatch, SetStateAction } from 'react';

import { FlatList, Pressable, Text, View } from 'react-native';

import NoSearchResult from './NoSearchResult';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import RecentSearchList from '@/features/home/searchBoard/components/RecentSearchList';
import BoardPostCardMD from '@/shared/components/BoardPostCard/md';
import Loading from '@/shared/ui/organisms/Loading';
import Filtered from '@/static/icons/filtered.svg';

interface Props {
  hasSearchResults: boolean;
  hasSearched: boolean;
  isFetching: boolean;
  filteredPosts: Post[];
  recentSearches: string[];
  onSelectRecentItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onPostPress: (title: string) => void;
  selectedSort: string;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
}

const SearchContent = ({
  hasSearchResults,
  hasSearched,
  isFetching,
  filteredPosts,
  recentSearches,
  onSelectRecentItem,
  onRemoveItem,
  onPostPress,
  selectedSort,
  setSortSheetVisible,
}: Props) => {
  if (isFetching) {
    return <Loading />;
  }

  if (hasSearched && !hasSearchResults) {
    return <NoSearchResult />;
  }

  if (hasSearched && hasSearchResults) {
    return (
      <FlatList
        className="-mt-6"
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <BoardPostCardMD {...item} onPress={() => onPostPress(item.title)} />
        )}
        ListHeaderComponent={
          <View className="mb-3">
            <Pressable
              className="flex-row items-center gap-1.5"
              onPress={() => setSortSheetVisible(true)}>
              <Filtered />
              <Text className="text-surface-500 typo-body-16-regular">
                {selectedSort}
              </Text>
            </Pressable>
          </View>
        }
        contentContainerStyle={{ paddingVertical: 20, gap: 8 }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <RecentSearchList
      recentSearches={recentSearches}
      handleSelectItem={onSelectRecentItem}
      handleRemoveItem={onRemoveItem}
    />
  );
};

export default SearchContent;

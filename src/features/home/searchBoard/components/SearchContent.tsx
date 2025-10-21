import React from 'react';

import { FlatList } from 'react-native';

import NoSearchResult from './NoSearchResult';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import RecentSearchList from '@/features/home/searchBoard/components/RecentSearchList';
import BoardPostCardMD from '@/shared/components/BoardPostCard/md';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  hasSearchResults: boolean;
  hasSearched: boolean;
  isFetching: boolean;
  filteredPosts: Post[];
  recentSearches: string[];
  onSelectRecentItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onPostPress: (title: string) => void;
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
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <BoardPostCardMD {...item} onPress={() => onPostPress(item.title)} />
        )}
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

import React, { Dispatch, SetStateAction } from 'react';

import NoSearchResult from './NoSearchResult';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import RecentSearchList from '@/features/home/searchBoard/components/RecentSearchList';
import SortPostList from '@/shared/components/Board/SortPostList';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  hasSearchResults: boolean;
  hasSearched: boolean;
  isFetching: boolean;
  filteredPosts: Post[];
  recentSearches: string[];
  onSelectRecentItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onPostPress: (post: Post) => void;
  selectedSortLabel: string;
  sortSheetVisible: boolean;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedSort: (displayName: string) => void;
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
  selectedSortLabel,
  sortSheetVisible,
  setSortSheetVisible,
  setSelectedSort,
}: Props) => {
  if (isFetching) {
    return <Loading />;
  }

  if (hasSearched && !hasSearchResults) {
    return <NoSearchResult />;
  }

  if (hasSearched && hasSearchResults) {
    return (
      <SortPostList
        selectedSortLabel={selectedSortLabel}
        setSelectedSort={setSelectedSort}
        setSortSheetVisible={setSortSheetVisible}
        sortSheetVisible={sortSheetVisible}
        data={filteredPosts}
        onPostPress={onPostPress}
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

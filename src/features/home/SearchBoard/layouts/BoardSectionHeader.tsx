import React, { Dispatch, SetStateAction } from 'react';

import { Pressable, Text, View } from 'react-native';

import Filtered from '@/static/icons/filtered.svg';

interface Props {
  hasSearchResults: boolean;
  hasRecentSearches: boolean;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
  hasSearched: boolean;
  selectedSort: string;
  onClearAll: () => void;
}

const BoardSectionHeader = ({
  setSortSheetVisible,
  hasSearchResults,
  hasRecentSearches,
  hasSearched,
  selectedSort,
  onClearAll,
}: Props) => {
  return (
    <View className="mb-2 flex-row items-center justify-between">
      {hasSearchResults ? (
        <Pressable
          className="flex-row items-center gap-1.5"
          onPress={() => setSortSheetVisible(true)}>
          <Filtered />
          <Text className="text-surface-500 typo-body-16-regular">
            {selectedSort}
          </Text>
        </Pressable>
      ) : (
        !hasSearched && (
          <Text className="text-main-text typo-sub-title-20-semibold">
            최근 검색어
          </Text>
        )
      )}

      {hasRecentSearches && !hasSearched && (
        <Pressable onPress={onClearAll}>
          <Text className="text-surface-500 typo-body-16-medium">전체삭제</Text>
        </Pressable>
      )}
    </View>
  );
};

export default BoardSectionHeader;

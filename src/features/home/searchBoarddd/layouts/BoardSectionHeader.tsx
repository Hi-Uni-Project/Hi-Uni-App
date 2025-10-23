import React from 'react';

import { Pressable, Text, View } from 'react-native';

interface Props {
  hasRecentSearches: boolean;
  hasSearched: boolean;
  onClearAll: () => void;
}

const BoardSectionHeader = ({
  hasRecentSearches,
  hasSearched,
  onClearAll,
}: Props) => {
  return (
    <View className="mb-2 flex-row items-center justify-between">
      {!hasSearched && (
        <Text className="text-main-text typo-sub-title-20-semibold">
          최근 검색어
        </Text>
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

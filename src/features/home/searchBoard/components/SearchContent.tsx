import React from 'react';

import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import RecentSearchList from '@/features/home/searchBoard/components/RecentSearchList';
import BoardPostCardMD from '@/shared/components/BoardPostCard/md';
import { mockBoardPosts } from '@/shared/constants/boardMockData';
import StatusIcons from '@/shared/icons/StatusIcons';

interface Props {
  hasSearchResults: boolean;
  hasSearched: boolean;
  filteredPosts: typeof mockBoardPosts;
  recentSearches: string[];
  onSelectRecentItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onPostPress: (title: string) => void;
}

const SearchContent = ({
  hasSearchResults,
  hasSearched,
  filteredPosts,
  recentSearches,
  onSelectRecentItem,
  onRemoveItem,
  onPostPress,
}: Props) => {
  // 검색 결과가 있는 경우
  if (hasSearchResults) {
    return (
      <FlatList
        data={filteredPosts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <BoardPostCardMD {...item} onPress={() => onPostPress(item.title)} />
        )}
        contentContainerStyle={{ paddingVertical: 20, gap: 8 }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  // 검색을 했지만 결과가 없는 경우
  if (hasSearched && filteredPosts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center space-y-[14px]">
        <StatusIcons status="caution" width={32} height={32} color="#979797" />
        <Text className="text-surface-500 typo-sub-title-18-medium">
          검색 결과가 없어요.
        </Text>
      </View>
    );
  }

  // 아직 검색하지 않은 경우 - 최근 검색어 리스트 표시
  return (
    <RecentSearchList
      handleSelectItem={onSelectRecentItem}
      handleRemoveItem={onRemoveItem}
      recentSearches={recentSearches}
    />
  );
};

export default SearchContent;

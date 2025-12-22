import React, { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import SearchActionModal from '@/features/home/searchBoard/components/SearchActionModal';
import SearchContent from '@/features/home/searchBoard/components/SearchContent';
import { useSearchBoard } from '@/features/home/searchBoard/hooks/useSearchBoard';
import BoardInputHeader from '@/features/home/searchBoard/layouts/BoardInputHeader';
import BoardSectionHeader from '@/features/home/searchBoard/layouts/BoardSectionHeader';
import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useSortBoard } from '@/shared/hooks/useSortBoard';

const HomeSearchScreen = () => {
  const {
    selectedSort,
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
    resetSort,
  } = useSortBoard();

  const {
    inputRef,
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    recentSearches,
    filteredPosts,
    hasSearched,
    hasSearchResults,
    hasRecentSearches,
    isFetching,
    refetch,
    handleSearch,
    handleSelectRecentItem,
    handleInputFocus,
    handleRemoveItem,
    handleClose,
    handleClearAll,
    handleBackPress,
    handlePostPress,
  } = useSearchBoard({ sortType: selectedSort, resetSort });

  useFocusEffect(
    useCallback(() => {
      if (hasSearched) {
        refetch();
      }
    }, [hasSearched, refetch]),
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1">
        <BoardHeaderColorGround />

        <BoardInputHeader
          inputRef={inputRef}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSubmitEditing={handleSearch}
          onFocus={handleInputFocus}
          onClose={handleClose}
          onBackPress={handleBackPress}
        />

        <ScreenLayout edges={['bottom']}>
          <View className="mt-5 flex-1 px-5">
            <BoardSectionHeader
              hasRecentSearches={hasRecentSearches}
              hasSearched={hasSearched}
              onClearAll={handleClearAll}
            />

            <SearchContent
              selectedSortLabel={selectedSortLabel}
              setSelectedSort={setSelectedSort}
              setSortSheetVisible={setSortSheetVisible}
              sortSheetVisible={sortSheetVisible}
              hasSearchResults={hasSearchResults}
              hasSearched={hasSearched}
              isFetching={isFetching}
              filteredPosts={filteredPosts}
              recentSearches={recentSearches}
              onSelectRecentItem={handleSelectRecentItem}
              onRemoveItem={handleRemoveItem}
              onPostPress={handlePostPress}
            />

            <SearchActionModal
              modalVisible={modalVisible}
              onModalConfirm={() => setModalVisible(false)}
            />
          </View>
        </ScreenLayout>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeSearchScreen;

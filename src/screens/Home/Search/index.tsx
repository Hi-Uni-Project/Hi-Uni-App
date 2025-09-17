import React from 'react';

import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import BoardInput from '@/features/home/searchBoard/components/BoardInput';
import SearchActionModal from '@/features/home/searchBoard/components/SearchActionModal';
import SearchContent from '@/features/home/searchBoard/components/SearchContent';
import { useSearchBoard } from '@/features/home/searchBoard/hooks/useSearchBoard';
import BoardHeaderColor from '@/features/home/shared/layouts/BoardHeader';
import BoardSectionHeader from '@/features/home/shared/layouts/BoardSectionHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HomeSearchScreen = () => {
  const {
    // Refs
    inputRef,

    // State
    searchText,
    setSearchText,
    recentSearches,
    modalVisible,
    setModalVisible,
    sortSheetVisible,
    setSortSheetVisible,
    selectedSort,
    setSelectedSort,
    filteredPosts,
    hasSearched,

    // Computed values
    hasSearchResults,
    hasRecentSearches,

    // Handlers
    handleSearch,
    handleSelectRecentItem,
    handleInputFocus,
    handleRemoveItem,
    handleClose,
    handleClearAll,
    handleBackPress,
    handlePostPress,
  } = useSearchBoard();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1">
        <BoardHeaderColor />

        <BoardInput
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
              hasSearchResults={hasSearchResults}
              hasRecentSearches={hasRecentSearches}
              hasSearched={hasSearched}
              selectedSort={selectedSort}
              onClearAll={handleClearAll}
            />

            <SearchContent
              hasSearchResults={hasSearchResults}
              hasSearched={hasSearched}
              filteredPosts={filteredPosts}
              recentSearches={recentSearches}
              onSelectRecentItem={handleSelectRecentItem}
              onRemoveItem={handleRemoveItem}
              onPostPress={handlePostPress}
            />

            <SearchActionModal
              modalVisible={modalVisible}
              onModalConfirm={() => setModalVisible(false)}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              sortSheetVisible={sortSheetVisible}
              setSortSheetVisible={setSortSheetVisible}
            />
          </View>
        </ScreenLayout>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeSearchScreen;

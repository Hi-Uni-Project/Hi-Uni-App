import { useRef, useState } from 'react';

import { Keyboard, TextInput } from 'react-native';

import { MAX_ITEMS } from '@/features/home/searchBoard/constants/lines';
import { mockBoardPosts } from '@/shared/constants/boardMockData';

export const useSearchBoard = () => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [filteredPosts, setFilteredPosts] = useState<typeof mockBoardPosts>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const hasSearchResults = filteredPosts.length > 0;
  const hasRecentSearches = recentSearches.length > 0;

  const performSearch = (textToSearch: string) => {
    const trimmedText = textToSearch.trim();

    if (trimmedText.length <= 1) {
      setModalVisible(true);
      return;
    }

    setHasSearched(true);

    const searchResults = mockBoardPosts.filter(
      post =>
        post.title.includes(trimmedText) || post.content.includes(trimmedText),
    );

    setFilteredPosts(searchResults);

    setRecentSearches(prev => {
      const updated = [
        trimmedText,
        ...prev.filter(item => item !== trimmedText),
      ];

      if (updated.length > MAX_ITEMS) {
        updated.pop();
      }

      return updated;
    });

    Keyboard.dismiss();
  };

  const handleSearch = () => {
    performSearch(searchText);
  };

  const handleSelectRecentItem = (item: string) => {
    setSearchText(item);
    performSearch(item);
  };

  const handleInputFocus = () => {
    setFilteredPosts([]);
    setHasSearched(false);
  };

  const handleRemoveItem = (item: string) => {
    setRecentSearches(prev => prev.filter(i => i !== item));
  };

  const handleClose = () => {
    setSearchText('');
    setFilteredPosts([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  const handleClearAll = () => setRecentSearches([]);

  const handleBackPress = () => {
    console.log('back');
  };

  const handlePostPress = (title: string) => {
    console.log(`${title} 클릭됨`);
  };

  return {
    // Refs
    inputRef,

    // State
    searchText,
    setSearchText,
    setModalVisible,
    recentSearches,
    modalVisible,
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
  };
};

import { useRef, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard, TextInput } from 'react-native';

import {
  getSortTypeByLabel,
  SORT_DISPLAY_NAME,
  SortType,
} from '@/features/board/shared/types/enum/sortEnum';
import { MAX_ITEMS } from '@/features/home/searchBoard/constants/lines';
import { useSearchBoardQuery } from '@/features/home/searchBoard/hooks/useSearchBoardQuery';

export const useSearchBoard = () => {
  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>(SortType.LATEST);
  const [hasSearched, setHasSearched] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);

  const {
    data: filteredPosts = [],
    refetch,
    isFetching,
  } = useSearchBoardQuery(searchText.trim(), selectedSort, enableQuery);

  useEffect(() => {
    if (enableQuery && hasSearched) {
      refetch();
    }
  }, [selectedSort, enableQuery, hasSearched, refetch]);

  const hasSearchResults = filteredPosts.length > 0;
  const hasRecentSearches = recentSearches.length > 0;

  const performSearch = async (textToSearch: string) => {
    const trimmedText = textToSearch.trim();

    if (trimmedText.length <= 1) {
      setModalVisible(true);
      return;
    }

    setHasSearched(true);
    setEnableQuery(true);
    await refetch();

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

  const handleSearch = () => performSearch(searchText);

  const handleSelectRecentItem = (item: string) => {
    setSearchText(item);
    performSearch(item);
  };

  const handleInputFocus = () => {
    setHasSearched(false);
  };

  const handleRemoveItem = (item: string) => {
    setRecentSearches(prev => prev.filter(i => i !== item));
  };

  const handleClose = () => {
    setSearchText('');
    setHasSearched(false);
    setEnableQuery(false);
    inputRef.current?.focus();
  };

  const handleClearAll = () => setRecentSearches([]);
  const handleBackPress = () => navigation.goBack();
  const handlePostPress = (title: string) => console.log(`${title} 클릭됨`);

  const handleSortChange = (displayName: string) => {
    const sortType = getSortTypeByLabel(displayName);
    setSelectedSort(sortType);
    setSortSheetVisible(false);
  };

  return {
    // Refs
    inputRef,

    // State
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    recentSearches,
    sortSheetVisible,
    setSortSheetVisible,
    selectedSort: SORT_DISPLAY_NAME[selectedSort],
    setSelectedSort: handleSortChange,
    filteredPosts,
    hasSearched,

    // Computed values
    hasSearchResults,
    hasRecentSearches,
    isFetching,

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

import { useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard, TextInput } from 'react-native';

import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import { MAX_ITEMS } from '@/features/home/searchBoard/constants/lines';
import { useSearchBoardQuery } from '@/features/home/searchBoard/hooks/useSearchBoardQuery';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useSearchHistoryStore } from '@/shared/stores/searchHistory';

interface Props {
  sortType: SortType;
  resetSort: () => void;
}

export const useSearchBoard = ({ sortType, resetSort }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation<MainStackNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [submittedSearchText, setSubmittedSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);

  const { recentSearches, addSearch, removeSearch, clearAll } =
    useSearchHistoryStore();

  const {
    data: filteredPosts = [],
    refetch,
    isFetching,
  } = useSearchBoardQuery(submittedSearchText, sortType, enableQuery);

  const hasSearchResults = filteredPosts.length > 0;
  const hasRecentSearches = recentSearches.length > 0;

  const performSearch = async (textToSearch: string) => {
    const trimmedText = textToSearch.trim();

    if (trimmedText.length <= 1) {
      setModalVisible(true);
      return;
    }

    setSubmittedSearchText(trimmedText);
    setHasSearched(true);
    setEnableQuery(true);
    await refetch();

    addSearch(trimmedText, MAX_ITEMS);

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
    removeSearch(item);
  };

  const handleClose = () => {
    setSearchText('');
    setSubmittedSearchText('');
    setHasSearched(false);
    setEnableQuery(false);
    resetSort();
    inputRef.current?.focus();
  };

  const handleClearAll = () => clearAll();
  const handleBackPress = () => navigation.goBack();

  return {
    // Refs
    inputRef,

    // State
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    recentSearches,
    filteredPosts,
    hasSearched,

    // Computed values
    hasSearchResults,
    hasRecentSearches,
    isFetching,

    // Handlers
    refetch,
    handleSearch,
    handleSelectRecentItem,
    handleInputFocus,
    handleRemoveItem,
    handleClose,
    handleClearAll,
    handleBackPress,
  };
};

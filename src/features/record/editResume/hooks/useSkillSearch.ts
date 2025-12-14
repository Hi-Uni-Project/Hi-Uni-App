import { useState, useCallback } from 'react';

import { useSkillSearchQuery } from './useResumeQueries';

const useSkillSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { skillSearchData, skillSearchLoading } =
    useSkillSearchQuery(searchKeyword);

  const handleSearch = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed.length > 0) {
      setSearchKeyword(trimmed);
    }
  }, [inputValue]);

  const clearSearch = useCallback(() => {
    setInputValue('');
    setSearchKeyword('');
  }, []);

  const isSearchResultVisible =
    searchKeyword.length > 0 && (skillSearchData?.length ?? 0) > 0;

  return {
    inputValue,
    setInputValue,
    searchKeyword,
    searchResults: skillSearchData ?? [],
    isLoading: skillSearchLoading,
    isSearchResultVisible,
    handleSearch,
    clearSearch,
  };
};

export default useSkillSearch;

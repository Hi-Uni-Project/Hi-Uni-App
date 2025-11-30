import { useState, useCallback } from 'react';

import { SkillResponse } from '../types/responseType';

import { useSkillSearchQuery } from './useResumeQueries';

const useSkillSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<SkillResponse[]>([]);

  const { skillSearchData, skillSearchLoading } =
    useSkillSearchQuery(searchKeyword);

  const handleSearch = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed.length > 0) {
      setSearchKeyword(trimmed);
    }
  }, [inputValue]);

  const handleSelectSkill = useCallback((skill: SkillResponse) => {
    setSelectedSkills(prev => {
      const isAlreadySelected = prev.some(s => s.skillId === skill.skillId);
      if (isAlreadySelected) {
        return prev;
      }
      return [...prev, skill];
    });

    setInputValue(skill.name);
  }, []);

  const handleRemoveSkill = useCallback((skillId: number) => {
    setSelectedSkills(prev => prev.filter(s => s.skillId !== skillId));
  }, []);

  const clearSearch = useCallback(() => {
    setInputValue('');
    setSearchKeyword('');
  }, []);

  const isSearchResultVisible =
    searchKeyword.length > 0 && (skillSearchData?.data?.length ?? 0) > 0;

  return {
    inputValue,
    setInputValue,
    searchKeyword,
    selectedSkills,
    searchResults: skillSearchData?.data ?? [],
    isLoading: skillSearchLoading,
    isSearchResultVisible,
    handleSearch,
    handleSelectSkill,
    handleRemoveSkill,
    clearSearch,
  };
};

export default useSkillSearch;

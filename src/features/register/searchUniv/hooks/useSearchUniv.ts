import { useState } from 'react';

import { useUnivSearchQuery } from '../queries/univQueries';
import { University } from '../types';

import { SignupStackNavigationProp } from '@/navigation/types/navigationTypes';

export const useSearchUniv = (navigation: SignupStackNavigationProp) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUniv, setSelectedUniv] = useState<string | null>(null);

  const { data: univList } = useUnivSearchQuery(inputValue);

  const filteredUnivs = (univList?.data ?? []) as University[];

  const handleUnivChange = (univ: string, isSelect = false) => {
    setInputValue(univ);
    setSelectedUniv(isSelect ? univ : null);
  };

  const handleEraseInput = () => {
    setSelectedUniv('');
    setInputValue('');
  };

  const handleNavigation = () => {
    handleEraseInput();
    navigation.navigate('Department');
  };

  return {
    inputValue,
    setInputValue,
    selectedUniv,
    setSelectedUniv,
    filteredUnivs,
    handleUnivChange,
    handleEraseInput,
    handleNavigation,
  };
};

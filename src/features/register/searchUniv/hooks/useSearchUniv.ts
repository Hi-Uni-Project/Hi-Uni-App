import { useState, useMemo } from 'react';

const UNIVERSITIES = [
  '제주관광대학교',
  '제주국제대학교',
  '제주대학교',
  '제주한라대학교',
];

export const useSearchUniv = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUniv, setSelectedUniv] = useState<string | null>(null);

  // 검색어 필터링 (추후 API 요청으로 교체 예정)
  const filteredUnivs = useMemo(() => {
    if (inputValue.length < 2) {
      return [];
    }
    return UNIVERSITIES.filter(u => u.includes(inputValue));
  }, [inputValue]);

  const handleUnivChange = (univ: string, isSelect = false) => {
    setInputValue(univ);
    setSelectedUniv(isSelect ? univ : null);
  };

  return {
    inputValue,
    setInputValue,
    selectedUniv,
    setSelectedUniv,
    filteredUnivs,
    handleUnivChange,
  };
};

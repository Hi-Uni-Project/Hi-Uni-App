import { useState } from 'react';

import {
  getSortTypeByLabel,
  SORT_DISPLAY_NAME,
  SortType,
} from '@/features/board/shared/types/enum/sortEnum';

export const useSortBoard = (initialSort: SortType = SortType.LATEST) => {
  const [selectedSort, setSelectedSort] = useState<SortType>(initialSort);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);

  const handleSortChange = (displayName: string) => {
    const sortType = getSortTypeByLabel(displayName);
    setSelectedSort(sortType);
    setSortSheetVisible(false);
  };

  const resetSort = () => {
    setSelectedSort(SortType.LATEST);
  };

  return {
    selectedSort,
    sortSheetVisible,
    setSortSheetVisible,
    resetSort,
    setSelectedSort: handleSortChange,
    selectedSortLabel: SORT_DISPLAY_NAME[selectedSort],
  };
};

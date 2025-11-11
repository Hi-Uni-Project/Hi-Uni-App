import { useState } from 'react';

import {
  getPostTypeByDisplayName,
  JOB_CATEGORY_CHIPS,
  PostCategory,
} from '../../shared/types/enum/postEnum';
import { SortType } from '../../shared/types/enum/sortEnum';

import { usePostsByCategoryQuery } from '@/features/board/boardMain/hooks/useCategoryQuery';

interface Props {
  selectedSort: SortType;
}

export const useBoardCategory = ({ selectedSort }: Props) => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  const selectedPostType = getPostTypeByDisplayName(
    JOB_CATEGORY_CHIPS[selectedCategoryIdx],
  );

  const { data: posts = [], isLoading } = usePostsByCategoryQuery(
    PostCategory.JOB_INFORMATION,
    selectedPostType,
    selectedSort,
  );

  return {
    selectedCategoryIdx,
    setSelectedCategoryIdx,
    posts,
    isLoading,
  };
};

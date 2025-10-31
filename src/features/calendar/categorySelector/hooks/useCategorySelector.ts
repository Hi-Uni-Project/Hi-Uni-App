import { useState } from 'react';

import { Category } from '../types/categoryTypes';

import useCategoryQuery from './categoryQueries';

const useCategorySelector = () => {
  const { data, isLoading, error } = useCategoryQuery();

  const categories = data?.data || [];

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  return { categories, isLoading, error, currentCategory, setCurrentCategory };
};

export default useCategorySelector;

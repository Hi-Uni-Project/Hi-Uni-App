import { useQuery } from '@tanstack/react-query';

import { CategoryResponse, getCategories } from '../api/categoryApi';

const useCategoryQuery = () => {
  const { data, isLoading, error } = useQuery<CategoryResponse>({
    queryKey: ['schedules', 'categories'],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return { data, isLoading, error };
};

export default useCategoryQuery;

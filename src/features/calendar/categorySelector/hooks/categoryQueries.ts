import { useQuery } from '@tanstack/react-query';

import { CategoryResponse, getCategories } from '../api/categoryApi';

const useCategoryQuery = () => {
  const { data, isLoading, error } = useQuery<CategoryResponse>({
    queryKey: ['schedules', 'categories'],
    queryFn: getCategories,
  });

  return { data, isLoading, error };
};

export default useCategoryQuery;

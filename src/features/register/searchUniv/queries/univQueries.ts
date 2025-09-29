import { useQuery } from '@tanstack/react-query';

import { searchUnivApi } from '../api/searchUnivApi';

export const univKeys = {
  all: ['universities'] as const,
  search: (keyword: string) => [...univKeys.all, 'search', keyword] as const,
};

export const useUnivSearchQuery = (keyword: string) => {
  return useQuery({
    queryKey: univKeys.search(keyword),
    queryFn: () => searchUnivApi({ keyword }),
    enabled: keyword.length >= 2,
  });
};

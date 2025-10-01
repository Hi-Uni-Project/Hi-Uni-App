import { useQuery } from '@tanstack/react-query';

import { getDepartmentListApi } from '../api/departmentApi';

export const departmentKeys = {
  all: ['departments'] as const,
  list: (univName: string) =>
    [...departmentKeys.all, 'list', univName] as const,
};

export const useDepartmentListQuery = (univName: string) => {
  return useQuery({
    queryKey: departmentKeys.list(univName),
    queryFn: () => getDepartmentListApi({ univName }),
    enabled: univName.length > 0,
    staleTime: 10 * 60 * 1000,
  });
};

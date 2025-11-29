import { useQuery } from '@tanstack/react-query';

import { recordApi } from '../api/recordApi';
import { RecordOverviewResponse } from '../types';

const useRecordQueries = () => {
  const { data, isLoading, error } = useQuery<RecordOverviewResponse>({
    queryKey: ['record'],
    queryFn: recordApi,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return { data, isLoading, error };
};

export default useRecordQueries;

import { useQuery } from '@tanstack/react-query';

import { getCoverLetter } from '../api/coverLetterApi';
import { CoverLetterResponse } from '../types/CoverLetterType';

const useCoverLetterQueries = () => {
  const coverLetterQuery = useQuery<CoverLetterResponse>({
    queryKey: ['coverLetter'],
    queryFn: getCoverLetter,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    coverLetterData: coverLetterQuery.data,
    coverLetterLoading: coverLetterQuery.isLoading,
    coverLetterError: coverLetterQuery.isError,
    refetchCoverLetter: coverLetterQuery.refetch,
  };
};

export { useCoverLetterQueries };

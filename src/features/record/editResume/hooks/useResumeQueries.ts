import { useQuery } from '@tanstack/react-query';

import { fetchResumeData } from '../api/resumeApi';

const useResumeQueries = () => {
  const resumeDataQuery = useQuery({
    queryKey: ['resumeData'],
    queryFn: fetchResumeData,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    resumeData: resumeDataQuery.data,
    resumeLoading: resumeDataQuery.isLoading,
    resumeError: resumeDataQuery.isError,
  };
};

export default useResumeQueries;

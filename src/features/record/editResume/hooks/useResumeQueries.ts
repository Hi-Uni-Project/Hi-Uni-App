import { useQuery } from '@tanstack/react-query';

import {
  fetchResumeData,
  getMyReviews,
  searchSkillData,
} from '../api/resumeApi';
import { mapSkillToDomain } from '../utils/responseToDomainMapper';

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

const useSkillSearchQuery = (keyword: string) => {
  const result = useQuery({
    queryKey: ['skillSearch', keyword],
    queryFn: () => searchSkillData(keyword),
    enabled: keyword.length > 0,
    select: response => response.data.map(mapSkillToDomain),
  });

  return {
    skillSearchData: result.data,
    skillSearchLoading: result.isLoading,
    skillSearchError: result.isError,
  };
};

const useMyReviewsQuery = () => {
  const result = useQuery({
    queryKey: ['myReviews'],
    queryFn: getMyReviews,
    gcTime: 0,
    staleTime: 0,
  });

  return {
    myReviewsData: result.data,
    myReviewsLoading: result.isLoading,
    myReviewsError: result.isError,
  };
};

export { useResumeQueries, useSkillSearchQuery, useMyReviewsQuery };

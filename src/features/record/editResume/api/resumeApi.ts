import { ResumeDataResponse, SkillSearchResponse } from '../types/responseType';

import { axiosInstance } from '@/shared/api/axiosInstance';

const fetchResumeData = async (): Promise<ResumeDataResponse> => {
  const response = await axiosInstance.get<ResumeDataResponse>('/resume');

  return response.data;
};

const searchSkillData = async (
  keyword: string,
): Promise<SkillSearchResponse> => {
  const response = await axiosInstance.get<SkillSearchResponse>(
    `/skill/search?keyword=${keyword}`,
  );

  return response.data;
};

export { fetchResumeData, searchSkillData };

import { ResumeDataResponse } from '../types/responseType';

import { axiosInstance } from '@/shared/api/axiosInstance';

const fetchResumeData = async (): Promise<ResumeDataResponse> => {
  const response = await axiosInstance.get<ResumeDataResponse>('/resume');

  return response.data;
};

export { fetchResumeData };

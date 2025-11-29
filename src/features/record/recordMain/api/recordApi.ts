import { RecordOverviewResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const recordApi = async (): Promise<RecordOverviewResponse> => {
  const response =
    await axiosInstance.get<RecordOverviewResponse>('/record/overview');

  return response.data;
};

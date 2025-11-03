import { ScheduleListRequest, ScheduleListResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const calendarScheduleApi = async ({
  startDate,
  endDate,
}: ScheduleListRequest): Promise<ScheduleListResponse> => {
  const response = await axiosInstance.get<ScheduleListResponse>('/schedules', {
    params: {
      startDate,
      endDate,
    },
  });

  return response.data;
};

import { CalendarScheduleRequest, CalendarScheduleResponse } from '../../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const calendarScheduleApi = async ({
  startDate,
  endDate,
}: CalendarScheduleRequest): Promise<CalendarScheduleResponse> => {
  const response = await axiosInstance.get<CalendarScheduleResponse>(
    '/schedules',
    {
      params: {
        startDate,
        endDate,
      },
    },
  );

  return response.data;
};

import { Schedule } from '../../shared/types';
import { ScheduleCreateRequest, ScheduleUpdateRequest } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

const createSchedule = async (scheduleData: ScheduleCreateRequest) => {
  const response = await axiosInstance.post<Schedule>(
    '/schedules',
    scheduleData,
  );

  return response.data;
};

const updateSchedule = async (
  scheduleId: number,
  scheduleData: ScheduleUpdateRequest,
) => {
  const response = await axiosInstance.put<Schedule>(
    `/schedules/${scheduleId}`,
    scheduleData,
  );

  return response.data;
};

export { createSchedule, updateSchedule };

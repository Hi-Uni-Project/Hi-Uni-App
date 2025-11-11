import { Schedule } from '../../shared/types';
import { ScheduleSaveRequest } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const saveSchedule = async (scheduleData: ScheduleSaveRequest) => {
  const { id, ...data } = scheduleData;

  if (id) {
    const response = await axiosInstance.put<Schedule>(
      `/schedules/${id}`,
      data,
    );
    return response.data;
  } else {
    const response = await axiosInstance.post<Schedule>('/schedules', data);
    return response.data;
  }
};

export const deleteSchedule = async (scheduleId: number) => {
  const response = await axiosInstance.delete(`/schedules/${scheduleId}`);
  return response.data;
};

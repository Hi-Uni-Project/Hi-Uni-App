import type { ResponseTypes } from '@/shared/api/types';

export interface CalendarScheduleRequest {
  startDate: string;
  endDate: string;
}

export interface CalendarSchedule {
  startDate: string;
  endDate: string;
  category: string;
  detail: string;
  time: string;
  color: string;
  memo: string;
}

export type CalendarScheduleResponse = ResponseTypes<CalendarSchedule[]>;

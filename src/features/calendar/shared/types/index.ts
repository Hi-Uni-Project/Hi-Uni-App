import { Dayjs } from 'dayjs';

import { ResponseTypes } from '@/shared/api/types';
import { Category } from '@/shared/types/categoryType';

export interface CalendarDayUI {
  date: Dayjs;
  isCurrentMonth: boolean;
  isSunday: boolean;
}

export interface ScheduleListRequest {
  startDate: string;
  endDate: string;
}

export interface Schedule {
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  category: Category;
  detail: string;
  time: string;
  memo: string;
}

export interface ScheduleDatePayload {
  date: Date;
}

export type ScheduleListResponse = ResponseTypes<Schedule[]>;

import { Dayjs } from 'dayjs';

import type { ResponseTypes } from '@/shared/api/types';

export interface CalendarDayUI {
  date: Dayjs;
  isCurrentMonth: boolean;
  isSunday: boolean;
}

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
  backgroundColor: string;
  textColor: string;
  memo: string;
}

export interface ScheduleCategory {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface CalendarScheduleEdit {
  startDate: Date;
  endDate: Date;
  category: ScheduleCategory | null;
  detail: string;
  memo: string;
}

export type CalendarScheduleResponse = ResponseTypes<CalendarSchedule[]>;

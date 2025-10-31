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

export const toCalendaerScheduleEdit = (
  data: CalendarSchedule,
): CalendarScheduleEdit => {
  const editData: CalendarScheduleEdit = {
    startDate: data.startDate,
    endDate: data.endDate,
    category: data.category,
    detail: data.detail,
    memo: data.memo,
  };

  return editData;
};

export type CalendarScheduleEdit = Omit<
  CalendarSchedule,
  'time' | 'backgroundColor' | 'textColor'
>;

export type CalendarScheduleResponse = ResponseTypes<CalendarSchedule[]>;

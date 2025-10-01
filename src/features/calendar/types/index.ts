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
  color: string;
  memo: string;
}

export interface CalendarScheduleUI {
  startDate: Dayjs;
  endDate: Dayjs;
  category: string;
  detail: string;
  time: string;
  color: string;
  memo: string;
  depth: number; // UI 렌더링을 위한 레벨 정보
}

export type CalendarScheduleResponse = ResponseTypes<CalendarSchedule[]>;

import { create } from 'zustand';

import { CalendarScheduleEdit } from '../../types';

import dayjs from '@/shared/lib/dayjs';

interface CalendarScheduleStore {
  scheduleData: CalendarScheduleEdit;
  initialData: CalendarScheduleEdit;

  updateScheduleField: <K extends keyof CalendarScheduleEdit>(
    field: K,
    value: CalendarScheduleEdit[K],
  ) => void;
  setScheduleData: (data: CalendarScheduleEdit) => void;
  initialize: (data?: CalendarScheduleEdit) => void;
  isValid: () => boolean;
  hasDataChanges: () => boolean;
  reset: () => void;
}

// 아무것도 들어온 것이 없을 경우의 데이터
const defaultScheduleData: CalendarScheduleEdit = {
  startDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
  endDate: dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss'),
  category: '',
  detail: '',
  memo: '',
};

const useCalendarScheduleStore = create<CalendarScheduleStore>()(
  (set, get) => ({
    scheduleData: defaultScheduleData,
    initialData: defaultScheduleData,

    updateScheduleField: (field, value) =>
      set(state => ({
        scheduleData: {
          ...state.scheduleData,
          [field]: value,
        },
      })),

    setScheduleData: data =>
      set({
        scheduleData: data,
      }),

    initialize: data =>
      set({
        scheduleData: data || defaultScheduleData,
        initialData: data || defaultScheduleData,
      }),

    hasDataChanges: () => {
      const { scheduleData, initialData } = get();
      return JSON.stringify(scheduleData) !== JSON.stringify(initialData);
    },

    isValid: () => {
      const { scheduleData } = get();

      return (
        scheduleData.memo.trim() !== '' &&
        scheduleData.detail.trim() !== '' &&
        scheduleData.category !== null
      );
    },

    reset: () =>
      set({
        scheduleData: defaultScheduleData,
        initialData: defaultScheduleData,
      }),
  }),
);

export default useCalendarScheduleStore;

import { create } from 'zustand';

import { CalendarScheduleEdit } from '../../types';

import dayjs from '@/shared/lib/dayjs';

interface CalendarScheduleStore {
  scheduleData: CalendarScheduleEdit;
  initialData: CalendarScheduleEdit;

  isValid: boolean;
  hasDataChanges: boolean;

  updateScheduleField: <K extends keyof CalendarScheduleEdit>(
    field: K,
    value: CalendarScheduleEdit[K],
  ) => void;
  setScheduleData: (data: CalendarScheduleEdit) => void;
  initialize: (data?: CalendarScheduleEdit) => void;

  _validate: () => void;

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

    isValid: false,
    hasDataChanges: false,

    updateScheduleField: (field, value) => {
      set(state => ({
        scheduleData: {
          ...state.scheduleData,
          [field]: value,
        },
      }));
      get()._validate();
    },

    setScheduleData: data => {
      set({
        scheduleData: data,
      });
      get()._validate();
    },

    initialize: data =>
      set({
        scheduleData: data || defaultScheduleData,
        initialData: data || defaultScheduleData,
      }),

    _validate: () => {
      const { scheduleData, initialData } = get();

      const hasChanges =
        JSON.stringify(scheduleData) !== JSON.stringify(initialData);

      const valid =
        scheduleData.memo.trim() !== '' &&
        scheduleData.detail.trim() !== '' &&
        scheduleData.category !== '';

      set({
        isValid: valid,
        hasDataChanges: hasChanges,
      });
    },

    reset: () =>
      set({
        scheduleData: defaultScheduleData,
        initialData: defaultScheduleData,
        isValid: false,
        hasDataChanges: false,
      }),
  }),
);

export default useCalendarScheduleStore;

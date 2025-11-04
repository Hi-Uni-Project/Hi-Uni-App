import { create } from 'zustand';

import { ScheduleEditForm } from '../types';

import dayjs from '@/shared/lib/dayjs';

interface CalendarScheduleStore {
  scheduleData: ScheduleEditForm;
  initialData: ScheduleEditForm;

  isValid: boolean;
  hasDataChanges: boolean;

  updateScheduleField: <K extends keyof ScheduleEditForm>(
    field: K,
    value: ScheduleEditForm[K],
  ) => void;
  setScheduleData: (data: ScheduleEditForm) => void;
  initialize: (data?: ScheduleEditForm) => void;

  _validate: () => void;

  reset: () => void;
}

// 아무것도 들어온 것이 없을 경우의 데이터
const defaultScheduleData: ScheduleEditForm = {
  id: null,
  startDate: dayjs().toDate(),
  endDate: dayjs().add(1, 'hour').toDate(),
  category: null,
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

    initialize: data => {
      set({
        scheduleData: data || defaultScheduleData,
        initialData: data || defaultScheduleData,
      });
    },

    _validate: () => {
      const { scheduleData, initialData } = get();

      const hasChanges =
        JSON.stringify(scheduleData) !== JSON.stringify(initialData);

      const valid =
        scheduleData.memo.trim() !== '' &&
        scheduleData.detail.trim() !== '' &&
        scheduleData.category !== null;

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

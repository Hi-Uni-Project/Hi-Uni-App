import { useCallback, useMemo, useRef, useState } from 'react';

import { Schedule, ScheduleDatePayload } from '../../shared/types';
import { ScheduleEditForm } from '../types';

import useDatePicker from './useDatePicker';
import useScheduleDeleteQueries from './useScheduleDeleteQueries';
import useScheduleSaveQueries from './useScheduleSaveQueries';

interface UseEditScheduleProps {
  initialData: Schedule | ScheduleDatePayload;
}

const useEditSchedule = ({ initialData }: UseEditScheduleProps) => {
  const { createSchedule, updateSchedule } = useScheduleSaveQueries();
  const { deleteSchedule } = useScheduleDeleteQueries();

  const [scheduleData, setScheduleData] = useState<ScheduleEditForm | null>(
    () => {
      if ('scheduleId' in initialData) {
        return {
          id: initialData.scheduleId,
          startDate: new Date(initialData.startDate),
          endDate: new Date(initialData.endDate),
          category: initialData.category,
          detail: initialData.detail,
          memo: initialData.memo,
        };
      } else {
        const endDate = new Date(new Date().toISOString());
        endDate.setMinutes(0, 0, 0);
        endDate.setHours(endDate.getHours() + 1);

        return {
          id: null,
          startDate: new Date(),
          endDate: endDate,
          category: null,
          detail: '',
          memo: '',
        };
      }
    },
  );

  const initialSnapshot = useRef<ScheduleEditForm>(scheduleData);

  const isValidate = useMemo(() => {
    if (!scheduleData) {
      return false;
    }

    if (scheduleData.category === null) {
      return false;
    }

    if (!scheduleData.detail || scheduleData.detail.trim() === '') {
      return false;
    }

    return true;
  }, [scheduleData]);

  const isChanged = useMemo(() => {
    if (!scheduleData || !initialSnapshot.current) {
      return false;
    }

    const initial = initialSnapshot.current;
    const current = scheduleData;

    const checks = [
      initial.startDate.getTime() !== current.startDate.getTime(),
      initial.endDate.getTime() !== current.endDate.getTime(),
      (initial.category?.categoryId ?? null) !==
        (current.category?.categoryId ?? null),
      initial.detail !== current.detail,
      initial.memo !== current.memo,
    ];

    return checks.some(Boolean);
  }, [scheduleData]);

  const updateField = useCallback(
    <Key extends keyof ScheduleEditForm>(
      field: Key,
      value: ScheduleEditForm[Key],
    ) => {
      setScheduleData(prev => {
        return { ...prev, [field]: value };
      });
    },
    [],
  );

  const datePickerController = useDatePicker({
    startDate: scheduleData?.startDate || new Date(),
    endDate:
      scheduleData?.endDate || new Date(new Date().getTime() + 60 * 60 * 1000),
    onStartDateChange: (date: Date) => {
      updateField('startDate', date);
    },
    onEndDateChange: (date: Date) => {
      updateField('endDate', date);
    },
  });

  const editSchedule = (onSuccess: () => void) => {
    if ('scheduleId' in initialData) {
      updateSchedule(scheduleData, {
        onSuccess,
      });
    } else {
      createSchedule(scheduleData, {
        onSuccess,
      });
    }
  };

  const removeSchedule = (onSuccess: () => void) => {
    deleteSchedule(scheduleData.id, {
      onSuccess,
    });
  };

  return {
    isChanged,
    isValidate,
    scheduleData,
    updateField,
    editSchedule,
    removeSchedule,
    datePickerController,
  };
};

export default useEditSchedule;

import { useCallback, useEffect, useState } from 'react';

import { Schedule } from '../../shared/types';
import { ScheduleEditForm } from '../types';

import useDatePicker from './useDatePicker';
import useScheduleDeleteQueries from './useScheduleDeleteQueries';
import useScheduleSaveQueries from './useScheduleSaveQueries';

interface UseEditScheduleProps {
  initialData: Schedule | null;
}

const useEditSchedule = ({ initialData }: UseEditScheduleProps) => {
  const { createSchedule, updateSchedule } = useScheduleSaveQueries();
  const { deleteSchedule } = useScheduleDeleteQueries();

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<ScheduleEditForm | null>(
    () => {
      if (initialData) {
        return {
          id: initialData.scheduleId,
          startDate: new Date(initialData.startDate),
          endDate: new Date(initialData.endDate),
          category: initialData.category,
          detail: initialData.detail,
          memo: initialData.memo,
        };
      }
      return null;
    },
  );

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
    if (initialData) {
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

  useEffect(() => {
    const hasChanged =
      JSON.stringify(scheduleData) !== JSON.stringify(initialData);
    setIsChanged(hasChanged);
  }, [scheduleData, initialData]);

  return {
    isChanged,
    scheduleData,
    updateField,
    editSchedule,
    removeSchedule,
    datePickerController,
  };
};

export default useEditSchedule;

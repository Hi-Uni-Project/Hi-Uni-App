import { useCallback, useEffect, useState } from 'react';

import { Schedule } from '../../shared/types';
import { ScheduleEditForm } from '../types';

import useDatePicker from './useDatePicker';
import useScheduleDeleteQueries from './useScheduleDeleteQueries';
import useScheduleSaveQueries from './useScheduleSaveQueries';

interface UseEditScheduleProps {
  initialData: Schedule | null;
}

/**
 * 이 훅은 일정 수정, 생성을 담당합니다.
 * - 일정의 초기 상태를 로딩합니다. *
 * - 처음 진입한 시점과 다르게 일정이 수정된 경우 이를 감지하여 사용자에게 알립니다. *
 * - 일정이 성공적으로 수정 또는 생성된 후, 관련 데이터를 갱신합니다. *
 */
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

  const datePickerController = useDatePicker({
    startDate: scheduleData?.startDate || new Date(),
    endDate:
      scheduleData?.endDate || new Date(new Date().getTime() + 60 * 60 * 1000),
  });

  const updateField = useCallback(
    <Key extends keyof ScheduleEditForm>(
      field: Key,
      value: ScheduleEditForm[Key],
    ) => {
      setScheduleData(prev => {
        if (!prev) {
          return null;
        }
        return { ...prev, [field]: value };
      });
    },
    [],
  );

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
    console.log('initialData stringify:', JSON.stringify(initialData));
    console.log('scheduleData stringify:', JSON.stringify(scheduleData));

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

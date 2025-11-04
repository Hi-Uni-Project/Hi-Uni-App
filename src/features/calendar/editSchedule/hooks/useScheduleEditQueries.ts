import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createSchedule, updateSchedule } from '../api/scheduleApi';
import { ScheduleEditForm } from '../types';

import dayjs from '@/shared/lib/dayjs';

const useScheduleEditQueries = () => {
  const queryClient = useQueryClient();

  const createScheduleMutation = useMutation({
    mutationFn: (scheduleData: ScheduleEditForm) => {
      if (!scheduleData.category) {
        throw new Error('카테고리를 선택해주세요.');
      }

      return createSchedule({
        startDate: dayjs(scheduleData.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: dayjs(scheduleData.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        categoryId: scheduleData.category.categoryId,
        detail: scheduleData.detail,
        memo: scheduleData.memo,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
    },
    onError: error => {
      console.error('일정 생성 실패:', error);
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: (scheduleData: ScheduleEditForm) => {
      if (!scheduleData.id) {
        throw new Error('일정 ID가 없습니다.');
      }

      if (!scheduleData.category) {
        throw new Error('카테고리를 선택해주세요.');
      }

      return updateSchedule(scheduleData.id, {
        startDate: dayjs(scheduleData.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: dayjs(scheduleData.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        categoryId: scheduleData.category.categoryId,
        detail: scheduleData.detail,
        memo: scheduleData.memo,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
    },
    onError: error => {
      console.error('일정 수정 실패:', error);
    },
  });

  return {
    createSchedule: createScheduleMutation.mutate,
    updateSchedule: updateScheduleMutation.mutate,

    isCreating: createScheduleMutation.isPending,
    isUpdating: updateScheduleMutation.isPending,

    createError: createScheduleMutation.error,
    updateError: updateScheduleMutation.error,
  };
};

export default useScheduleEditQueries;

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSchedule } from '../api/scheduleApi';

const useScheduleDeleteQueries = () => {
  const queryClient = useQueryClient();

  const deleteScheduleMutation = useMutation({
    mutationFn: (scheduleId: number) => {
      if (!scheduleId) {
        throw new Error('일정 ID가 없습니다.');
      }

      return deleteSchedule(scheduleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
    },
    onError: error => {
      console.error('일정 삭제 실패:', error);
    },
  });

  return {
    deleteSchedule: deleteScheduleMutation.mutate,
    isDeleting: deleteScheduleMutation.isPending,
    deleteError: deleteScheduleMutation.error,
  };
};

export default useScheduleDeleteQueries;

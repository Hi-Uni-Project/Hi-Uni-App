import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

import { calendarScheduleApi } from '../api/calendarApi';
import { Schedule } from '../types';
import getArrayOfMonth from '../utils/getArrayOfMonth';

export const calendarKeys = {
  all: ['calendar'] as const,
  // 주의 시작일을 기준으로 캐싱
  small: (selectedDate: Dayjs) =>
    [
      ...calendarKeys.all,
      'small',
      selectedDate.startOf('week').format('YYYY-MM-DD'),
    ] as const,
  // 월의 시작일을 기준으로 캐싱
  big: (selectedDate: Dayjs) =>
    [
      ...calendarKeys.all,
      'big',
      selectedDate.startOf('month').format('YYYY-MM-DD'),
    ] as const,
};

interface ScheduleQueryProps {
  selectedDate: Dayjs;
  mode?: 'small' | 'big';
}

const getDateRange = (selectedDate: Dayjs, mode: 'small' | 'big') => {
  if (mode === 'small') {
    return {
      startDate: selectedDate.startOf('week'),
      endDate: selectedDate.endOf('week'),
    };
  } else {
    const month = getArrayOfMonth({ date: selectedDate });
    return {
      startDate: month[0].date,
      endDate: month[month.length - 1].date,
    };
  }
};

const useScheduleQuery = ({
  selectedDate,
  mode = 'big',
}: ScheduleQueryProps) => {
  const {
    data: schedules = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Schedule[]>({
    queryKey: calendarKeys[mode](selectedDate),
    queryFn: async () => {
      const { startDate, endDate } = getDateRange(selectedDate, mode);

      const response = await calendarScheduleApi({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      });

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    schedules,
    isLoading,
    error,
    refetch,
  };
};

export default useScheduleQuery;

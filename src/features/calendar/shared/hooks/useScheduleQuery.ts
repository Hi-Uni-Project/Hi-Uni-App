import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

import fetchCalendarSchedule from '../api/calendarApi';
import getArrayOfMonth from '../utils/getArrayOfMonth';

export const calendarKeys = {
  all: ['calendar'] as const,
  schedules: (selectedDate: Dayjs) =>
    [...calendarKeys.all, 'schedules', selectedDate.format('YYYY-MM')] as const,
};

const useScheduleQuery = (selectedDate: Dayjs) => {
  const {
    data: schedules = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: calendarKeys.schedules(selectedDate),
    queryFn: () => {
      const month = getArrayOfMonth({ date: selectedDate });
      const firstDate = month[0].date;
      const lastDate = month[month.length - 1].date;

      return fetchCalendarSchedule({
        startDate: firstDate.format('YYYY-MM-DD'),
        endDate: lastDate.format('YYYY-MM-DD'),
      });
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

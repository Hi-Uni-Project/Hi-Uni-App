import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

import { fetchCalendarSchedule } from '../api/calendarApi';

import dayjs from '@/shared/lib/dayjs';

export const calendarKeys = {
  all: ['calendar'] as const,
  schedules: (selectedDate: Dayjs) =>
    [...calendarKeys.all, 'schedules', selectedDate.format('YYYY-MM')] as const,
};

const useScheduleQuery = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const {
    data: schedules = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: calendarKeys.schedules(selectedDate),
    queryFn: () =>
      fetchCalendarSchedule({
        startDate: selectedDate.startOf('month').format('YYYY-MM-DD'),
        endDate: selectedDate.endOf('month').format('YYYY-MM-DD'),
      }),
    staleTime: 5 * 60 * 1000,
  });

  return {
    selectedDate,
    setSelectedDate,
    schedules,
    isLoading,
    error,
    refetch,
  };
};

export default useScheduleQuery;

import { useMemo, useState } from 'react';

import { Dayjs } from 'dayjs';

import buildScheduleMap from '../utils/buildScheduleMap';

import useScheduleQuery from './useScheduleQuery';

import dayjs from '@/shared/lib/dayjs';

const useSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const {
    schedules,
    isLoading: isScheduleLoading,
    error: isScheduleError,
    refetch: scheduleRefetch,
  } = useScheduleQuery(selectedDate);

  const scheduleMap = useMemo(() => buildScheduleMap(schedules), [schedules]);

  const schedulesForDay = useMemo(() => {
    return scheduleMap[selectedDate.format('YYYY-MM-DD')] ?? [];
  }, [scheduleMap, selectedDate]);

  return {
    selectedDate,
    setSelectedDate,
    scheduleMap,
    schedulesForDay,
    schedules,
    isScheduleLoading,
    isScheduleError,
    scheduleRefetch,
  };
};

export default useSchedule;

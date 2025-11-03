import { useEffect, useState } from 'react';

import { dateToString } from '../../commonCalendar/utils/commonCalendarUtils';
import useCalendarScheduleStore from '../stores/useCalendarScheduleStore';

import dayjs from '@/shared/lib/dayjs';

const useDatePicker = () => {
  const updateScheduleField = useCalendarScheduleStore(
    state => state.updateScheduleField,
  );

  const startDateAlreadyExists = useCalendarScheduleStore(state => {
    return state.initialData.startDate;
  });

  const endDateAlreadyExists = useCalendarScheduleStore(state => {
    return state.initialData.endDate;
  });

  const [startDate, setStartDate] = useState<Date>(
    new Date(startDateAlreadyExists),
  );
  const [endDate, setEndDate] = useState<Date>(new Date(endDateAlreadyExists));

  // 캘린더 UI에서 현재 표시되는 월
  const [currentStartMonth, setCurrentStartMonth] = useState<string>(
    dateToString(startDate),
  );
  const [currentEndMonth, setCurrentEndMonth] = useState<string>(
    dateToString(endDate),
  );

  // 캘린더 표시 여부
  const [isStartCalendarOpen, setIsStartCalendarOpen] =
    useState<boolean>(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState<boolean>(false);

  const [isStartTimePickerOpen, setIsStartTimePickerOpen] =
    useState<boolean>(false);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] =
    useState<boolean>(false);

  const closeAllPickers = () => {
    setIsStartCalendarOpen(false);
    setIsEndCalendarOpen(false);
    setIsStartTimePickerOpen(false);
    setIsEndTimePickerOpen(false);
  };

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate);
      setCurrentEndMonth(dateToString(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    updateScheduleField('startDate', dayjs(startDate).toDate());
    updateScheduleField('endDate', dayjs(endDate).toDate());
  }, [startDate, endDate]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentStartMonth,
    setCurrentStartMonth,
    currentEndMonth,
    setCurrentEndMonth,
    isStartCalendarOpen,
    setIsStartCalendarOpen,
    isEndCalendarOpen,
    setIsEndCalendarOpen,
    isStartTimePickerOpen,
    setIsStartTimePickerOpen,
    isEndTimePickerOpen,
    setIsEndTimePickerOpen,
    closeAllPickers,
  };
};

export default useDatePicker;

import { useEffect, useState } from 'react';

import { dateToString } from '../../commonCalendar/utils/commonCalendarUtils';

interface UseDatePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange?: (date: Date) => void;
  onEndDateChange?: (date: Date) => void;
}

const useDatePicker = ({
  startDate: startDateProps,
  endDate: endDateProps,
  onStartDateChange,
  onEndDateChange,
}: UseDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(startDateProps);
  const [endDate, setEndDate] = useState<Date>(endDateProps);

  const [currentStartMonth, setCurrentStartMonth] = useState<string>(
    dateToString(startDate),
  );
  const [currentEndMonth, setCurrentEndMonth] = useState<string>(
    dateToString(endDate),
  );

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
  }, [startDate, endDate]);

  useEffect(() => {
    setCurrentStartMonth(dateToString(startDate));
    onStartDateChange?.(startDate);
  }, [startDate]);

  useEffect(() => {
    setCurrentEndMonth(dateToString(endDate));
    onEndDateChange?.(endDate);
  }, [endDate]);

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

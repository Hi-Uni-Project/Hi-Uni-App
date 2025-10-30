import { useEffect, useState } from 'react';

import { dateToString } from '../../commonCalendar/utils/commonCalendarUtils';

import dayjs from '@/shared/lib/dayjs';

// 이미 저장된 일정을 불러올때는 이걸 씁니다.
interface useDatePickerProps {
  startDateAlreadyExists?: Date;
  endDateAlreadyExists?: Date;
}

const useDatePicker = ({
  startDateAlreadyExists,
  endDateAlreadyExists,
}: useDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(
    startDateAlreadyExists || dayjs().toDate(),
  );
  const [endDate, setEndDate] = useState<Date>(
    endDateAlreadyExists || dayjs().add(1, 'hour').toDate(),
  );

  // 캘린더 UI에서 현재 표시되는 월 (더 직관적)
  const [currentStartMonth, setCurrentStartMonth] = useState<string>(
    dateToString(startDate),
  );
  const [currentEndMonth, setCurrentEndMonth] = useState<string>(
    dateToString(endDate),
  );

  // 캘린더 표시 여부 (더 직관적)
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

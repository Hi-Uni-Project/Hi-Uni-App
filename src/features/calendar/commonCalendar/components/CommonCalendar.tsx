import React, { useCallback } from 'react';

import '../config/commonCalendarLocale';
import dayjs from 'dayjs';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';

import { ExtendedTheme } from '../types/commonCalendarTypes';
import { dateToString } from '../utils/commonCalendarUtils';

import { shadowStyleSheet } from '@/shared/styles/shadow';
import ChevronLeftIcon from '@/static/icons/left_chevron.svg';
import ChevronRightIcon from '@/static/icons/right_chevron.svg';

interface CommonCalendarProps {
  selectedDate: Date;
  selectedMonth: string;
  setSelectedDate: (date: Date) => void;
  setSelectedMonth: (month: string) => void;
  minDate?: Date;
}

const CommonCalendar = ({
  selectedDate,
  selectedMonth,
  setSelectedDate,
  setSelectedMonth,
  minDate,
}: CommonCalendarProps) => {
  const onChange = ({ dateString }: DateData) => {
    const clonePrevious = new Date(selectedDate);

    const currentDate = new Date(dateString);

    currentDate.setHours(clonePrevious.getHours());
    currentDate.setMinutes(clonePrevious.getMinutes());

    setSelectedDate(currentDate);
  };

  const onMonthChange = ({ dateString }: DateData) => {
    setSelectedMonth(dateString);
  };

  const goToPreviousMonth = useCallback(
    (dateString: string) => {
      const current = dayjs(dateString);
      const previousMonth = current.subtract(1, 'month');
      setSelectedMonth(dateToString(previousMonth.toDate()));
    },
    [setSelectedMonth],
  );

  const goToNextMonth = useCallback(
    (dateString: string) => {
      const current = dayjs(dateString);
      const nextMonth = current.add(1, 'month');
      setSelectedMonth(dateToString(nextMonth.toDate()));
    },
    [setSelectedMonth],
  );

  // 커스텀 헤더 렌더링 함수
  const renderCustomHeader = useCallback(
    (date: Date) => {
      const header = dayjs(date).format('MMMM YYYY');
      const [month, year] = header.split(' ');
      const dateString = dayjs(date).format('YYYY-MM-DD');

      return (
        <View className="flex-1 flex-row items-center justify-between bg-white px-1 py-2">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-gray-800">
              {year}년 {month}
            </Text>
          </View>
          <View className="flex-row items-center space-x-7">
            <ChevronLeftIcon
              className="text-[#6568EB]"
              width={18}
              height={18}
              onPress={() => goToPreviousMonth(dateString)}
            />
            <ChevronRightIcon
              className="text-[#6568EB]"
              width={18}
              height={18}
              onPress={() => goToNextMonth(dateString)}
            />
          </View>
        </View>
      );
    },
    [goToPreviousMonth, goToNextMonth],
  );

  return (
    <Calendar
      minDate={minDate ? dayjs(minDate).format('YYYY-MM-DD') : undefined}
      firstDay={0}
      key={selectedMonth}
      monthFormat={'yyyy년 MM월'}
      hideExtraDays={true}
      current={selectedMonth.toString()}
      onDayPress={onChange}
      onMonthChange={onMonthChange}
      renderHeader={renderCustomHeader}
      hideArrows={true}
      className="mb-5 rounded-[15px] px-4 pb-4"
      style={shadowStyleSheet.dropShadow}
      markedDates={{
        [dateToString(selectedDate)]: {
          selected: true,
        },
      }}
      theme={
        {
          backgroundColor: '#2b2323',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: 'rgba(101, 104, 235, 0.12)',
          selectedDayTextColor: '#6568EB',
          todayTextColor: '#6568EB',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#6568EB',
          monthTextColor: '#2d4150',
          indicatorColor: 'blue',
          textDayFontWeight: '500',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 18,
          textMonthFontSize: 17,
          textDayHeaderFontSize: 14,
          weekVerticalMargin: 4,
        } as ExtendedTheme
      }
    />
  );
};

export default CommonCalendar;

import React, { useCallback } from 'react';

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
}

const CommonCalendar = ({
  selectedDate,
  selectedMonth,
  setSelectedDate,
  setSelectedMonth,
}: CommonCalendarProps) => {
  const onChange = ({ dateString }: DateData) => {
    const currentDate = new Date(dateString);
    setSelectedDate(currentDate);
  };

  const onMonthChange = ({ dateString }: DateData) => {
    setSelectedMonth(dateString); // 월 변경 시 업데이트
  };

  // 월 변경 함수들
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
              onPress={() => goToPreviousMonth(dateString)} // 이전 월로 이동
            />
            <ChevronRightIcon
              className="text-[#6568EB]"
              width={18}
              height={18}
              onPress={() => goToNextMonth(dateString)} // 다음 월로 이동
            />
          </View>
        </View>
      );
    },
    [goToPreviousMonth, goToNextMonth], // 의존성 추가
  );

  return (
    <Calendar
      firstDay={1}
      key={selectedMonth}
      monthFormat={'yyyy년 MM월'}
      hideExtraDays={true}
      current={selectedMonth.toString()} // 동적 업데이트
      onDayPress={onChange}
      onMonthChange={onMonthChange} // 월 변경 이벤트 추가
      renderHeader={renderCustomHeader}
      hideArrows={true} // 기본 화살표 숨김
      className="mb-5 rounded-[15px] px-4 pb-4"
      style={shadowStyleSheet.dropShadow}
      markedDates={{
        [dateToString(selectedDate)]: {
          selected: true,
          // selectedColor: 'rgba(101, 104, 235, 0.12)',
        },
      }} // 선택된 날짜 표시
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
        } as ExtendedTheme
      }
    />
  );
};

export default CommonCalendar;

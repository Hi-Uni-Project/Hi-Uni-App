import React, { useState } from 'react';

import { View, Text, Pressable } from 'react-native';

import BackMonth from '@/static/icons/back-month.svg';
import BackYear from '@/static/icons/back-year.svg';
import NextMonth from '@/static/icons/next-month.svg';
import NextYear from '@/static/icons/next-year.svg';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  mode: 'start' | 'end';
  startDate?: Date;
  endDate?: Date;
  onSelectDate: (date: Date) => void;
  onClose?: () => void;
}

const TemplateCalendar = ({
  mode,
  startDate,
  endDate,
  onSelectDate,
  onClose,
}: Props) => {
  const [currentDate, setCurrentDate] = useState<Date>(
    mode === 'start' && startDate
      ? startDate
      : mode === 'end' && endDate
        ? endDate
        : new Date(),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goPrevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };

  const goNextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDate }, (_, i) => i + 1);

  const isDateDisabled = (day: number): boolean => {
    if (mode === 'end' && startDate) {
      const startDateOnly = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );
      const currentDayOnly = new Date(year, month, day);
      return currentDayOnly < startDateOnly;
    }

    return false;
  };

  const isDateSelected = (day: number): boolean => {
    const currentDay = new Date(year, month, day);

    if (mode === 'start' && startDate) {
      return (
        currentDay.getFullYear() === startDate.getFullYear() &&
        currentDay.getMonth() === startDate.getMonth() &&
        currentDay.getDate() === startDate.getDate()
      );
    }

    if (mode === 'end' && endDate) {
      return (
        currentDay.getFullYear() === endDate.getFullYear() &&
        currentDay.getMonth() === endDate.getMonth() &&
        currentDay.getDate() === endDate.getDate()
      );
    }

    return false;
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) {
      return;
    }

    const selected = new Date(year, month, day);
    onSelectDate(selected);
    onClose?.();
  };

  return (
    <View className="rounded-2xl bg-white p-3 shadow-lg">
      <View className="mb-3 flex-row items-center justify-center space-x-3">
        <Pressable onPress={goPrevYear}>
          <BackYear />
        </Pressable>

        <Pressable onPress={goPrevMonth}>
          <BackMonth />
        </Pressable>

        <Text className="mx-2 w-[100px] text-center text-main-text typo-body-15-semibold">
          {year}년 {month + 1}월
        </Text>

        <Pressable onPress={goNextMonth}>
          <NextMonth />
        </Pressable>

        <Pressable onPress={goNextYear}>
          <NextYear />
        </Pressable>
      </View>

      <View className="mb-1 w-[280px] flex-row justify-between">
        {WEEK_DAYS.map(day => (
          <Text
            key={day}
            className="w-[40px] text-center text-surface-500 typo-caption-14-medium">
            {day}
          </Text>
        ))}
      </View>

      <View className="w-[280px] flex-row flex-wrap">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <View key={`empty-${index}`} className="h-[40px] w-[40px]" />
        ))}

        {daysArray.map(day => {
          const isSelected = isDateSelected(day);
          const isDisabled = isDateDisabled(day);

          return (
            <Pressable
              key={day}
              onPress={() => handleDateSelect(day)}
              disabled={isDisabled}
              className="h-[40px] w-[40px] items-center justify-center">
              <View
                className={`h-[35px] w-[35px] items-center justify-center rounded-md ${
                  isSelected ? 'bg-primary-purple' : ''
                }`}>
                <Text
                  className={`typo-caption-14-medium ${
                    isSelected ? 'text-white' : 'text-main-text'
                  }`}>
                  {day}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TemplateCalendar;

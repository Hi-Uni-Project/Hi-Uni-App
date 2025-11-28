import React, { useState } from 'react';

import { View, Text, Pressable } from 'react-native';

import BackMonth from '@/static/icons/back-month.svg';
import BackYear from '@/static/icons/back-year.svg';
import NextMonth from '@/static/icons/next-month.svg';
import NextYear from '@/static/icons/next-year.svg';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  onSelectDate?: (isoDate: string) => void;
}

const TemplateCalendar = ({ onSelectDate }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

  const handleDateSelect = (day: number) => {
    const selected = new Date(year, month, day);
    setSelectedDay(day);
    onSelectDate?.(selected.toISOString());
  };

  return (
    <View className="flex rounded-2xl bg-white p-3 shadow">
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
          const isSelected = selectedDay === day;

          return (
            <Pressable
              key={day}
              onPress={() => handleDateSelect(day)}
              className="h-[40px] w-[40px] items-center justify-center">
              <View
                className={`h-[35px] w-[35px] items-center justify-center rounded-md ${
                  isSelected ? 'bg-surface-200' : ''
                }`}>
                <Text className="text-main-text typo-caption-14-medium">
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

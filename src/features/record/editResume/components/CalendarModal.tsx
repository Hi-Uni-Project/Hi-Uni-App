import React, { useState, useEffect } from 'react';

import { Modal, Pressable, View, Text } from 'react-native';

import { shadowStyleSheet } from '@/shared/styles/shadow';
import BackMonth from '@/static/icons/back-month.svg';
import BackYear from '@/static/icons/back-year.svg';
import NextMonth from '@/static/icons/next-month.svg';
import NextYear from '@/static/icons/next-year.svg';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (dateStr: string) => void;
  initialDate?: Date | null;
  anchorPosition: { x: number; y: number };
}

const CalendarModal = ({
  visible,
  onClose,
  onSelectDate,
  initialDate,
  anchorPosition,
}: CalendarModalProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(
    initialDate || new Date(),
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(
    initialDate ? initialDate.getDate() : null,
  );

  useEffect(() => {
    if (visible && initialDate) {
      setCurrentDate(initialDate);
      setSelectedDay(initialDate.getDate());
    }
  }, [visible, initialDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goPrevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
    setSelectedDay(null);
  };

  const goNextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
    setSelectedDay(null);
  };

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDate }, (_, i) => i + 1);

  const handleDateSelect = (day: number) => {
    setSelectedDay(day);

    // "YY.MM.DD" 형식으로 변환
    const yearStr = (year % 100).toString().padStart(2, '0');
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const dateStr = `${yearStr}.${monthStr}.${dayStr}`;

    onSelectDate(dateStr);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable className="flex-1" onPress={onClose}>
        <View
          className="absolute rounded-2xl bg-white p-3"
          style={[
            {
              left: anchorPosition.x,
              top: anchorPosition.y + 10,
            },
            shadowStyleSheet.dropShadow,
          ]}>
          <Pressable onPress={e => e.stopPropagation()}>
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
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CalendarModal;

import React from 'react';

import dayjs, { Dayjs } from 'dayjs';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { CalendarSchedule } from '../../shared/types';
import getArrayOfMonth from '../../shared/utils/getArrayOfMonth';

import MultiDot from './MultiDot';

interface DotCalendarProps {
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  onPressDate?: (date: Dayjs) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  scheduleMap?: Record<string, CalendarSchedule[]>;
}

const DotCalendar = ({
  selectedDate,
  setSelectedDate,
  onPressDate,
  onLayout,
  scheduleMap,
}: DotCalendarProps) => {
  const { width: screenWidth } = useWindowDimensions();

  const dates = getArrayOfMonth({
    date: dayjs(selectedDate),
  });

  // 좌우 Swipe 감지
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 20,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        setSelectedDate(selectedDate.subtract(1, 'month'));
      } else if (gestureState.dx < -50) {
        setSelectedDate(selectedDate.add(1, 'month'));
      }
    },
  });

  // 셀 gap 4 * 6 = 24
  const totalCellGap = 24;
  // 좌우 패딩 14 * 2 = 28
  const totalHorizontalPadding = 28;
  // 셀 크기 계산
  const cellSize = (screenWidth - totalHorizontalPadding - totalCellGap) / 7;

  return (
    <View
      {...panResponder.panHandlers}
      onLayout={onLayout}
      className="mx-[14px] mb-[11px] items-center rounded-[10px] bg-white px-[1.5px]">
      <View>
        <View className="flex-row gap-[1.5px] px-[1.5px]">
          {[...Array(7)].map((_, day) => (
            <Text
              key={day}
              style={{ width: cellSize }}
              className="py-[9px] text-center text-surface-400 typo-body-15-semibold">
              {dayjs().day(day).format('ddd')}
            </Text>
          ))}
        </View>

        {[...Array(dates.length / 7)].map((_, weekIndex) => {
          const start = weekIndex * 7;
          const end = start + 7;
          const weekDays = dates.slice(start, end);

          return (
            <View key={weekIndex}>
              <View className="mx-[6px] mb-[2px] h-[1.5px] bg-[#F3F3F3]" />
              <View
                key={weekIndex}
                className="relative flex-row items-start gap-[1.5px] px-[1.5px]">
                {weekDays.map(day => (
                  <Pressable
                    onPress={() => onPressDate && onPressDate(day.date)}
                    key={day.date.format('YYYY-MM-DD')}
                    style={[{ width: cellSize }]}
                    className="items-center">
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {day.date.isSame(selectedDate, 'day') && (
                        <Animated.View
                          entering={FadeIn.delay(100).duration(200)}
                          style={{
                            position: 'absolute',
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            backgroundColor: '#6568EB',
                          }}
                        />
                      )}
                      <Text
                        style={[
                          styles.dateText,
                          day.isSunday && styles.sundayText,
                          !day.isCurrentMonth && styles.nonCurrentMonthText,
                          day.date.isSame(selectedDate, 'day') && {
                            color: '#FFF',
                          },
                        ]}
                        className="typo-caption-13-medium">
                        {day.date.format('D')}
                      </Text>
                    </View>
                    <View className="h-5">
                      <MultiDot
                        schedules={
                          scheduleMap?.[day.date.format('YYYY-MM-DD')] ?? []
                        }
                        spacing={3}
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#6568EB',
    borderRadius: 16,
    width: 24,
    height: 24,
  },
  selectedDateText: {
    color: '#FFF',
  },
  dateText: {
    color: '#000',
  },
  sundayText: {
    color: '#FB6C6C',
  },
  nonCurrentMonthText: {
    color: '#DADADA',
  },
});

export default DotCalendar;

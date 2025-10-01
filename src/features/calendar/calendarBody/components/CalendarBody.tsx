import React, { useEffect } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import getArrayOfMonth from '../utils/getArrayOfMonth';

// Date만 받아서, 달력 형태로 보여줌
// 데이터를 내부에서 불러와서 처리함
// dot, list 타입으로 보여줄 수 있음

// list 타입의 경우, 기본 3칸

interface CalendarBodyProps {
  date: Dayjs;
  onPressDate?: (date: Dayjs) => void;
  type?: 'list' | 'dot';
}

const CalendarBody = ({
  date,
  onPressDate,
  type = 'list',
}: CalendarBodyProps) => {
  const screenWidth = Dimensions.get('window').width;

  const dates = getArrayOfMonth({
    date: dayjs(date),
  });

  // 한 칸 크기 = 화면 너비 / 7
  const totalCellGap = 24;
  const totalHorizontalPadding = 28;
  const cellSize = (screenWidth - totalHorizontalPadding - totalCellGap) / 7;

  useEffect(() => {
    console.log(dates);
    console.log(type);
  }, []);

  return (
    <ScrollView
      scrollEnabled={false}
      onLayout={e => {
        console.log('height:', e.nativeEvent.layout.height);
      }}
      className="mx-[14px] mb-[11px] flex-1 rounded-[10px] bg-white px-[1.5px]"
      contentContainerStyle={{ alignItems: 'center' }}>
      <View
        onLayout={e => {
          console.log('height:', e.nativeEvent.layout.height);
        }}>
        {/* 요일 헤더 */}
        <View className="flex-row gap-[1.5px] px-[1.5px]">
          {[0, 1, 2, 3, 4, 5, 6].map(day => (
            <Text
              key={day}
              style={{ width: cellSize }}
              className="bg-red-100 py-[9px] text-center text-surface-400 typo-body-15-semibold">
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
              <View className="mx-[6px] h-[3px] bg-[#F3F3F3]" />
              <View
                key={weekIndex}
                className="flex-row items-start gap-[1.5px] px-[1.5px]">
                {weekDays.map(day => (
                  <Pressable
                    onPress={() => onPressDate && onPressDate(day.date)}
                    key={day.date.format('YYYY-MM-DD')}
                    style={[{ width: cellSize }]}
                    className="min-h-[92px] items-center">
                    <View
                      style={[
                        {
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 3,
                        },
                        day.date.isSame(date, 'day') && styles.selectedDate,
                      ]}>
                      <Text
                        style={[
                          styles.dateText,
                          day.isSunday && styles.sundayText,
                          !day.isCurrentMonth && styles.nonCurrentMonthText,
                          day.date.isSame(date, 'day') &&
                            styles.selectedDateText,
                        ]}
                        className="typo-caption-13-medium">
                        {day.date.format('D')}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#6568EB',
    borderRadius: 19,
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

export default CalendarBody;

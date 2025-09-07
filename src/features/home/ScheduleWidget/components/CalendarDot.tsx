import React from 'react';

import { View } from 'react-native';

import { MockScheduleData } from '../mocks/scheduleMock';

interface CalendarDotProps {
  weeks: Date[];
  // mock data 추후 수정
  schedule: MockScheduleData[];
  positions: { [key: number]: number };
}

const CalendarDot = ({ weeks, schedule, positions }: CalendarDotProps) => {
  // 로직은 추후 변경 가능. 데이터에서 일정을 찾는다는 개념만 동일
  const getScheduledDays: boolean[] = weeks.map(week => {
    return schedule[week.getDate() - 1].schedule.length !== 0;
  });

  return (
    <>
      {getScheduledDays.map((hasSchedule, index) => {
        if (hasSchedule) {
          return (
            <View
              key={`schedule-dot-${index}`}
              className="absolute bottom-[-12px] h-2 w-[41px] items-center"
              style={{
                left: positions[index] ?? 0,
              }}>
              <View className="h-[10px] w-[10px] items-center rounded-[10px] bg-[#E4E4F4]" />
            </View>
          );
        }
      })}
    </>
  );
};

export default CalendarDot;

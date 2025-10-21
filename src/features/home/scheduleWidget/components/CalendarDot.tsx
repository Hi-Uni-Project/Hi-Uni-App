import React from 'react';

import { View } from 'react-native';

import { CalendarSchedule } from '@/features/calendar/types';
import dayjs from '@/shared/lib/dayjs';

interface CalendarDotProps {
  weeks: Date[];
  schedule: CalendarSchedule[];
  positions: Record<number, number>;
}

const CalendarDot = ({ weeks, schedule, positions }: CalendarDotProps) => {
  const getScheduledDays: boolean[] = weeks.map(week => {
    const currentDay = dayjs(week);

    const overlappingSchedules = schedule.filter(sched => {
      const startDate = dayjs(sched.startDate);
      const endDate = dayjs(sched.endDate);

      return currentDay.isBetween(startDate, endDate, 'day', '[]');
    });

    return overlappingSchedules.length > 0;
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

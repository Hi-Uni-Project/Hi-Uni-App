import React from 'react';

import { View } from 'react-native';

import { CalendarSchedule } from '../../shared/types';

interface MultiDotProps {
  schedules: CalendarSchedule[];
  size?: number;
  spacing?: number;
}

const MultiDot = ({ schedules, size = 5, spacing = 2 }: MultiDotProps) => {
  const displaySchedules = schedules.slice(0, 5);

  return (
    <View className="mt-[2px] flex-row justify-center">
      {displaySchedules.map((schedule, index) => (
        <View
          key={index}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: schedule.backgroundColor,
            marginHorizontal: spacing / 2,
          }}
        />
      ))}
    </View>
  );
};

export default MultiDot;

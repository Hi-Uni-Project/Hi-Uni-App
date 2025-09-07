import React from 'react';

import { View } from 'react-native';

import useMiniCalendarAnimation from '../hooks/useMiniCalendarAnimation';
import useMiniCalendarItemPosition from '../hooks/useMiniCalendarItemPosition';

import CalendarItem from './CalendarItem';
import ScheduleDot from './ScheduleDot';
import SelectionIndicator from './SelectionIndicator';

interface MiniCalendarProps {
  weeks: Date[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const MiniCalendar = ({
  weeks,
  selectedDate,
  onDateSelect,
}: MiniCalendarProps) => {
  const { indexPositions, checkItemLayout } = useMiniCalendarItemPosition();
  const { selectedPosition } = useMiniCalendarAnimation({
    selectedDate,
    indexPositions,
  });

  return (
    <View className="relative">
      <SelectionIndicator selectedPosition={selectedPosition} />
      <View className="w-full flex-row items-center justify-between">
        {weeks.map(week => {
          return (
            <CalendarItem
              key={week.toString()}
              week={week}
              onDateSelect={onDateSelect}
              onLayout={event => checkItemLayout(week.getDay(), event)}
              isSelected={week.getDate() === selectedDate.getDate()}
            />
          );
        })}
      </View>
      <ScheduleDot />
    </View>
  );
};

export default MiniCalendar;

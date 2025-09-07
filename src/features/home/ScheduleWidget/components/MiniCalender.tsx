import React from 'react';

import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import useMiniCalendarAnimation from '../hooks/useMiniCalendarAnimation';

import CalendarItem from './CalendarItem';
import MiniCalendarAnimatedView from './MiniCalendarAnimatedView';

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
  const { checkItemLayout, selectedPosition } = useMiniCalendarAnimation({
    selectedDate,
  });

  return (
    <View className="relative">
      <MiniCalendarAnimatedView selectedPosition={selectedPosition} />
      <Animated.View />
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
    </View>
  );
};

export default MiniCalendar;

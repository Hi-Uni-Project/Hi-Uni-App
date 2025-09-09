import React from 'react';

import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const dayNames: Record<number, string> = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

interface CalendarItemProps {
  week: Date;
  onDateSelect: (date: Date) => void;
  isSelected: boolean;
  onLayout?: (event: { nativeEvent: { layout: { x: number } } }) => void;
}

const CalendarItem = ({
  week,
  onDateSelect,
  onLayout,
  isSelected,
}: CalendarItemProps) => {
  const dateAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: withSpring(isSelected ? '#6568EB' : '#6E6E6E'),
    };
  }, [isSelected]);

  return (
    <View
      className="h-[71px] w-[41px] items-center justify-center rounded-[41px]"
      onLayout={onLayout}>
      <Pressable
        className="h-full w-full items-center justify-center rounded-[41px]"
        onPress={() => onDateSelect(week)}>
        <Animated.Text
          style={dateAnimatedStyle}
          className="pb-2 typo-caption-13-light">
          {dayNames[week.getDay()]}
        </Animated.Text>
        <Animated.Text
          style={dateAnimatedStyle}
          className="typo-body-15-medium">
          {week.getDate()}
        </Animated.Text>
      </Pressable>
    </View>
  );
};

export default CalendarItem;

import React from 'react';

import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ScheduleListItemProps {
  category: string;
  detail: string;
  time: string;
}

const ScheduleListItem = ({
  category,
  detail,
  time,
}: ScheduleListItemProps) => {
  return (
    <Animated.View
      className="flex-row items-center justify-between"
      entering={FadeIn.delay(150)}>
      <View className="flex-1 flex-row items-center space-x-2">
        <View className="rounded-full bg-surface-500 px-[11px] py-1">
          <Text className="text-white typo-caption-14-light">{category}</Text>
        </View>
        <Text
          className="flex-1 text-secondary-black typo-caption-14-semibold"
          numberOfLines={1}
          ellipsizeMode="tail">
          {detail}
        </Text>
      </View>
      <Text className="text-surface-500 typo-caption-13-light">{time}</Text>
    </Animated.View>
  );
};

export default ScheduleListItem;

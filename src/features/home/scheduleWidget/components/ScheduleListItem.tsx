import React from 'react';

import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ScheduleListItemProps {
  category: string;
  detail: string;
  time: string;
  categoryBackgroundColor: string;
  categoryTextColor: string;
  memo: string;
}

const ScheduleListItem = ({
  category,
  detail,
  time,
  categoryBackgroundColor,
  categoryTextColor,
  memo,
}: ScheduleListItemProps) => {
  return (
    <Animated.View entering={FadeIn.delay(150)}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center space-x-2">
          <View
            className="rounded-full px-[11px] py-1"
            style={{ backgroundColor: categoryBackgroundColor }}>
            <Text
              className="text-white typo-caption-14-light"
              style={{ color: categoryTextColor }}>
              {category}
            </Text>
          </View>
          <Text
            className="flex-1 text-secondary-black typo-caption-14-semibold"
            numberOfLines={1}
            ellipsizeMode="clip">
            {detail}
          </Text>
        </View>
        <Text className="ml-3 text-surface-500 typo-caption-13-light">
          {time}
        </Text>
      </View>
      <View className="mt-[9px] rounded-[15px] bg-surface-100 px-[16px] py-[14px]">
        <Text className="text-main-text typo-caption-13-medium">{memo}</Text>
      </View>
    </Animated.View>
  );
};

export default ScheduleListItem;

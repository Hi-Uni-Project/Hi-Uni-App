import React from 'react';

import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { MockScheduleItem } from '../mocks/scheduleMock';

// 추후 타입 정의 필요
interface ScheduleListItemProps extends MockScheduleItem {}

const ScheduleListItem = ({
  category,
  detail,
  time,
}: ScheduleListItemProps) => {
  return (
    <Animated.View
      className="flex-row items-center justify-between"
      entering={FadeIn.delay(150)}>
      <View className="flex-row items-center space-x-2">
        <View className="rounded-full bg-[#979797] px-[11px] py-1">
          <Text className="text-white typo-14-regular">{category}</Text>
        </View>
        <Text className="text-[#1E2128] typo-body-14-semibold">{detail}</Text>
      </View>
      <Text className="text-[#979797] typo-body-13-light">{time}</Text>
    </Animated.View>
  );
};

export default ScheduleListItem;

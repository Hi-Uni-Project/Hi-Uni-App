import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Schedule } from '../../shared/types';

import { CalendarStackNavigationProp } from '@/navigation/types/navigationTypes';

interface ScheduleListItemProps extends Schedule {}

const ScheduleListItem = ({
  scheduleId,
  startDate,
  endDate,
  category,
  detail,
  time,
  memo,
}: ScheduleListItemProps) => {
  const navigation = useNavigation<CalendarStackNavigationProp>();

  return (
    <Animated.View entering={FadeIn.delay(150)}>
      <Pressable
        onPress={() =>
          navigation.navigate('EditSchedule', {
            scheduleId,
            startDate,
            endDate,
            category,
            detail,
            time,
            memo,
          })
        }>
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center space-x-2">
            <View
              className="rounded-full px-[11px] py-1"
              style={{ backgroundColor: category.backgroundColor }}>
              <Text
                className="text-white typo-caption-14-light"
                style={{ color: category.textColor }}>
                {category.categoryName}
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
          <Text
            className="text-main-text typo-caption-13-medium"
            numberOfLines={1}
            ellipsizeMode="tail">
            {memo}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ScheduleListItem;

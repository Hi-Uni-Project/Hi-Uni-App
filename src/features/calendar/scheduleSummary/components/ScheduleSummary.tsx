import React from 'react';

import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import dayjs from '@/shared/lib/dayjs';

interface ScheduleSummaryProps {
  category: string;
  detail: string;
  time: string;
  memo: string;
  backgroundColor: string;
  textColor: string;
  startDate: string;
  endDate: string;
}

const ScheduleSummary = ({
  category,
  detail,
  time,
  memo,
  backgroundColor = '#979797',
  textColor = '#FFFFFF',
  startDate,
  endDate,
}: ScheduleSummaryProps) => {
  const isScheduleLong = startDate !== endDate;

  const { startTime, endTime } = time.split(' - ').reduce(
    (acc, cur, idx) => {
      if (idx === 0) {
        acc.startTime = cur;
      } else {
        acc.endTime = cur;
      }
      return acc;
    },
    { startTime: '', endTime: '' },
  );

  return (
    <Pressable onPress={() => console.log('Navigate to schedule detail')}>
      <Animated.View
        className="mb-[11px] w-full flex-row items-center justify-between rounded-[10px] bg-white"
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}>
        <View className="flex-1 flex-row items-center">
          <Text
            className="mr-2 rounded-full px-[13px] py-[3px] typo-body-16-regular"
            style={{ backgroundColor, color: textColor }}>
            {category}
          </Text>
          <Text
            className="flex-1 text-main-text typo-body-16-semibold"
            numberOfLines={1}
            ellipsizeMode="clip">
            {detail}
          </Text>
        </View>

        {isScheduleLong ? (
          <View className="ml-3 flex-row">
            <View className="flex-col items-center">
              <Text className="text-surface-500 typo-caption-9-light">
                {dayjs(startDate).format('YYYY년 M월 D일')}
              </Text>
              <Text className="mt-[-6px] text-surface-500 typo-caption-14-light">
                {startTime}
              </Text>
            </View>

            <View className="mb-[2px] h-auto justify-end">
              <Text className="text-surface-500">-</Text>
            </View>

            <View className="flex-col items-center">
              <Text className="text-surface-500 typo-caption-9-light">
                {dayjs(endDate).format('YYYY년 M월 D일')}
              </Text>
              <Text className="mt-[-6px] text-surface-500 typo-caption-14-light">
                {endTime}
              </Text>
            </View>
          </View>
        ) : (
          <Text className="ml-3 text-surface-500 typo-caption-14-light">
            {time}
          </Text>
        )}
      </Animated.View>
      {memo && memo.length > 0 && (
        <View className="mb-[14px] rounded-[15px] bg-surface-100 px-4 py-3">
          <Text
            className="text-main-text typo-caption-14-regular"
            numberOfLines={1}
            ellipsizeMode="tail">
            {memo}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ScheduleSummary;

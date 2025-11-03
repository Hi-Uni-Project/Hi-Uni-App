import React, { useMemo } from 'react';

import { View, Text, FlatList, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import ScheduleListItem from './ScheduleListItem';

import { Schedule } from '@/features/calendar/shared/types';
import dayjs from '@/shared/lib/dayjs';
import AddIcons from '@/static/icons/add.svg';

const ItemSeparator = () => <View className="h-[6px]" />;

const ListEmptyComponent = () => (
  <Animated.View entering={FadeIn.delay(150)}>
    <Text className="text-surface-400 typo-caption-14-regular">
      아직 등록한 일정이 없어요.
    </Text>
  </Animated.View>
);

interface ScheduleListProps {
  selectedDate: Date;
  schedule: Schedule[];
}

const ScheduleList = ({ selectedDate, schedule }: ScheduleListProps) => {
  const filteredSchedule = useMemo(() => {
    return schedule.filter(item => {
      return dayjs(selectedDate).isBetween(
        dayjs(item.startDate).startOf('day'),
        dayjs(item.endDate).endOf('day'),
        null,
        '[]',
      );
    });
  }, [selectedDate, schedule]);

  return (
    <View className="relative">
      <Text className="mb-[15px] text-[15px] typo-body-15-medium">
        {dayjs(selectedDate).format('YYYY년 M월 D일 (ddd)')}
      </Text>
      <FlatList
        data={filteredSchedule}
        renderItem={({ item }) => (
          <ScheduleListItem
            scheduleId={item.scheduleId}
            startDate={item.startDate}
            endDate={item.endDate}
            category={item.category}
            detail={item.detail}
            time={item.time}
            memo={item.memo}
            key={item.scheduleId}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
      />
      {schedule.length === 0 && (
        <Pressable
          className="absolute right-0 top-0"
          onPress={() => {
            console.log('일정 추가하기');
          }}>
          <Animated.View entering={FadeIn.delay(150)}>
            <AddIcons width={20} height={20} color={'#B7B7B7'} />
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

export default ScheduleList;

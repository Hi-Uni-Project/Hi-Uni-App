import React from 'react';

import { View, Text, FlatList, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { MockScheduleData } from '../mocks/scheduleMock';

import ScheduleListItem from './ScheduleListItem';

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
  // mock data 추후 수정
  schedule: MockScheduleData[];
}

const ScheduleList = ({ selectedDate, schedule }: ScheduleListProps) => {
  // 로직은 추후 변경 가능. 데이터에서 일정을 찾는다는 개념만 동일
  const scheduleItems = schedule[selectedDate.getDate() - 1]
    ? schedule[selectedDate.getDate() - 1].schedule.filter(
        (_, index) => index < 3,
      )
    : [];

  return (
    <View className="relative">
      <Text className="mb-[15px] text-[15px] typo-body-15-medium">
        {dayjs(selectedDate).format('YYYY년 M월 D일 (ddd)')}
      </Text>
      <FlatList
        data={scheduleItems}
        renderItem={({ item }) => (
          <ScheduleListItem
            category={item.category}
            detail={item.detail}
            time={item.time}
            key={item.time}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
      />
      {scheduleItems.length === 0 && (
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

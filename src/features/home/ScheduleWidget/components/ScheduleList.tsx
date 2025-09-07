import React from 'react';

import { View, Text, FlatList } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { MockScheduleData } from '../mocks/scheduleMock';
import formatKoreanDate from '../utils/formatKoreanDate';

import ScheduleListItem from './ScheduleListItem';

const ItemSeparator = () => <View className="h-[6px]" />;

const ListEmptyComponent = () => (
  <Animated.View entering={FadeIn.delay(150)}>
    <Text className="text-[#B7B7B7] typo-14-regular">
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
    ? schedule[selectedDate.getDate() - 1].schedule
    : [];

  return (
    <View>
      <Text className="mb-[15px] text-[15px] font-normal">
        {formatKoreanDate(selectedDate)}
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
    </View>
  );
};

export default ScheduleList;

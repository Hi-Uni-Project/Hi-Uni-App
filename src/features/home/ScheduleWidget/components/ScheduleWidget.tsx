import React, { useEffect, useState } from 'react';

import { Pressable, Text, View, ViewProps } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

import { mockSeptember2025ScheduleData } from '../mocks/scheduleMock';
import getWeeks from '../utils/getWeeks';

import MiniCalendar from './MiniCalendar';
import ScheduleList from './ScheduleList';
import { MiniCalendarSkeleton, ScheduleListSkeleton } from './Skeletons';

import AnimatedCardView from '@/shared/components/AnimatedCardView';
import DiaryIcon from '@/static/icons/diary.svg';

interface ScheduleWidgetProps extends ViewProps {}

const ScheduleWidget = ({}: ScheduleWidgetProps) => {
  const [weeks] = useState<Date[]>(getWeeks());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 스케줄을 가져오는 로직 추후 구현
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setTimeout(() => {
        setSchedule(mockSeptember2025ScheduleData);
        setIsLoading(false);
      }, 2000);
    };
    fetchSchedule();
  }, []);

  return (
    <AnimatedCardView className="mx-5 mt-[14px]" layout={LinearTransition}>
      <View className="relative h-[146px] items-center justify-center border-b-[1px] border-gray-200">
        <View className="absolute top-0 w-full flex-row items-center justify-between p-4">
          <Text className="typo-main-button-16-semibold">내 일정</Text>
          <Pressable onPress={() => console.log('캘린더로 이동')}>
            <DiaryIcon width={18} height={18} />
          </Pressable>
        </View>
        <View className="mt-5 items-center justify-center px-4">
          {isLoading ? (
            <MiniCalendarSkeleton />
          ) : (
            <MiniCalendar
              weeks={weeks}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              schedule={schedule}
            />
          )}
        </View>
      </View>

      <View className="p-4">
        {isLoading ? (
          <ScheduleListSkeleton />
        ) : (
          <ScheduleList selectedDate={selectedDate} schedule={schedule} />
        )}
      </View>
    </AnimatedCardView>
  );
};

export default ScheduleWidget;

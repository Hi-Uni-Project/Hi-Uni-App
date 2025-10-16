import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View, ViewProps } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

import { mockSeptember2025ScheduleData } from '../mocks/scheduleMock';

import MiniCalendar from './MiniCalendar';
import ScheduleList from './ScheduleList';

import { calendarScheduleApi } from '@/features/calendar/api/calendarApi';
import { HomeTabNavigationProp } from '@/navigation/types/navigationTypes';
import AnimatedCardView from '@/shared/components/AnimatedCardView';
import getWeeks from '@/shared/utils/date/getWeeks';
import DiaryIcon from '@/static/icons/diary.svg';

interface ScheduleWidgetProps extends ViewProps {}

const ScheduleWidget = ({}: ScheduleWidgetProps) => {
  const [weeks] = useState<Date[]>(getWeeks());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 스케줄을 가져오는 로직 추후 구현
  const [schedule] = useState(mockSeptember2025ScheduleData);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<HomeTabNavigationProp>();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await calendarScheduleApi({
          startDate: '2025-01-01',
          endDate: '2025-12-31',
        });
        console.log(response);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <AnimatedCardView className="mx-5 mt-[14px]" layout={LinearTransition}>
      <View className="relative h-[146px] items-center justify-center border-b-[1px] border-gray-200">
        <View className="absolute top-0 w-full flex-row items-center justify-between p-4">
          <Text className="typo-body-16-bold">내 일정</Text>
          <Pressable onPress={() => navigation.navigate('Calendar')}>
            <DiaryIcon width={18} height={18} />
          </Pressable>
        </View>
        <View className="mt-5 items-center justify-center px-4">
          {isLoading ? (
            <Text>로딩중..</Text>
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
          <Text>로딩중..</Text>
        ) : (
          <ScheduleList selectedDate={selectedDate} schedule={schedule} />
        )}
      </View>
    </AnimatedCardView>
  );
};

export default ScheduleWidget;

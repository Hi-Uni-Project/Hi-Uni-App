import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View, ViewProps } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

import MiniCalendar from '../../../calendar/widgetCalendar/components/MiniCalendar';
import ScheduleList from '../../../calendar/widgetCalendar/components/ScheduleList';

import useScheduleQuery from '@/features/calendar/shared/hooks/scheduleQueries';
import { HomeTabNavigationProp } from '@/navigation/types/navigationTypes';
import AnimatedCardView from '@/shared/components/AnimatedCardView';
import dayjs from '@/shared/lib/dayjs';
import getWeeks from '@/shared/utils/date/getWeeks';
import DiaryIcon from '@/static/icons/diary.svg';

interface ScheduleWidgetProps extends ViewProps {}

const ScheduleWidget = ({}: ScheduleWidgetProps) => {
  const [weeks] = useState<Date[]>(getWeeks());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const navigation = useNavigation<HomeTabNavigationProp>();

  const { schedules, isLoading } = useScheduleQuery({
    selectedDate: dayjs(selectedDate),
    mode: 'small',
  });

  useEffect(() => {
    console.log('Selected date changed:', selectedDate.toLocaleString());
    console.log('Schedules for selected date:', schedules);
  }, [selectedDate]);

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
              schedule={schedules}
            />
          )}
        </View>
      </View>

      <View className="p-4">
        {isLoading ? (
          <Text>로딩중..</Text>
        ) : (
          <ScheduleList selectedDate={selectedDate} schedule={schedules} />
        )}
      </View>
    </AnimatedCardView>
  );
};

export default ScheduleWidget;

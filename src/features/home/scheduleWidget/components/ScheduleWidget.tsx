import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View, ViewProps } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

import MiniCalendar from './MiniCalendar';
import ScheduleList from './ScheduleList';

import { calendarScheduleApi } from '@/features/calendar/api/calendarApi';
import { CalendarSchedule } from '@/features/calendar/types';
import { HomeTabNavigationProp } from '@/navigation/types/navigationTypes';
import AnimatedCardView from '@/shared/components/AnimatedCardView';
import dayjs from '@/shared/lib/dayjs';
import getWeeks from '@/shared/utils/date/getWeeks';
import DiaryIcon from '@/static/icons/diary.svg';

interface ScheduleWidgetProps extends ViewProps {}

const ScheduleWidget = ({}: ScheduleWidgetProps) => {
  const [weeks] = useState<Date[]>(getWeeks());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [schedule, setSchedule] = useState<CalendarSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<HomeTabNavigationProp>();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const startOfWeek = dayjs().startOf('week');
        const endOfWeek = dayjs().endOf('week');

        const response = await calendarScheduleApi({
          startDate: startOfWeek.format('YYYY-MM-DD'),
          endDate: endOfWeek.format('YYYY-MM-DD'),
        });

        setSchedule(response.data);
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

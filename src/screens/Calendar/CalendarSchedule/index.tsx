import React, { useEffect } from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import EditSchedule from '@/features/calendar/editSchedule/components/EditSchedule';
import CalendarDetailHeader from '@/features/calendar/editSchedule/layouts/CalendarDetailHeader';
import useCalendarScheduleStore from '@/features/calendar/editSchedule/stores/useCalendarScheduleStore';
import { CalendarSchedule } from '@/features/calendar/types';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

// Route params 타입 정의
type CalendarScheduleRouteProp = RouteProp<{
  CalendarSchedule: {
    existData?: CalendarSchedule;
  };
}>;

const CalendarScheduleScreen = () => {
  const route = useRoute<CalendarScheduleRouteProp>();
  const existData = route.params?.existData;

  const storeInitialize = useCalendarScheduleStore(state => state.initialize);
  const storeReset = useCalendarScheduleStore(state => state.reset);

  useEffect(() => {
    storeInitialize(existData);

    return () => {
      storeReset();
    };
  }, [existData, storeInitialize, storeReset]);

  return (
    <ScreenLayout>
      <CalendarDetailHeader />
      <ScrollView className="px-6">
        <EditSchedule />
      </ScrollView>
    </ScreenLayout>
  );
};

export default CalendarScheduleScreen;

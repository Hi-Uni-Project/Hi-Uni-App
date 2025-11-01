import React, { useEffect } from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import EditSchedule from '@/features/calendar/editSchedule/components/EditSchedule';
import CalendarDetailHeader from '@/features/calendar/editSchedule/layouts/CalendarDetailHeader';
import useCalendarScheduleStore from '@/features/calendar/editSchedule/stores/useCalendarScheduleStore';
import { CalendarSchedule } from '@/features/calendar/shared/types';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

type CalendarScheduleRouteProp = RouteProp<{
  EditSchedule: CalendarSchedule;
}>;

const CalendarScheduleScreen = () => {
  const route = useRoute<CalendarScheduleRouteProp>();
  const existData = route.params;

  const storeInitialize = useCalendarScheduleStore(state => state.initialize);
  const storeReset = useCalendarScheduleStore(state => state.reset);

  const isValid = useCalendarScheduleStore(state => state.isValid);
  const hasDataChanges = useCalendarScheduleStore(
    state => state.hasDataChanges,
  );

  const isCompleteDisabled = !isValid || !hasDataChanges;

  useEffect(() => {
    storeInitialize(existData);

    return () => {
      storeReset();
    };
  }, [existData, storeInitialize, storeReset]);

  return (
    <ScreenLayout>
      <CalendarDetailHeader
        onCompletePress={() => {}}
        isCompleteDisabled={isCompleteDisabled}
      />
      <ScrollView className="px-6">
        <EditSchedule />
      </ScrollView>
    </ScreenLayout>
  );
};

export default CalendarScheduleScreen;

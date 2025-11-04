import React, { useEffect } from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import EditSchedule from '@/features/calendar/editSchedule/components/EditSchedule';
import CalendarDetailHeader from '@/features/calendar/editSchedule/layouts/CalendarDetailHeader';
import useCalendarScheduleStore from '@/features/calendar/editSchedule/stores/useCalendarScheduleStore';
import { ScheduleEditForm } from '@/features/calendar/editSchedule/types';
import { Schedule } from '@/features/calendar/shared/types';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

type CalendarScheduleRouteProp = RouteProp<{
  EditSchedule: Schedule;
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
    const scheduleEditForm: ScheduleEditForm = {
      id: existData.scheduleId,
      startDate: new Date(existData.startDate),
      endDate: new Date(existData.endDate),
      category: existData.category,
      detail: existData.detail,
      memo: existData.memo,
    };

    storeInitialize(scheduleEditForm);

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

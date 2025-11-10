import React, { useEffect } from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import ScheduleDurationPicker from '@/features/calendar/editSchedule/components/ScheduleDurationPicker';
import ScheduleHeaderInput from '@/features/calendar/editSchedule/components/ScheduleHeaderInput';
import ScheduleMemoInput from '@/features/calendar/editSchedule/components/ScheduleMemoInput';
import useScheduleEditQueries from '@/features/calendar/editSchedule/hooks/useScheduleSaveQueries';
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
  const scheduleData = useCalendarScheduleStore(state => state.scheduleData);

  const isValid = useCalendarScheduleStore(state => state.isValid);
  const hasDataChanges = useCalendarScheduleStore(
    state => state.hasDataChanges,
  );

  const { createSchedule, updateSchedule } = useScheduleEditQueries();

  const isCompleteDisabled = !isValid || !hasDataChanges;

  useEffect(() => {
    const scheduleEditForm: ScheduleEditForm = existData
      ? {
          id: existData.scheduleId,
          startDate: new Date(existData.startDate),
          endDate: new Date(existData.endDate),
          category: existData.category,
          detail: existData.detail,
          memo: existData.memo,
        }
      : {
          id: null,
          startDate: new Date(),
          endDate: new Date(),
          category: null,
          detail: '',
          memo: '',
        };

    storeInitialize(scheduleEditForm);

    return () => {
      storeReset();
    };
  }, [existData, storeInitialize, storeReset]);

  return (
    <ScreenLayout>
      <CalendarDetailHeader
        onCompletePress={() => {
          if (existData) {
            updateSchedule(scheduleData, {
              onSuccess: () => {
                storeInitialize(scheduleData);
              },
            });
          } else {
            createSchedule(scheduleData, {
              onSuccess: () => {
                storeInitialize(scheduleData);
              },
            });
          }
        }}
        isCompleteDisabled={isCompleteDisabled}
      />
      <ScrollView className="px-6">
        <ScheduleHeaderInput />
        <ScheduleDurationPicker />
        <ScheduleMemoInput />
      </ScrollView>
    </ScreenLayout>
  );
};

export default CalendarScheduleScreen;

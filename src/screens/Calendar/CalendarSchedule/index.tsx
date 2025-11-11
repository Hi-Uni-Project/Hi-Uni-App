import React, { useEffect, useState } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScheduleDurationPicker from '@/features/calendar/editSchedule/components/ScheduleDurationPicker';
import ScheduleHeaderInput from '@/features/calendar/editSchedule/components/ScheduleHeaderInput';
import ScheduleMemoInput from '@/features/calendar/editSchedule/components/ScheduleMemoInput';
import useScheduleDeleteQueries from '@/features/calendar/editSchedule/hooks/useScheduleDeleteQueries';
import useScheduleEditQueries from '@/features/calendar/editSchedule/hooks/useScheduleSaveQueries';
import CalendarDetailHeader from '@/features/calendar/editSchedule/layouts/CalendarDetailHeader';
import useCalendarScheduleStore from '@/features/calendar/editSchedule/stores/useCalendarScheduleStore';
import { ScheduleEditForm } from '@/features/calendar/editSchedule/types';
import { Schedule } from '@/features/calendar/shared/types';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import TrashIcon from '@/static/icons/trash.svg';

type CalendarScheduleRouteProp = RouteProp<{
  EditSchedule: Schedule;
}>;

const CalendarScheduleScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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
  const { deleteSchedule } = useScheduleDeleteQueries();

  const isCompleteDisabled = !isValid || !hasDataChanges;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    <ScreenLayout className="relative">
      <CalendarDetailHeader
        onCompletePress={() => {
          if (existData) {
            updateSchedule(scheduleData, {
              onSuccess: () => {
                storeInitialize(scheduleData);
                navigation.goBack();
              },
            });
          } else {
            createSchedule(scheduleData, {
              onSuccess: () => {
                storeInitialize(scheduleData);
                navigation.goBack();
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
      <Pressable
        className="absolute w-full flex-row items-center justify-center"
        onPress={() => setShowDeleteModal(true)}
        style={{
          bottom: insets.bottom,
        }}>
        <TrashIcon width={20} height={20} color="#B7B7B7" />
        <Text className="ml-2 text-surface-400 typo-body-15-medium">
          일정 삭제하기
        </Text>
      </Pressable>

      <ConfirmModal
        visible={showDeleteModal}
        title="일정을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        onConfirm={() =>
          deleteSchedule(scheduleData.id, {
            onSuccess: () => {
              storeInitialize(scheduleData);
              navigation.goBack();
            },
          })
        }
        onClose={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
      />
    </ScreenLayout>
  );
};

export default CalendarScheduleScreen;

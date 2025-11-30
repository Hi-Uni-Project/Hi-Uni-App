import React, { useState } from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Platform, Pressable, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScheduleDurationPicker from '@/features/calendar/editSchedule/components/ScheduleDurationPicker';
import ScheduleHeaderInput from '@/features/calendar/editSchedule/components/ScheduleHeaderInput';
import ScheduleMemoInput from '@/features/calendar/editSchedule/components/ScheduleMemoInput';
import useEditSchedule from '@/features/calendar/editSchedule/hooks/useEditSchedule';
import CalendarDetailHeader from '@/features/calendar/editSchedule/layouts/CalendarDetailHeader';
import { Schedule } from '@/features/calendar/shared/types';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ConfirmPortal from '@/shared/ui/organisms/ConfrimPortal';
import TrashIcon from '@/static/icons/trash.svg';

type CalendarScheduleRouteProp = RouteProp<{
  EditSchedule: Schedule;
}>;

const CalendarScheduleScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const route = useRoute<CalendarScheduleRouteProp>();
  const existData = route.params;

  const {
    isChanged,
    isValidate,
    scheduleData,
    updateField,
    editSchedule,
    removeSchedule,
    datePickerController,
  } = useEditSchedule({ initialData: existData });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <ScreenLayout className="relative">
      <CalendarDetailHeader
        onCompletePress={() => {
          editSchedule(() => {
            navigation.goBack();
          });
        }}
        isCompleteDisabled={!(isChanged && isValidate)}
      />
      <ScrollView
        className="px-6"
        style={{
          marginTop: Platform.OS === 'ios' ? 0 : insets.top + 10,
        }}>
        <ScheduleHeaderInput
          category={scheduleData?.category}
          updateCategory={category => updateField('category', { ...category })}
          detail={scheduleData?.detail || ''}
          updateDetail={detail => updateField('detail', detail)}
        />
        <ScheduleDurationPicker {...datePickerController} />
        <ScheduleMemoInput
          memo={scheduleData?.memo || ''}
          updateMemo={memo => updateField('memo', memo)}
          onFocus={() => {
            datePickerController.closeAllPickers();
          }}
        />
      </ScrollView>

      {'scheduleId' in existData && (
        <Pressable
          className="absolute w-full flex-row items-center justify-center"
          onPress={() => setShowDeleteModal(true)}
          style={{
            bottom:
              Platform.OS === 'ios' ? insets.bottom + 10 : insets.bottom + 20,
          }}>
          <TrashIcon width={20} height={20} color="#B7B7B7" />
          <Text className="ml-2 text-surface-400 typo-body-15-medium">
            일정 삭제하기
          </Text>
        </Pressable>
      )}
      <ConfirmPortal
        visible={showDeleteModal}
        title="일정을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        onConfirm={() =>
          removeSchedule(() => {
            navigation.goBack();
          })
        }
        onClose={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
      />
    </ScreenLayout>
  );
};

export default CalendarScheduleScreen;

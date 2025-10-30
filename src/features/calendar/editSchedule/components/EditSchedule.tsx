import React from 'react';

import { Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarDetailHeader from '../layouts/CalendarDetailHeader';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUInput from '@/shared/ui/atoms/HUInput';
import ClockIcon from '@/static/icons/clock.svg';
import MemoIcon from '@/static/icons/memo.svg';

const EditSchedule = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenLayout>
      <CalendarDetailHeader />
      <View className="px-6">
        <View style={{ marginTop: insets.top }}>
          <View className="flex-row pt-3">
            <HUInput
              leftComponent={<Text>제목</Text>}
              placeholder="일정명을 입력해주세요."
              variant="calendarSchedule"
              className="text-surface-400 typo-sub-title-20-semibold"
            />
          </View>
        </View>
        <View className="mt-5 flex-row">
          <ClockIcon
            className="mt-[2px] text-surface-500"
            width={20}
            height={20}
          />
          {/* 일정 선택 */}
          <View className="ml-2 flex-1 flex-row justify-between">
            <View>
              <Text className="mb-3 text-main-text typo-body-16-semibold">
                2025.8.20 수요일
              </Text>
              <Text className="text-main-text typo-body-16-semibold">
                2025.8.20 수요일
              </Text>
            </View>
            <View>
              <Text className="mb-3 text-main-text typo-body-16-semibold">
                오후 2:00
              </Text>
              <Text className="text-main-text typo-body-16-semibold">
                오후 3:00
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-5">
          <View className="flex-row items-center">
            <MemoIcon className="text-surface-500" width={20} height={20} />
            <Text className="ml-2 text-surface-700 typo-body-16-semibold">
              메모
            </Text>
          </View>
          <TextInput
            placeholder="메모를 입력해주세요"
            multiline={true}
            className="mt-[10px] rounded-[15px] bg-surface-100 px-[11px] py-[14px] text-surface-400 typo-body-15-regular"
            style={{
              minHeight: 100,
              textAlignVertical: 'top',
            }}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default EditSchedule;

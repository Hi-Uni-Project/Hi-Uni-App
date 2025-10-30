import React from 'react';

import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CommonCalendar from '../../commonCalendar/components/CommonCalendar';
import useDatePicker from '../hooks/useDatePicker';
import CalendarDetailHeader from '../layouts/CalendarDetailHeader';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import dayjs from '@/shared/lib/dayjs';
import HUInput from '@/shared/ui/atoms/HUInput';
import ClockIcon from '@/static/icons/clock.svg';
import MemoIcon from '@/static/icons/memo.svg';

const EditSchedule = () => {
  const insets = useSafeAreaInsets();

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentStartMonth,
    setCurrentStartMonth,
    currentEndMonth,
    setCurrentEndMonth,
    isStartCalendarOpen,
    setIsStartCalendarOpen,
    isEndCalendarOpen,
    setIsEndCalendarOpen,
  } = useDatePicker({});

  return (
    <ScreenLayout>
      <CalendarDetailHeader />
      <ScrollView className="px-6">
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
          <View className="ml-2 flex-1">
            <View className="flex-row justify-between">
              <Pressable
                onPress={() => {
                  setIsStartCalendarOpen(!isStartCalendarOpen);
                  setIsEndCalendarOpen(false);
                }}>
                <Text className="mb-3 text-main-text typo-body-16-semibold">
                  {dayjs(startDate).format('YYYY. M. DD. dddd')}
                </Text>
              </Pressable>
              <Text
                className="mb-3 text-main-text typo-body-16-semibold"
                onPress={() => {}}>
                오후 2:00
              </Text>
            </View>
            {isStartCalendarOpen && (
              <Animated.View
                entering={FadeInUp}
                exiting={FadeOutUp}
                layout={LinearTransition}>
                <CommonCalendar
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                  selectedMonth={currentStartMonth}
                  setSelectedMonth={setCurrentStartMonth}
                />
              </Animated.View>
            )}
            <Animated.View
              layout={LinearTransition}
              className="flex-row justify-between">
              <Pressable
                onPress={() => {
                  setIsEndCalendarOpen(!isEndCalendarOpen);
                  setIsStartCalendarOpen(false);
                }}>
                <Text className="text-main-text typo-body-16-semibold">
                  {dayjs(endDate).format('YYYY. M. DD. dddd')}
                </Text>
              </Pressable>
              <Text className="mb-3 text-main-text typo-body-16-semibold">
                오후 3:00
              </Text>
            </Animated.View>
            {isEndCalendarOpen && (
              <Animated.View
                entering={FadeInUp}
                exiting={FadeOutUp}
                layout={LinearTransition}>
                <CommonCalendar
                  selectedDate={endDate}
                  setSelectedDate={setEndDate}
                  selectedMonth={currentEndMonth}
                  setSelectedMonth={setCurrentEndMonth}
                />
              </Animated.View>
            )}
          </View>
        </View>

        <Animated.View className="mt-5" layout={LinearTransition}>
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
        </Animated.View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default EditSchedule;

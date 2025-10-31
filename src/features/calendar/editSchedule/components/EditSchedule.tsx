import React, { useEffect } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategorySelector from '../../categorySelector/components/CategorySelector';
import useCategorySelector from '../../categorySelector/hooks/useCategorySelector';
import CommonCalendar from '../../commonCalendar/components/CommonCalendar';
import { CalendarSchedule } from '../../types';
import useDatePicker from '../hooks/useDatePicker';
import CalendarDetailHeader from '../layouts/CalendarDetailHeader';
import useCalendarScheduleStore from '../stores/useCalendarScheduleStore';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { cn } from '@/shared/lib/cn';
import dayjs from '@/shared/lib/dayjs';
import { shadowStyleSheet } from '@/shared/styles/shadow';
import HUInput from '@/shared/ui/atoms/HUInput';
import ClockIcon from '@/static/icons/clock.svg';
import MemoIcon from '@/static/icons/memo.svg';

interface EditScheduleProps {
  existData?: CalendarSchedule;
}

const EditSchedule = ({ existData }: EditScheduleProps) => {
  const insets = useSafeAreaInsets();

  const storeInitialData = useCalendarScheduleStore(state => state.initialData);
  const storeScheduleData = useCalendarScheduleStore(
    state => state.scheduleData,
  );
  const storeUpdateScheduleField = useCalendarScheduleStore(
    state => state.updateScheduleField,
  );
  const storeMemo = useCalendarScheduleStore(state => state.scheduleData.memo);

  const storeDetail = useCalendarScheduleStore(
    state => state.scheduleData.detail,
  );

  const storeIsValid = useCalendarScheduleStore(state => state.isValid);
  const storeHasDataChanges = useCalendarScheduleStore(
    state => state.hasDataChanges,
  );

  const storeInitialize = useCalendarScheduleStore(state => state.initialize);
  const storeReset = useCalendarScheduleStore(state => state.reset);

  const { currentCategory, setCurrentCategory, categories } =
    useCategorySelector();

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
    isStartTimePickerOpen,
    setIsStartTimePickerOpen,
    isEndTimePickerOpen,
    setIsEndTimePickerOpen,
    closeAllPickers,
  } = useDatePicker();

  useEffect(() => {
    storeInitialize(existData);

    return storeReset();
  }, []);

  useEffect(() => {
    storeUpdateScheduleField(
      'category',
      currentCategory === null ? '' : currentCategory.categoryName,
    );
  }, [currentCategory]);

  // TODO: 삭제해라
  useEffect(() => {
    console.log(storeInitialData);
    console.log(storeScheduleData);

    console.log('현재 카테고리:', currentCategory);
    console.log('유효성', storeIsValid(), '변경여부', storeHasDataChanges());
  }, [storeInitialData, storeScheduleData, currentCategory]);

  return (
    <ScreenLayout>
      <CalendarDetailHeader />
      <ScrollView className="px-6">
        <View style={{ marginTop: insets.top }}>
          <View className="flex-row pt-3">
            <HUInput
              leftComponent={
                <CategorySelector
                  categories={categories}
                  currentCategory={currentCategory}
                  setCurrentCategory={setCurrentCategory}
                />
              }
              value={storeDetail}
              onChangeText={text => storeUpdateScheduleField('detail', text)}
              placeholder="일정명을 입력해주세요."
              variant="calendarSchedule"
              className="text-main-text typo-sub-title-20-semibold"
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
                  closeAllPickers();
                  setIsStartCalendarOpen(!isStartCalendarOpen);
                }}>
                <Text
                  className={cn(
                    'mb-3 typo-body-16-semibold',
                    isStartCalendarOpen
                      ? 'text-primary-purple'
                      : 'text-main-text',
                  )}>
                  {dayjs(startDate).format('YYYY. M. DD. dddd')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  closeAllPickers();
                  setIsStartTimePickerOpen(!isStartTimePickerOpen);
                }}>
                <Text
                  className={cn(
                    'mb-3 typo-body-16-semibold',
                    isStartTimePickerOpen
                      ? 'text-primary-purple'
                      : 'text-main-text',
                  )}>
                  {dayjs(startDate).format('A h:mm')}
                </Text>
              </Pressable>
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

            {isStartTimePickerOpen && (
              <Animated.View
                className="mb-3 h-[145px] w-full items-center justify-center overflow-hidden rounded-[15px] bg-white"
                style={shadowStyleSheet.dropShadow}
                entering={FadeInUp}
                exiting={FadeOutUp}
                layout={LinearTransition}>
                <DateTimePicker
                  themeVariant="light"
                  value={startDate}
                  mode="time"
                  display="spinner"
                  locale="ko"
                  onChange={(e, choosedDate) => {
                    setStartDate(choosedDate || startDate);
                  }}
                />
              </Animated.View>
            )}

            <Animated.View
              layout={LinearTransition}
              className="flex-row justify-between">
              <Pressable
                onPress={() => {
                  closeAllPickers();
                  setIsEndCalendarOpen(!isEndCalendarOpen);
                }}>
                <Text
                  className={cn(
                    'mb-3 typo-body-16-semibold',
                    isEndCalendarOpen
                      ? 'text-primary-purple'
                      : 'text-main-text',
                  )}>
                  {dayjs(endDate).format('YYYY. M. DD. dddd')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  closeAllPickers();
                  setIsEndTimePickerOpen(!isEndTimePickerOpen);
                }}>
                <Text
                  className={cn(
                    'mb-3 typo-body-16-semibold',
                    isEndTimePickerOpen
                      ? 'text-primary-purple'
                      : 'text-main-text',
                  )}>
                  {dayjs(endDate).format('A h:mm')}
                </Text>
              </Pressable>
            </Animated.View>
            {isEndCalendarOpen && (
              <Animated.View
                entering={FadeInUp}
                exiting={FadeOutUp}
                layout={LinearTransition}>
                <CommonCalendar
                  minDate={startDate}
                  selectedDate={endDate}
                  setSelectedDate={setEndDate}
                  selectedMonth={currentEndMonth}
                  setSelectedMonth={setCurrentEndMonth}
                />
              </Animated.View>
            )}
            {isEndTimePickerOpen && (
              <Animated.View
                className="mb-3 h-[145px] w-full items-center justify-center overflow-hidden rounded-[15px] bg-white"
                style={shadowStyleSheet.dropShadow}
                entering={FadeInUp}
                exiting={FadeOutUp}
                layout={LinearTransition}>
                <DateTimePicker
                  themeVariant="light"
                  value={endDate}
                  mode="time"
                  display="spinner"
                  locale="ko"
                  onChange={(e, choosedDate) => {
                    setEndDate(choosedDate || endDate);
                  }}
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
            value={storeMemo}
            onChangeText={text => storeUpdateScheduleField('memo', text)}
            placeholder="메모를 입력해주세요"
            onFocus={() => closeAllPickers()}
            multiline={true}
            className="mt-[10px] rounded-[15px] bg-surface-100 px-[11px] py-[14px] text-main-text typo-body-15-regular"
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

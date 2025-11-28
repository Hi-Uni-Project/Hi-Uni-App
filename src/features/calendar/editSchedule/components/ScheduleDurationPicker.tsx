import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';

import CommonCalendar from '../../commonCalendar/components/CommonCalendar';

import { cn } from '@/shared/lib/cn';
import dayjs from '@/shared/lib/dayjs';
import { shadowStyleSheet } from '@/shared/styles/shadow';
import ClockIcon from '@/static/icons/clock.svg';

interface ScheduleDurationPickerProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  currentStartMonth: string;
  setCurrentStartMonth: (month: string) => void;
  currentEndMonth: string;
  setCurrentEndMonth: (month: string) => void;
  isStartCalendarOpen: boolean;
  setIsStartCalendarOpen: (open: boolean) => void;
  isEndCalendarOpen: boolean;
  setIsEndCalendarOpen: (open: boolean) => void;
  isStartTimePickerOpen: boolean;
  setIsStartTimePickerOpen: (open: boolean) => void;
  isEndTimePickerOpen: boolean;
  setIsEndTimePickerOpen: (open: boolean) => void;
  closeAllPickers: () => void;
}

const ScheduleDurationPicker = ({
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
}: ScheduleDurationPickerProps) => {
  return (
    <View className="mt-5 flex-row">
      <ClockIcon className="mt-[2px] text-surface-500" width={20} height={20} />
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
                isStartCalendarOpen ? 'text-primary-purple' : 'text-main-text',
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

        {isStartTimePickerOpen && Platform.OS === 'ios' && (
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

        {isStartTimePickerOpen && Platform.OS === 'android' && (
          <DateTimePicker
            themeVariant="light"
            value={startDate}
            mode="time"
            display="spinner"
            locale="ko"
            onChange={(e, choosedDate) => {
              setStartDate(choosedDate || startDate);
              setIsStartTimePickerOpen(false);
            }}
          />
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
                isEndCalendarOpen ? 'text-primary-purple' : 'text-main-text',
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
                isEndTimePickerOpen ? 'text-primary-purple' : 'text-main-text',
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

        {isEndTimePickerOpen && Platform.OS === 'ios' && (
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

        {isEndTimePickerOpen && Platform.OS === 'android' && (
          <DateTimePicker
            themeVariant="light"
            value={endDate}
            mode="time"
            display="spinner"
            locale="ko"
            onChange={(e, choosedDate) => {
              setEndDate(choosedDate || endDate);
              setIsEndTimePickerOpen(false);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ScheduleDurationPicker;

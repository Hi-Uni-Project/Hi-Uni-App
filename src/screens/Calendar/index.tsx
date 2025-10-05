import React, { useEffect, useMemo, useRef, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarBottomSheet from '@/features/calendar/calendarBottomSheet/components/CalendarBottomSheet';
import DotCalendar from '@/features/calendar/dotCalendar/components/DotCalendar';
import MonthSelector from '@/features/calendar/monthSelector/components/MonthSelector';
import ScheduleDetail from '@/features/calendar/scheduleDetail/components/ScheduleDetail';
import useSchedule from '@/features/calendar/shared/hooks/useSchedule';

const CalendarScreen = () => {
  const insets = useSafeAreaInsets();
  const dimensions = Dimensions.get('window');

  const [headerHeight, setHeaderHeight] = useState<number | null>(null);
  const [dotCalendarHeight, setDotCalendarHeight] = useState<number | null>(
    null,
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    selectedDate,
    setSelectedDate,
    schedules,
    scheduleMap,
    schedulesForDay,
  } = useSchedule();

  const snapPoints = useMemo(() => {
    // 바텀 시트 높이 = tabBar 높이(120) + insets + 요소들
    const calendarHeight =
      dimensions.height -
      (insets.top + headerHeight + dotCalendarHeight + 120 + insets.bottom);

    if (!dotCalendarHeight) {
      return ['30%', '70%'];
    }
    return [calendarHeight, '70%'];
  }, [headerHeight]);

  useEffect(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [schedules]);

  useFocusEffect(() => {
    bottomSheetRef.current?.snapToIndex(0);
  });

  return (
    <>
      <View
        className="relative flex-1 bg-surface-50"
        style={{
          paddingTop: insets.top,
        }}>
        <MonthSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onLayout={e => {
            e.nativeEvent.layout.height &&
              setHeaderHeight(e.nativeEvent.layout.height);
          }}
        />
        <DotCalendar
          date={selectedDate}
          scheduleMap={scheduleMap}
          onPressDate={setSelectedDate}
          onLayout={e => {
            e.nativeEvent.layout.height &&
              setDotCalendarHeight(e.nativeEvent.layout.height);
          }}
        />
      </View>

      <CalendarBottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        selectedDate={selectedDate}>
        <View className="flex-1 items-center justify-center">
          <View className="mt-4 w-full px-5">
            {schedulesForDay.length === 0 ? (
              <Text className="text-surface-400 typo-body-16-regular">
                아직 등록한 일정이 없어요.
              </Text>
            ) : (
              schedulesForDay.map((schedule, index) => (
                <ScheduleDetail
                  key={index}
                  category={schedule.category}
                  detail={schedule.detail}
                  time={schedule.time}
                  memo={schedule.memo}
                  backgroundColor={schedule.backgroundColor}
                  textColor={schedule.textColor}
                />
              ))
            )}
          </View>
        </View>
      </CalendarBottomSheet>
    </>
  );
};

export default CalendarScreen;

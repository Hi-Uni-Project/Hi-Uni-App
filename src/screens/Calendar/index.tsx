import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarBody from '@/features/calendar/calendarBody/components/CalendarBody';

const CalendarScreen = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {}, []);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#F9F9F9' }}>
      <View className="mb-[19px] mt-5 flex-row items-center justify-between px-5">
        <Text className="typo-sub-title-20-medium">
          {dayjs().format('YYYY년 MM월')}
        </Text>
        <Text className="typo-sub-title-20-medium">
          {dayjs().format('YYYY년 MM월')}
        </Text>
      </View>
      <CalendarBody date={selectedDate} onPressDate={setSelectedDate} />
    </View>
  );
};

export default CalendarScreen;

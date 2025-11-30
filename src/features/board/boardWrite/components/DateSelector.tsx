import React from 'react';

import { View, Text, Pressable } from 'react-native';

import CalendarIcon from '@/static/icons/calendar.svg';

interface Props {
  label: string;
  date: string;
  onPress: () => void;
}

export const DateSelector = ({ label, date, onPress }: Props) => {
  return (
    <View className="w-full flex-1">
      <Text className="mb-1 text-surface-700 typo-body-15-regular">
        {label}
      </Text>
      <Pressable
        className="flex-row items-center justify-between rounded-[12px] border border-surface-200 bg-white px-4 py-3"
        onPress={onPress}>
        <Text className="text-main-text typo-body-15-regular">{date}</Text>
        <CalendarIcon width={20} height={20} color="#B7B7B7" />
      </Pressable>
    </View>
  );
};

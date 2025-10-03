import React, { useState, useRef, useEffect } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  Easing,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HUModalButton from '@/shared/ui/atoms/HUModalButton';
import SelectIcon from '@/static/icons/selector.svg';

interface MonthSelectorProps {
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
}

const MonthSelector = ({
  selectedDate,
  setSelectedDate,
  onLayout,
}: MonthSelectorProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const [date, setDate] = useState(
    selectedDate ? selectedDate.toDate() : new Date(),
  );

  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    setDate(selectedDate.toDate());
  }, [selectedDate]);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <>
      <View
        onLayout={onLayout}
        className="mb-[15px] mt-5 flex-row items-center px-5">
        <Pressable
          className="flex-row items-center"
          onPress={() => setIsVisible(true)}>
          <Text className="pr-2 typo-sub-title-20-medium">
            {selectedDate?.format('YYYY년 MM월')}
          </Text>
          <SelectIcon />
        </Pressable>
      </View>
      {Platform.OS === 'ios' && (
        <Modal transparent visible={isVisible} animationType="fade">
          <Pressable
            className="flex-1 bg-black/40"
            onPress={() => setIsVisible(false)}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                paddingBottom: insets.bottom,
              }}
              className="absolute bottom-0 left-0 right-0 w-full items-center rounded-t-2xl bg-white p-5">
              <DateTimePicker
                themeVariant="light"
                value={date}
                mode="date"
                display="spinner"
                locale="ko"
                onChange={(e, choosedDate) => {
                  setDate(choosedDate || date);
                }}
              />
              <View className="mt-4 flex-row justify-around">
                <HUModalButton
                  text="확인"
                  onPress={() => {
                    setIsVisible(false);
                    setSelectedDate && setSelectedDate(dayjs(date));
                  }}
                />
              </View>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
      {Platform.OS === 'android' && isVisible && (
        <DateTimePicker
          themeVariant="light"
          value={date}
          mode="date"
          display="spinner"
          locale="ko"
          onChange={(_, choosedDate) => {
            setIsVisible(false);
            if (choosedDate) {
              setDate(choosedDate);
              setSelectedDate && setSelectedDate(dayjs(choosedDate));
            }
          }}
        />
      )}
    </>
  );
};

export default MonthSelector;

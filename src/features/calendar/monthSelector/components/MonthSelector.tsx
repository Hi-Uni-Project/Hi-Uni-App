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

  const handleTimePickedOnAndroid = (pickedDate: Date) => {
    if (pickedDate) {
      setDate(pickedDate);
      setSelectedDate(dayjs(pickedDate));
    }
  };

  useEffect(() => {
    setDate(selectedDate.toDate());
  }, [selectedDate]);

  useEffect(() => {
    const animation = Animated.timing(translateY, {
      toValue: isVisible ? 0 : 300,
      duration: isVisible ? 250 : 200,
      easing: isVisible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
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
                    setSelectedDate(dayjs(date));
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
          onChange={(_, pickedDate) => {
            setIsVisible(false);
            handleTimePickedOnAndroid(pickedDate);
          }}
        />
      )}
    </>
  );
};

export default MonthSelector;

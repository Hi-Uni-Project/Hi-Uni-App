import React, { useRef, useState } from 'react';

import { Pressable, Text, View } from 'react-native';

import CalendarModal from '@/features/record/editResume/components/CalendarModal';
import { parseShortDate } from '@/features/record/editResume/utils/dateUtils';
import DiaryIcon from '@/static/icons/diary.svg';

interface DatePickerInputProps {
  value: string;
  onSelectDate: (dateStr: string) => void;
  placeholder?: string;
  onCalendarToggle?: (isOpen: boolean) => void;
}

const DatePickerInput = ({
  value,
  onSelectDate,
  placeholder = 'YY.MM.DD',
  onCalendarToggle,
}: DatePickerInputProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const inputRef = useRef<View>(null);

  const handleIconPress = () => {
    inputRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y: y + height });
      const newState = !showCalendar;
      setShowCalendar(newState);
      onCalendarToggle?.(newState);
    });
  };

  const handleClose = () => {
    setShowCalendar(false);
    onCalendarToggle?.(false);
  };

  return (
    <View className="relative">
      <Pressable
        ref={inputRef}
        onPress={handleIconPress}
        accessibilityRole="button"
        accessibilityLabel="날짜 선택"
        className="w-[144px] flex-row items-center rounded-[15px] border-[1px] border-gray-200 bg-white px-3 py-[10px]">
        <View className="flex-1">
          <Text
            className={`typo-body-15-regular ${value ? 'text-main-text' : 'text-surface-400'}`}>
            {value || placeholder}
          </Text>
        </View>

        <View className="pl-[6px] pr-[4px]">
          <DiaryIcon width={18} height={18} />
        </View>
      </Pressable>
      <CalendarModal
        visible={showCalendar}
        onClose={handleClose}
        onSelectDate={onSelectDate}
        initialDate={parseShortDate(value)}
        anchorPosition={anchor}
      />
    </View>
  );
};

export default DatePickerInput;

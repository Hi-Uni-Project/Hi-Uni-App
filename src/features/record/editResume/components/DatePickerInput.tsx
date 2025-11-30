import React, { useRef, useState } from 'react';

import { Pressable, TextInput, View } from 'react-native';

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
      <View
        ref={inputRef}
        className="w-[144px] flex-row items-center rounded-[15px] border-[1px] border-gray-200 bg-white">
        <TextInput
          className="flex-1 pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
          placeholder={placeholder}
          placeholderTextColor={'#B7B7B7'}
          value={value}
          editable={false}
        />
        <Pressable className="pr-[10px]" onPress={handleIconPress}>
          <DiaryIcon width={18} height={18} />
        </Pressable>
      </View>
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

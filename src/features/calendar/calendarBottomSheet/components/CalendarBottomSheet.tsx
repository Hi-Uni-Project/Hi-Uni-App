import React from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Dayjs } from 'dayjs';
import { View, Pressable, Text } from 'react-native';

import AddIcon from '@/static/icons/add.svg';

interface CalendarBottomSheetProps {
  ref: React.RefObject<BottomSheetMethods>;
  snapPoints: (string | number)[];
  selectedDate: Dayjs;
  sheetOnChange?: (index: number) => void;
  children?: React.ReactNode;
}

const backdropComponent = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    disappearsOnIndex={0}
    pressBehavior={null}
    enableTouchThrough={true}
    {...props}
  />
);

const shadowStyle = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,

  shadowColor: '#000',
  shadowOpacity: 0.03,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 10,

  elevation: 10,
};

const CalendarBottomSheet = ({
  ref,
  snapPoints,
  selectedDate,
  sheetOnChange,
  children,
}: CalendarBottomSheetProps) => {
  return (
    <BottomSheet
      ref={ref}
      index={0}
      backdropComponent={backdropComponent}
      style={shadowStyle}
      snapPoints={snapPoints}
      onChange={sheetOnChange}
      enableDynamicSizing={false}
      handleIndicatorStyle={{ backgroundColor: '#EAEAEA', width: 35 }}>
      <View className="w-full flex-row items-center justify-between px-5 py-2 pt-2">
        <Text className="typo-body-17-medium">
          {selectedDate.format('YYYY년 MM월 DD일 (dd)')}
        </Text>
        <Pressable
          onPress={() => {
            console.log('Add Schedule');
          }}>
          <AddIcon width={22} height={22} />
        </Pressable>
      </View>
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CalendarBottomSheet;

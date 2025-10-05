import React from 'react';

import { Text, View } from 'react-native';

interface ScheduleDetailProps {
  category: string;
  detail: string;
  time: string;
  memo: string;
  backgroundColor: string;
  textColor: string;
}

const ScheduleDetail = ({
  category,
  detail,
  time,
  memo,
  backgroundColor = '#979797',
  textColor = '#FFFFFF',
}: ScheduleDetailProps) => {
  return (
    <>
      <View className="mb-[11px] w-full flex-row items-center justify-between rounded-[10px] bg-white">
        <View className="flex-row items-center">
          <Text
            className="mr-2 rounded-full px-[13px] py-[3px] typo-body-16-regular"
            style={{ backgroundColor, color: textColor }}>
            {category}
          </Text>
          <Text className="text-main-text typo-body-16-semibold">{detail}</Text>
        </View>
        <Text className="text-surface-500 typo-caption-14-light">{time}</Text>
      </View>
      {memo && memo.length > 0 && (
        <View className="mb-[14px] rounded-[15px] bg-surface-100 px-4 py-3">
          <Text className="text-main-text typo-caption-14-regular">{memo}</Text>
        </View>
      )}
    </>
  );
};
export default ScheduleDetail;

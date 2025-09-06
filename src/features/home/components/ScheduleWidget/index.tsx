import React from 'react';

import { Text, View, ViewProps } from 'react-native';

import Card from '@/shared/components/CardView';
import DiaryIcon from '@/static/icons/diary.svg';

interface ScheduleWidgetProps extends ViewProps {}

const ScheduleWidget = ({}: ScheduleWidgetProps) => {
  return (
    <Card className="mx-5 mt-[14px]">
      <View className="flex-row items-center justify-between p-4">
        <Text className="typo-main-button-16-semibold">내 일정</Text>
        <View>
          <DiaryIcon width={18} height={18} />
        </View>
      </View>
      <View className="h-20 items-center justify-center border-b-[1px] border-gray-200">
        <Text>오늘의 일정이 없습니다.</Text>
      </View>
      <View className="p-4">
        <Text className="typo-main-button-16-semibold">
          2025년 8월 7일 (목)
        </Text>
      </View>
    </Card>
  );
};

export default ScheduleWidget;

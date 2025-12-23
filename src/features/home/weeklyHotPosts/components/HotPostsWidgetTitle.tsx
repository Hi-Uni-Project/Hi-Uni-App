import React from 'react';

import { View, Text } from 'react-native';

import FireIcon from '@/static/icons/fire.svg';

const HotPostsWidgetTitle = () => {
  return (
    <View className="flex-row items-center">
      <Text className="text-main-text typo-sub-title-22-bold">주간 HOT</Text>
      <FireIcon width={18} height={20} className="ml-[6px]" />
    </View>
  );
};

export default HotPostsWidgetTitle;

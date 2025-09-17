import React from 'react';

import { View, Text, Pressable } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import { shadowStyleSheet } from '@/shared/styles/shadow';
import FireIcon from '@/static/icons/fire.svg';

const HotBoardHeader = () => {
  return (
    <View
      className="h-[10%] justify-end"
      style={shadowStyleSheet.dropShadowBottom}>
      <View className="mb-[28px] flex-row items-center justify-center px-5">
        <Pressable className="absolute left-5">
          <ArrowIcons direction="left" width={24} height={20} color="#1E2128" />
        </Pressable>

        <View className="flex-row items-center space-x-[6px]">
          <Text className="text-main-text typo-sub-title-22-bold">
            주간 HOT
          </Text>
          <FireIcon />
        </View>
      </View>
    </View>
  );
};

export default HotBoardHeader;

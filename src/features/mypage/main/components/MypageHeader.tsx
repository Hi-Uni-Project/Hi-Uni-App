import React from 'react';

import { View, Text, Pressable } from 'react-native';

import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { shadowStyleSheet } from '@/shared/styles/shadow';

interface Props {
  onBackPress: () => void;
}

export const MypageHeader = ({ onBackPress }: Props) => (
  <>
    <BoardHeaderColorGround />
    <View
      className="h-[10%] justify-end bg-white"
      style={shadowStyleSheet.dropShadowBottom}>
      <View className="mb-[28px] flex-row items-center justify-center px-5">
        <Pressable className="absolute left-5" onPress={onBackPress}>
          <ArrowIcons direction="left" width={24} height={20} color="#1E2128" />
        </Pressable>

        <Text className="text-main-text typo-sub-title-20-semibold">
          마이페이지
        </Text>
      </View>
    </View>
  </>
);

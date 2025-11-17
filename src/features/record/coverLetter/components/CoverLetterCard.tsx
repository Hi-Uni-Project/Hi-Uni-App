import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { shadowStyleSheet } from '@/shared/styles/shadow';
import CopyIcon from '@/static/icons/copy.svg';

interface CoverLetterCardProps {
  title: string;
  content: string;
}

const CoverLetterCard = ({ title, content }: CoverLetterCardProps) => {
  return (
    <View
      className="h-[269px] w-[296px] rounded-[15px] bg-white pb-[27px] pl-[19px] pr-[20px] pt-[18px]"
      style={shadowStyleSheet.dropShadow}>
      <View className="flex-row items-center justify-between">
        <Text className="text-surface-500 typo-caption-13-medium">{title}</Text>
        <Pressable hitSlop={14}>
          <CopyIcon width={14} height={14} color="#B7B7B7" />
        </Pressable>
      </View>

      <View className="mt-2">
        <Text
          className="text-main-text typo-body-16-medium"
          numberOfLines={8}
          ellipsizeMode="tail">
          {content}
        </Text>
      </View>
    </View>
  );
};

export default CoverLetterCard;

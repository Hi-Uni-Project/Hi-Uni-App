import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { Link } from '@/features/record/editResume/types/domainType';

interface LinkCardProps {
  link: Link;
  onPress?: () => void;
  isCopied?: boolean;
  onCopyPress?: () => void;
}

const LinkCard = ({ link, onPress, isCopied, onCopyPress }: LinkCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-[15px] border-[1px] border-surface-200 bg-transparent p-[14px]">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-main-text typo-body-16-semibold">
            {link.linkName || link.linkUrl}
          </Text>
          <Text
            numberOfLines={1}
            className="mt-[3px] text-gray-800 typo-caption-14-regular">
            {link.linkUrl}
          </Text>
        </View>

        <Pressable
          onPress={onCopyPress}
          className="ml-2 items-center justify-center rounded-full bg-surface-200 px-3 py-1">
          <Text className="typo-caption-14-regular">
            {isCopied ? '복사됨' : '복사'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default LinkCard;

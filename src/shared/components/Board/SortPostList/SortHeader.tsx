import React from 'react';

import { Pressable, Text, View } from 'react-native';

import Filtered from '@/static/icons/filtered.svg';

interface SortHeaderProps {
  selectedSort: string;
  onPress: () => void;
  className?: string;
}

const SortHeader = ({
  selectedSort,
  onPress,
  className = 'mb-2',
}: SortHeaderProps) => {
  return (
    <View className={className}>
      <Pressable className="flex-row items-center gap-1.5" onPress={onPress}>
        <Filtered />
        <Text className="text-surface-500 typo-body-16-regular">
          {selectedSort}
        </Text>
      </Pressable>
    </View>
  );
};

export default SortHeader;

import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ChevronIcons from '@/shared/icons/ChevronIcons';

interface SectionHeaderProps {
  titleComponent: React.ReactNode;
  onPressMore: () => void;
}

const SectionHeader = ({ titleComponent, onPressMore }: SectionHeaderProps) => {
  return (
    <View className="mb-[13px] flex-row items-center justify-between px-5">
      {titleComponent}
      <Pressable onPress={onPressMore} className="flex-row items-center">
        <Text className="mr-2 text-surface-600 typo-caption-14-regular">
          더 보기
        </Text>
        <ChevronIcons direction="right" width={6} height={10} color="#B7B7B7" />
      </Pressable>
    </View>
  );
};

export default SectionHeader;
